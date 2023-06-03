import ContactDetails from "~/components/ContactDetails";
import SocialmediaLinks from "~/components/SocialmediaLinks";
import { H1, Paragraph } from "~/components/utils/text";

export default function Information() {
  return (
    <div className="flex-1 md:pr-2 lg:pr-4">
      <H1 className="mb-4">Get in touch</H1>

      <Paragraph size="medium">
        Have a project in mind, or just want to say hi? Feel free to contact me.
        Use the form to send me an email, or use the information below to
        contact me directly.{" "}
        <b>I&apos;ll get back to you as soon as possible!</b>
      </Paragraph>

      <SocialmediaLinks />
      <ContactDetails />
    </div>
  );
}
