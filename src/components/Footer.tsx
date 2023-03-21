import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-600 py-6 text-center text-sm text-primary-200">
      <span>Juan Alvarez - {new Date().getFullYear()}</span>
    </footer>
  );
}
