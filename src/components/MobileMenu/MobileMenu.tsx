import { Cross } from "akar-icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { backdropVariants, menuVariants } from "./variants";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function MobileMenu({
  onClose,
  open,
  triggerRef,
  children,
}: {
  onClose: () => void;
  open: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const mobileNavRef = useRef<HTMLUListElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (target && triggerRef?.current?.contains(target)) return;

      onClose();
    },
    [onClose, triggerRef]
  );

  useOnClickOutside(mobileNavRef, handleClickOutside);

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef?.current;
    closeButtonRef.current?.focus();

    return () => trigger?.focus();
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const menu = mobileNavRef.current;
      if (!menu) return;

      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const insideMenu = active instanceof Node && menu.contains(active);

      if (event.shiftKey && (!insideMenu || active === first)) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && (!insideMenu || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence presenceAffectsLayout>
      {open && (
        <motion.div
          layout
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed top-0 flex h-screen w-screen justify-end overflow-hidden bg-black/60 lg:hidden"
        >
          <motion.ul
            layout
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-0 right-0 flex h-screen w-3/4 flex-col gap-4 bg-gray-50 py-4 shadow-inner dark:bg-gray-800 md:w-1/2"
            id="mobile-menu"
            ref={mobileNavRef}
          >
            <li className="mb-6 self-end">
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close menu"
                className="mr-4 block text-primary-900 dark:text-primary-500"
                onClick={onClose}
              >
                <Cross size={20} />
              </button>
            </li>
            {children}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
