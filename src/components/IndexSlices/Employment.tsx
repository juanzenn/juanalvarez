import { cn } from "~/lib/cn";
import { FOCUS_RING } from "~/lib/focus-ring";
import { H2, H3, Paragraph } from "../utils/text";

const CV_HREF = "/docs/juan-alvarez-cv.pdf";

const EMPLOYMENT = [
  {
    company: "Atrinium",
    companyLink: "https://www.linkedin.com/company/atrinium/",
    role: "Frontend Developer",
    period: "Apr 2024 – Present",
    description:
      "Sole frontend engineer on Linikit, the management platform for Spain's Kit Digital grant program, where I inherited a legacy React, Next.js and TypeScript codebase and shipped four production modules on top of it — device delivery with in-browser photo capture and carrier integration, voucher-extension signing over SMS, WhatsApp and email, distributors, and settlements with Excel and PDF export. Also designed a config-driven editable table family reused across some seventeen screens and built the cross-tenant announcements module end to end, with a server-enforced state machine, queued dispatch and a GDPR-compliant opt-out flow. Now building the Product Builder catalog layer for Hermes, a multi-tenant insurance SaaS, so product configuration no longer needs a backend ticket.",
  },
  {
    company: "Ingeniust",
    companyLink: "https://www.linkedin.com/company/ingeniust/",
    role: "Mid Senior Developer",
    period: "Sep 2021 – Jan 2024",
    description:
      "Joined as a junior and grew into a mid senior role architecting web applications with React, Next.js, Redux and PHP. Led ADEC Education, a platform teachers across Costa Rica use to author and distribute courses, delivered 28+ production features, cut a persistent bug backlog through targeted refactoring, and set up continuous deployment within an Agile workflow — all while mentoring incoming engineers.",
  },
];

export default function Employment() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 lg:px-0">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <H2>Where I&apos;ve worked</H2>

        <a
          href={CV_HREF}
          download
          className={cn(
            "rounded text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200",
            FOCUS_RING
          )}
        >
          Download CV
        </a>
      </header>

      <ol className="space-y-10 border-l border-gray-300 pl-6 dark:border-gray-600">
        {EMPLOYMENT.map((job) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden
              className="absolute -left-[30px] top-3 h-3 w-3 rounded-full border-2 border-gray-50 bg-primary-700 dark:border-gray-800 dark:bg-primary-400"
            />

            <H3>{job.role}</H3>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              <a
                href={job.companyLink}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "rounded font-semibold text-primary-800 hover:underline dark:text-primary-400",
                  FOCUS_RING
                )}
              >
                {job.company}
              </a>
              {" · "}
              {job.period}
            </p>

            <Paragraph className="mt-3">{job.description}</Paragraph>
          </li>
        ))}
      </ol>
    </section>
  );
}
