import { Cross } from "akar-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { LinkItem } from "./Navbar";

const backdropVariants = {
  visible: { opacity: 1, transition: { duration: 0.1 } },
  hidden: { opacity: 0, transition: { duration: 0.1, delay: 0.2 } },
};

const menuVariants = {
  visible: { x: 0, transition: { duration: 0.3, delay: 0.1 } },
  hidden: { x: "100%", transition: { duration: 0.2 } },
};

function MobileMenu({ handleClose, open }) {
  const mobileNavRef = useRef(null);
  useOnClickOutside(mobileNavRef, handleClose);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed top-0 z-20 flex h-screen w-full justify-end bg-black bg-opacity-30 lg:hidden"
        >
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            ref={mobileNavRef}
            className="flex w-3/5 flex-col gap-4 bg-white py-4 shadow-inner"
          >
            <Cross
              className="mr-4 mb-6 self-end text-primary-900"
              size={20}
              onClick={handleClose}
            />
            <LinkItem onClick={handleClose} href="/">
              Home
            </LinkItem>
            <LinkItem onClick={handleClose} href="/blog">
              Blog
            </LinkItem>
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
