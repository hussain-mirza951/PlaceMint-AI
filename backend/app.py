import re
from io import BytesIO

from flask import Flask, jsonify, request
from pypdf import PdfReader

try:
    from eligibility import check_eligibility, validate_eligibility_payload
except ModuleNotFoundError:
    from backend.eligibility import check_eligibility, validate_eligibility_payload


app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024


SKILL_KEYWORDS = {
    "Python": ["python"],
    "Java": ["java"],
    "JavaScript": ["javascript", "js"],
    "React": ["react", "react.js", "reactjs"],
    "Node.js": ["node", "node.js", "nodejs"],
    "SQL": ["sql", "mysql", "postgresql", "postgres"],
    "MongoDB": ["mongodb", "mongo"],
    "Data Structures": ["data structures", "dsa"],
    "Algorithms": ["algorithms", "algorithm"],
    "System Design": ["system design"],
    "OOP": ["oop", "object oriented", "object-oriented"],
    "REST APIs": ["rest api", "rest apis", "restful"],
    "Git": ["git", "github", "gitlab"],
    "Docker": ["docker"],
    "AWS": ["aws", "amazon web services"],
    "Machine Learning": ["machine learning", "ml"],
    "Cloud Computing": ["cloud computing", "cloud"],
    "HTML": ["html"],
    "CSS": ["css"],
}

ROLE_SKILLS = {
    "Software Engineer": [
        "Data Structures",
        "Algorithms",
        "OOP",
        "Git",
        "SQL",
        "REST APIs",
    ],
    "Frontend Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Git",
        "REST APIs",
    ],
    "Backend Developer": [
        "Python",
        "Java",
        "Node.js",
        "SQL",
        "REST APIs",
        "Docker",
    ],
    "Data Analyst": [
        "Python",
        "SQL",
        "Machine Learning",
        "Algorithms",
    ],
}

SECTION_KEYWORDS = {
    "education": ["education", "degree", "university", "college"],
    "experience": ["experience", "internship", "work experience", "employment"],
    "projects": ["projects", "project"],
    "skills": ["skills", "technical skills", "technologies"],
    "contact": ["email", "phone", "linkedin", "github"],
}


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/resume/analyze")
def analyze_resume():
    uploaded_file = request.files.get("resume")

    if not uploaded_file:
        return jsonify({"error": "Upload a PDF resume."}), 400

    if not uploaded_file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF resumes are supported."}), 400

    try:
        text = extract_pdf_text(uploaded_file.read())
    except Exception:
        return jsonify({"error": "Could not read this PDF. Try a text-based PDF."}), 400

    if len(text.strip()) < 80:
        return jsonify({"error": "Not enough readable resume text was found."}), 400

    target_role = request.form.get("targetRole") or "Software Engineer"
    target_skills = parse_target_skills(request.form.get("targetSkills"), target_role)
    result = build_resume_analysis(text, target_role, target_skills)

    return jsonify(result)


@app.post("/api/eligibility/check")
def check_student_eligibility():
    payload = request.get_json(silent=True) or {}
    student, errors = validate_eligibility_payload(payload)

    if errors:
        return jsonify({"errors": errors}), 400

    return jsonify(check_eligibility(student))


def extract_pdf_text(file_bytes):
    reader = PdfReader(BytesIO(file_bytes))
    pages = []

    for page in reader.pages:
        pages.append(page.extract_text() or "")

    return normalize_text("\n".join(pages))


def normalize_text(text):
    return re.sub(r"\s+", " ", text).strip()


def parse_target_skills(raw_skills, target_role):
    if raw_skills:
        return [
            skill.strip()
            for skill in raw_skills.split(",")
            if skill.strip()
        ]

    return ROLE_SKILLS.get(target_role, ROLE_SKILLS["Software Engineer"])


def build_resume_analysis(text, target_role, target_skills):
    lower_text = text.lower()
    skills_found = extract_skills(lower_text)
    found_skill_names = {found.lower() for found in skills_found}
    missing_skills = [
        skill for skill in target_skills if skill.lower() not in found_skill_names
    ]
    checks = build_checks(text, lower_text, skills_found, target_skills)
    score = calculate_ats_score(checks, skills_found, missing_skills, target_skills)
    suggestions = build_suggestions(checks, missing_skills, score)

    return {
        "score": score,
        "targetRole": target_role,
        "extractedTextPreview": text[:700],
        "skillsFound": skills_found,
        "missingSkills": missing_skills,
        "suggestions": suggestions,
        "checks": checks,
    }


