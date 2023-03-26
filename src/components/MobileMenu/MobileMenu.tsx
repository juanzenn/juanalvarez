import { Cross } from "akar-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { backdropVariants, menuVariants } from "./variants";

function MobileMenu({
  handleClose,
  open,
  children,
}: {
  handleClose: () => void;
  open: boolean;
  children: React.ReactNode;
}) {
  const mobileNavRef = useRef(null);
  useOnClickOutside(mobileNavRef, handleClose);

  return (
    <AnimatePresence presenceAffectsLayout>
      {open && (
        <motion.div
          layout
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute top-0 flex h-screen w-screen justify-end overflow-hidden bg-black/60 lg:hidden"
        >
          <motion.ul
            layout
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-0 right-0 flex h-screen w-3/4 flex-col gap-4 bg-gray-50 py-4 shadow-inner dark:bg-gray-800 md:w-1/2"
            ref={mobileNavRef}
          >
            <Cross
              className="mr-4 mb-6 self-end text-primary-900 dark:text-primary-500"
              size={20}
              onClick={handleClose}
            />
            {children}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
