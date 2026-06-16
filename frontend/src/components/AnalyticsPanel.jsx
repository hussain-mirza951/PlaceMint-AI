import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AnalyticsPanel() {
  const data = [
    { name: "Resume", score: 0 },
    { name: "Skills", score: 50 },
    { name: "Aptitude", score: 60 },
    { name: "Readiness", score: 37 },
  ];

  return (
    <div className="analytics-panel">
      <h2>Performance Analytics</h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.1}
          />

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Bar
            dataKey="score"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsPanel;