import { motion, useReducedMotion } from "framer-motion"

/**
 * Subtle fade-up reveal when an element scrolls into view.
 * Respects prefers-reduced-motion by rendering without animation.
 */
export default function Reveal({ children, className = "", delay = 0, y = 28, once = true }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
