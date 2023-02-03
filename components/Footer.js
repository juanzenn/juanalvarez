import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-600 text-primary-200 text-center text-sm py-6">
      <span>Juan Alvarez - {new Date().getFullYear()}</span>
    </footer>
  );
}
