import type { ShikiTransformer } from "shiki";
import { codeToHtml } from "shiki/bundle/web";

const FENCE = /^```([\w-]+)\s*$/;
const DEFAULT_LANGUAGE = "text";

function parseFence(text: string) {
  const [first, ...rest] = text.split("\n");
  const match = first.match(FENCE);

  if (!match) return { language: DEFAULT_LANGUAGE, code: text };

  return { language: match[1], code: rest.join("\n") };
}

const hangingIndent: ShikiTransformer = {
  name: "hanging-indent",
  line(node, line) {
    const source = this.source.split("\n")[line - 1] ?? "";
    const indent = source.match(/^[ \t]*/)![0].replace(/\t/g, "  ").length;

    node.properties.style = `--indent:${indent}ch`;
  },
};

function highlight(source: string, lang: string) {
  return codeToHtml(source, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
    transformers: [hangingIndent],
  });
}

export default async function CodeBlock({ code }: { code: string }) {
  const { language, code: source } = parseFence(code);

  const html = await highlight(source, language).catch(() =>
    highlight(source, DEFAULT_LANGUAGE)
  );

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
