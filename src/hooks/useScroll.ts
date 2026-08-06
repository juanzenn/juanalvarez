import { useEffect, useState } from "react";

export const useScroll = (scrolledValue = 200) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > scrolledValue;

      setScrolled((current) => (current === isScrolled ? current : isScrolled));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolledValue]);

  return scrolled;
};
