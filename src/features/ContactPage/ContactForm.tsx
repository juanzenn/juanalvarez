import React, { useState } from "react";
import { trpc } from "~/utils/trpc";

export default function ContactForm() {
  const { mutate, isLoading } = trpc.mail.send.useMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSbumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: () => {
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        alert("Message sent! I'll get back to you as soon as possible.");
      },
      onError: (err) => {
        alert(err.message);
      },
    });
  };

  return (
    <form onSubmit={handleSbumit} className="block flex-1 space-y-4">
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
      <label className="mb-2 block font-bold text-gray-700" htmlFor={rest.name}>
        {label}
      </label>
      {area ? (
        <textarea
          id={rest.name}
          className="w-full resize-none rounded"
          rows={5}
          {...rest}
        />
      ) : (
        <input
          id={rest.name}
          type={rest.type ?? "text"}
          className="w-full rounded"
          {...rest}
        />
      )}
    </div>
  );
}
