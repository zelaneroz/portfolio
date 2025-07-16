// sharedAnimations.tsx
export const cardMotion = {
  whileHover: { scale: 1.05, y: -5 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const modalAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
  transition: { ease: "easeInOut", duration: 0.3 },
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export const staggerLetter = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
