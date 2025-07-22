import { motion } from "framer-motion";

export function TreeNode({ valor }: { valor: number }) {
  return (
    <motion.div
      className="rounded-full bg-blue-500 text-white w-12 h-12 flex items-center justify-center shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {valor}
    </motion.div>
  );
}
