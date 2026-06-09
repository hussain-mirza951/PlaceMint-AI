CURRENT_YEAR = 2026


COMPANY_RULES = [
    {
        "name": "Amazon",
        "min_cgpa": 7.5,
        "max_backlogs": 0,
        "graduation_years": [2026, 2027],
        "branches": ["CSE", "IT", "ECE"],
        "required_skills": ["Data Structures", "Algorithms", "OOP", "System Design"],
    },
    {
        "name": "Google",
        "min_cgpa": 8.5,
        "max_backlogs": 0,
        "graduation_years": [2026, 2027],
        "branches": ["CSE", "IT"],
        "required_skills": [
            "Data Structures",
            "Algorithms",
            "System Design",
            "Competitive Programming",
        ],
    },
    {
        "name": "Microsoft",
        "min_cgpa": 8.0,
        "max_backlogs": 1,
        "graduation_years": [2026, 2027],
        "branches": ["CSE", "IT", "ECE"],
        "required_skills": ["Data Structures", "OOP", "Full Stack Projects", "SQL"],
    },
    {
        "name": "TCS",
        "min_cgpa": 6.0,
        "max_backlogs": 1,
        "graduation_years": [2025, 2026, 2027],
        "branches": ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"],
        "required_skills": ["Programming Basics", "SQL", "Aptitude"],
    },
    {
        "name": "Infosys",
        "min_cgpa": 6.5,
        "max_backlogs": 1,
        "graduation_years": [2025, 2026, 2027],
        "branches": ["CSE", "IT", "ECE", "EEE"],
        "required_skills": ["Programming Basics", "OOP", "SQL"],
    },
    {
        "name": "Wipro",
        "min_cgpa": 6.0,
        "max_backlogs": 1,
        "graduation_years": [2025, 2026, 2027],
        "branches": ["CSE", "IT", "ECE", "EEE", "Mechanical"],
        "required_skills": ["Programming Basics", "Communication", "Aptitude"],
    },
    {
        "name": "Accenture",
        "min_cgpa": 6.5,
        "max_backlogs": 0,
        "graduation_years": [2025, 2026, 2027],
        "branches": ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil"],
        "required_skills": ["Programming Basics", "SQL", "Communication"],
    },
]


def validate_eligibility_payload(payload):
    errors = {}

    cgpa = parse_float(payload.get("cgpa"))
    graduation_year = parse_int(payload.get("graduationYear"))
    branch = clean_text(payload.get("branch"))
    backlogs = parse_int(payload.get("backlogs"))
    skills = parse_skills(payload.get("skills"))

    if cgpa is None or cgpa < 0 or cgpa > 10:
        errors["cgpa"] = "CGPA must be a number between 0 and 10."

    if graduation_year is None or graduation_year < CURRENT_YEAR - 2 or graduation_year > CURRENT_YEAR + 5:
        errors["graduationYear"] = "Graduation year must be a valid upcoming campus placement year."

    if not branch:
        errors["branch"] = "Branch is required."

    if backlogs is None or backlogs < 0:
        errors["backlogs"] = "Backlogs must be zero or a positive number."

    if not skills:
        errors["skills"] = "Enter at least one skill."

    if errors:
        return None, errors

    return {
        "cgpa": cgpa,
        "graduationYear": graduation_year,
        "branch": normalize_branch(branch),
        "backlogs": backlogs,
        "skills": skills,
    }, {}


def check_eligibility(student):
    companies = [evaluate_company(student, rule) for rule in COMPANY_RULES]
    eligible_companies = [company for company in companies if company["isEligible"]]
    not_eligible_companies = [company for company in companies if not company["isEligible"]]
    eligibility_percentage = round(
        sum(company["eligibilityPercentage"] for company in companies) / len(companies)
    )

    return {
        "student": student,
        "eligibleCompanies": eligible_companies,
        "notEligibleCompanies": not_eligible_companies,
        "eligibilityPercentage": eligibility_percentage,
        "totalCompanies": len(companies),
    }


def evaluate_company(student, rule):
    reasons = []
    matched_skills = [
        skill
        for skill in rule["required_skills"]
        if skill.lower() in {student_skill.lower() for student_skill in student["skills"]}
    ]
    missing_skills = [
        skill for skill in rule["required_skills"] if skill not in matched_skills
    ]

    cgpa_ok = student["cgpa"] >= rule["min_cgpa"]
    backlogs_ok = student["backlogs"] <= rule["max_backlogs"]
    year_ok = student["graduationYear"] in rule["graduation_years"]
    branch_ok = student["branch"] in rule["branches"]
    skills_ok = not missing_skills

    if not cgpa_ok:
        reasons.append(f"CGPA must be at least {rule['min_cgpa']}.")

    if not backlogs_ok:
        reasons.append(f"Active backlogs must be {rule['max_backlogs']} or fewer.")

    if not year_ok:
        years = ", ".join(str(year) for year in rule["graduation_years"])
        reasons.append(f"Graduation year must be one of: {years}.")

    if not branch_ok:
        reasons.append(f"Eligible branches: {', '.join(rule['branches'])}.")

    if not skills_ok:
        reasons.append(f"Missing skills: {', '.join(missing_skills)}.")

    score = calculate_company_percentage(
        student=student,
        rule=rule,
        cgpa_ok=cgpa_ok,
        backlogs_ok=backlogs_ok,
        year_ok=year_ok,
        branch_ok=branch_ok,
        matched_skill_count=len(matched_skills),
    )
    is_eligible = not reasons

    return {
        "company": rule["name"],
        "status": get_status(is_eligible, score),
        "isEligible": is_eligible,
        "eligibilityPercentage": score,
        "reasons": reasons,
        "matchedSkills": matched_skills,
        "missingSkills": missing_skills,
        "rules": {
            "minCgpa": rule["min_cgpa"],
            "maxBacklogs": rule["max_backlogs"],
            "graduationYears": rule["graduation_years"],
            "branches": rule["branches"],
            "requiredSkills": rule["required_skills"],
        },
    }


def calculate_company_percentage(
    student,
    rule,
    cgpa_ok,
    backlogs_ok,
    year_ok,
    branch_ok,
    matched_skill_count,
):
    cgpa_score = min(1, student["cgpa"] / rule["min_cgpa"]) * 30
    backlog_score = 15 if backlogs_ok else 0
    year_score = 15 if year_ok else 0
    branch_score = 15 if branch_ok else 0
    skill_score = (matched_skill_count / len(rule["required_skills"])) * 25

    if cgpa_ok:
        cgpa_score = 30

    return round(cgpa_score + backlog_score + year_score + branch_score + skill_score)


def get_status(is_eligible, score):
    if is_eligible:
        return "eligible"

    if score >= 70:
        return "needs_improvement"

    return "not_eligible"


def parse_float(value):
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def parse_int(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def parse_skills(value):
    if isinstance(value, list):
        raw_skills = value
    else:
        raw_skills = str(value or "").split(",")

    return sorted({clean_text(skill) for skill in raw_skills if clean_text(skill)})


def clean_text(value):
    return str(value or "").strip()


def normalize_branch(branch):
    branch_map = {
        "computer science": "CSE",
        "cse": "CSE",
        "information technology": "IT",
        "it": "IT",
        "ece": "ECE",
        "electronics and communication": "ECE",
        "eee": "EEE",
        "electrical": "EEE",
        "mechanical": "Mechanical",
        "civil": "Civil",
    }

    return branch_map.get(branch.lower(), branch)
