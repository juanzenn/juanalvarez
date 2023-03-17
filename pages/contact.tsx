import React, { useState } from "react";
import { ZodError } from "zod";
import Layout from "../components/Layout";

export default function ContactPage() {
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

    await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify(form),
    }).then(async (res) => {
      if (res.status === 200) alert("Message sent!");

      if (res.status === 400) {
        const data = (await res.json()) as { error: ZodError };
        const { issues } = data.error;

        const errors = issues
          .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
          .join("\n");

        alert(errors);
      }
    });
  };

  return (
    <Layout>
      <form
        onSubmit={handleSbumit}
        className="mx-auto my-12 grid w-1/2 max-w-[500px] gap-6 rounded-md bg-white p-6 shadow"
      >
        <h1 className="text-4xl font-bold">Contact</h1>

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
          className="ml-auto block w-fit rounded-md bg-primary-900 py-2 px-6 text-white hover:bg-primary-800"
        >
          Submit
        </button>
      </form>
    </Layout>
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
        {label} {rest.required && "*"}
      </label>
      {area ? (
        <textarea
          id={rest.name}
          className="w-full resize-none"
          rows={5}
          {...rest}
        />
      ) : (
        <input
          id={rest.name}
          type={rest.type ?? "text"}
          className="w-full"
          {...rest}
        />
      )}
    </div>
  );
}
