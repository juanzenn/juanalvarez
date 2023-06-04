"use client";
import React, { useState } from "react";
import { useContactForm } from "./use-contact-form";

const DEFAULT_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(DEFAULT_FORM);

  const { handleSubmit, isLoading } = useContactForm(form);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={async (e) => {
        await handleSubmit(e);
        setForm(DEFAULT_FORM);
      }}
      className="block flex-1 space-y-4"
    >
      <TextInput
        label="Name"
        name="name"
        onChange={handleChange}
        value={form.name}
        required
      />
      <TextInput
        label="Email"
        type="email"
        name="email"
        onChange={handleChange}
        value={form.email}
        required
      />
      <TextInput
        label="Subject"
        name="subject"
        onChange={handleChange}
        value={form.subject}
        required
      />
      <TextInput
        label="Message"
        name="message"
        onChange={handleChange}
        value={form.message}
        required
        area
      />

      <button
        type="submit"
        className="ml-auto block w-fit rounded-md bg-primary-900 py-2 px-6 text-white hover:bg-primary-800 disabled:cursor-wait disabled:bg-gray-300 disabled:text-gray-500"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

function TextInput({
  label,
  area = false,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label: string;
  area?: boolean;
}) {
  return (
    <div className="w-full">
      <label
        className="mb-2 block font-bold text-gray-700 dark:text-gray-200"
        htmlFor={rest.name}
      >
        {label}
      </label>
      {area ? (
        <textarea
          id={rest.name}
          className="w-full resize-none rounded dark:text-gray-800"
          rows={5}
          {...rest}
        />
      ) : (
        <input
          id={rest.name}
          type={rest.type ?? "text"}
          className="w-full rounded dark:text-gray-800"
          {...rest}
        />
      )}
    </div>
  );
}
