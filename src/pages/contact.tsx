import Head from "next/head";
import React, { useState } from "react";
import Layout from "~/components/Layout";
import { trpc } from "~/utils/trpc";

export default function ContactPage() {
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
    <>
      <Head>
        <title>Juan Alvarez - Contact</title>
      </Head>

      <Layout>
        <form
          onSubmit={handleSbumit}
          className="mx-6 my-12 grid gap-6 rounded-md bg-white p-6 shadow lg:mx-auto lg:w-1/2 lg:max-w-[500px]"
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
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </Layout>
    </>
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
