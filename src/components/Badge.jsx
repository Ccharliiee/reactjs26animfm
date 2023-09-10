import { motion } from "framer-motion";

export default function Badge({ caption }) {
  return (
    <motion.span
      className="badge"
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 0.25 }}
    >
      {caption}
    </motion.span>
  );
}
