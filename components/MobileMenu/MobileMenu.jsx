import { Cross } from "akar-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { LinkItem } from "../Navbar";
import { backdropVariants, menuVariants } from "./variants";

function MobileMenu({ handleClose, open }) {
  const mobileNavRef = useRef(null);
  useOnClickOutside(mobileNavRef, handleClose);

  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute top-0 flex h-screen w-screen justify-end overflow-hidden bg-black bg-opacity-30 lg:hidden"
        >
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-0 right-0 flex h-screen w-3/4 flex-col gap-4 bg-white py-4 shadow-inner md:w-1/2"
            ref={mobileNavRef}
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
