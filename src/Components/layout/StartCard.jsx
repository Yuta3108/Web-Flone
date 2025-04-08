
import React from "react";
import { motion } from "framer-motion";

export default function StartCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {stat.title}
        </h2>
        <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
      </div>
    </motion.div>
  );
}
