import React from "react";

type IForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function useContactForm(form: IForm) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong while sending the message.");
      }

      alert("Message sent successfully!");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    setIsLoading(false);
  };

  return {
    handleSubmit,
    isLoading,
  };
}
