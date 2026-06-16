import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <motion.div
      className="stat-card-v2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
    >
      <div className="stat-card-top">
        <span className="stat-title">
          {title}
        </span>

        <div className="stat-icon">
          {icon}
        </div>
      </div>

      <h2 className="stat-value">
        {value}
      </h2>

      <div className="card-glow"></div>
    </motion.div>
  );
}

export default StatCard;