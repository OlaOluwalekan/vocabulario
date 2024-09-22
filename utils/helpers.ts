import { marked } from "marked";

export const parseMarkdownToText = (markdown: string) => {
  const html = marked(markdown);
  const doc = new DOMParser().parseFromString(html as string, "text/html");
  return doc.body.textContent || "";
};
