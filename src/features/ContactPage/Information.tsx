import ContactDetails from "~/components/ContactDetails";
import SocialmediaLinks from "~/components/SocialmediaLinks";

export default function Information() {
  return (
    <div className="flex-1 text-gray-700 md:pr-2 lg:pr-4">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Get in touch</h1>

      <p className="prose-lg mb-6">
        Have a project in mind, or just want to say hi? Feel free to contact me.
        Use the form to send me an email, or use the information below to
        contact me directly.{" "}
        <b>I&apos;ll get back to you as soon as possible!</b>
      </p>

      <SocialmediaLinks />
      <ContactDetails />
    </div>
  );
}
