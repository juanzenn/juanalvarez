import { useCallback, useEffect, useState } from "react";

export const useScroll = (scrolledValue = 200) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    setScrolled(offset > scrolledValue);
  }, [scrolledValue]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return scrolled;
};