def extract_skills(lower_text):
    skills = []

    for skill, aliases in SKILL_KEYWORDS.items():
        if any(contains_phrase(lower_text, alias) for alias in aliases):
            skills.append(skill)

    return skills


def contains_phrase(lower_text, phrase):
    escaped = re.escape(phrase.lower())
    return re.search(rf"(?<![a-z0-9]){escaped}(?![a-z0-9])", lower_text) is not None


def build_checks(text, lower_text, skills_found, target_skills):
    found_skill_names = {found.lower() for found in skills_found}
    email_found = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", text) is not None
    phone_found = re.search(r"(\+?\d[\d\s().-]{8,}\d)", text) is not None
    quantified_impact = len(re.findall(r"\b\d+%?|\b\d+\+", text))
    action_verbs = count_matches(
        lower_text,
        ["built", "developed", "created", "improved", "led", "designed", "implemented"],
    )
    sections_found = {
        section: any(keyword in lower_text for keyword in keywords)
        for section, keywords in SECTION_KEYWORDS.items()
    }
    target_skill_matches = len(
        [skill for skill in target_skills if skill.lower() in found_skill_names]
    )

    return {
        "hasEmail": email_found,
        "hasPhone": phone_found,
        "sectionsFound": sections_found,
        "wordCount": len(text.split()),
        "quantifiedImpactCount": quantified_impact,
        "actionVerbCount": action_verbs,
        "targetSkillMatches": target_skill_matches,
        "targetSkillTotal": len(target_skills),
    }


def count_matches(lower_text, terms):
    return sum(len(re.findall(rf"\b{re.escape(term)}\b", lower_text)) for term in terms)


def calculate_ats_score(checks, skills_found, missing_skills, target_skills):
    contact_score = 15 if checks["hasEmail"] and checks["hasPhone"] else 8
    section_score = round(
        25 * (sum(checks["sectionsFound"].values()) / len(checks["sectionsFound"]))
    )
    skill_score = round(
        30 * (checks["targetSkillMatches"] / max(1, len(target_skills)))
    )
    impact_score = min(15, checks["quantifiedImpactCount"] * 3 + checks["actionVerbCount"])
    length_score = 15 if 350 <= checks["wordCount"] <= 900 else 8
    raw_score = contact_score + section_score + skill_score + impact_score + length_score

    if not skills_found:
        raw_score -= 10

    if len(missing_skills) >= len(target_skills):
        raw_score -= 10

    return max(0, min(100, round(raw_score)))


def build_suggestions(checks, missing_skills, score):
    suggestions = []

    if not checks["hasEmail"] or not checks["hasPhone"]:
        suggestions.append("Add a clear email address and phone number near the top.")

    missing_sections = [
        section.title()
        for section, found in checks["sectionsFound"].items()
        if not found and section != "contact"
    ]
    if missing_sections:
        suggestions.append(f"Add or rename these sections: {', '.join(missing_sections)}.")

    if missing_skills:
        suggestions.append(f"Add target skills where honest and relevant: {', '.join(missing_skills)}.")

    if checks["quantifiedImpactCount"] < 3:
        suggestions.append("Quantify achievements with numbers, percentages, ranks, or scale.")

    if checks["actionVerbCount"] < 5:
        suggestions.append("Start more bullets with strong action verbs like built, improved, led, or implemented.")

    if checks["wordCount"] < 350:
        suggestions.append("Add more detail to projects, internships, responsibilities, and outcomes.")
    elif checks["wordCount"] > 900:
        suggestions.append("Shorten the resume so ATS and recruiters can scan it faster.")

    if score >= 85 and not suggestions:
        suggestions.append("Resume looks ATS-friendly. Keep tailoring keywords for each job description.")

    return suggestions[:6]


if __name__ == "__main__":
    app.run(debug=True, port=5000)
