import React from "react";
import { Paragraph } from "./utils/text";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 py-4 text-center text-sm dark:bg-gray-900">
      <Paragraph size="small" className="text-primary-100">
        Juan Alvarez - {new Date().getFullYear()}
      </Paragraph>
    </footer>
  );
}
