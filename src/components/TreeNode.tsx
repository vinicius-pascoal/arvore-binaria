"use client";
import { motion } from "framer-motion";

export function TreeNode({ valor }: { valor: number }) {
  return (
    <motion.div
      className="rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center shadow-md"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {valor}
    </motion.div>
  );
}
