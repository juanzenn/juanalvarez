import { ArrowUp } from "akar-icons";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useScroll } from "../hooks/useScroll";

const variants = {
  visible: { opacity: 1, bottom: 16 },
  hidden: { opacity: 0.5, bottom: -100 },
};

function GoTop() {
  const scrolled = useScroll(1000);

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {scrolled ? (
        <motion.div
          onClick={handleGoTop}
          className="fixed right-4 cursor-pointer rounded-full bg-primary-500 p-2 text-white shadow-sm hover:brightness-105"
          initial={variants.hidden}
          animate={variants.visible}
          exit={variants.hidden}
        >
          <ArrowUp size={24} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default GoTop;
