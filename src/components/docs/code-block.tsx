import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Children, isValidElement, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { CopyButton } from "./copy-button";

const COLLAPSE_LINE_THRESHOLD = 16;

const languageAliases: Record<string, string> = {
  bash: "shellscript",
  cmd: "shellscript",
  command: "shellscript",
  html: "html",
  js: "javascript",
  jsx: "jsx",
  md: "markdown",
  mdx: "mdx",
  shell: "shellscript",
  sh: "shellscript",
  text: "plaintext",
  ts: "typescript",
  tsx: "tsx",
  txt: "plaintext",
};

export type CodeBlockProps = {
  code?: string;
  language?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  tabIndex?: number;
};

export function CodeBlock({ code, language, title, children, style, tabIndex }: CodeBlockProps) {
  const extracted = extractCode(children);
  const source = stripTrailingNewline(code ?? extracted.code);
  const resolvedLanguage = language ?? extracted.language ?? "text";
  const displayLanguage = language ?? extracted.displayLanguage ?? resolvedLanguage;
  const highlightedHtml = extracted.highlighted
    ? undefined
    : highlightCodeToHtml(source, resolvedLanguage);
  const lineCount = countLines(source);
  const isCollapsible = lineCount > COLLAPSE_LINE_THRESHOLD;
  const [expanded, setExpanded] = useState(false);
  const collapsed = isCollapsible && !expanded;

  return (
    <figure className="m-0 overflow-hidden rounded-lg bg-muted text-foreground">
      <figcaption className="flex items-center justify-between border-b border-border p-2 pl-4 text-xs font-bold text-muted-foreground">
        <span>{title ?? displayLanguage}</span>
        <CopyButton value={source} label="Copy code" />
      </figcaption>
      <div className="relative">
        <div
          className={cn(
            "overflow-x-auto",
            isCollapsible && "pb-10",
            collapsed && "max-h-[calc(1.75rem*16+2rem+2.5rem)] overflow-y-hidden",
          )}
        >
          <pre
            className="m-0 p-4"
            style={extracted.highlighted ? style : undefined}
            tabIndex={tabIndex}
          >
            {extracted.highlighted ? (
              <code className="shiki-code text-[0.86rem] leading-7 text-inherit">
                {extracted.highlighted}
              </code>
            ) : (
              <code
                className="text-[0.86rem] leading-7 text-inherit"
                dangerouslySetInnerHTML={{ __html: highlightedHtml ?? "" }}
              />
            )}
          </pre>
        </div>
        {collapsed ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-10 h-20 bg-linear-to-t from-muted via-muted/80 to-transparent"
          />
        ) : null}
        {isCollapsible ? (
          <div className="absolute inset-x-0 bottom-0 flex justify-center border-t border-border bg-muted p-2">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        ) : null}
      </div>
    </figure>
  );
}

function normalizeLanguage(language: string) {
  const normalized = language.toLowerCase().replace(/^language-/, "");
  return languageAliases[normalized] ?? normalized;
}

export function highlightCodeToHtml(code: string, language: string) {
  const lang = normalizeLanguage(language);

  if (["json", "jsonc", "json5"].includes(lang)) {
    return highlightWithPattern(code, jsonPattern, classifyJsonToken);
  }

  if (["bash", "shell", "shellscript"].includes(lang)) {
    return highlightWithPattern(code, shellPattern, classifyShellToken);
  }

  if (lang === "css") {
    return highlightWithPattern(code, cssPattern, classifyCssToken);
  }

  if (["html", "markdown", "mdx"].includes(lang)) {
    return highlightWithPattern(code, markupPattern, classifyMarkupToken);
  }

  if (["javascript", "jsx", "typescript", "tsx"].includes(lang)) {
    return highlightWithPattern(code, tsxPattern, classifyTsxToken);
  }

  return escapeHtml(code);
}

const tsxPattern =
  /(\/\/.*|\/\*.*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:as|async|await|break|case|catch|class|const|continue|default|else|export|extends|false|finally|for|from|function|if|import|in|interface|let|new|null|of|return|satisfies|switch|true|try|type|typeof|undefined|var|while)\b|\b[A-Z][A-Za-z0-9_]*(?=\b)|<\/?[A-Za-z][\w:.-]*|\b\d+(?:\.\d+)?\b|[{}()[\].,;:=<>/]+)/g;

const jsonPattern =
  /("(?:\\.|[^"\\])*"(?=\s*:)|"(?:\\.|[^"\\])*"|-?\b\d+(?:\.\d+)?\b|\b(?:true|false|null)\b|[{}[\],:])/g;

const shellPattern =
  /(#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|--?[\w-]+|\b(?:bun|cd|cp|git|mkdir|mv|npm|npx|pnpm|rm|shadcn|yarn)\b|[|&;])/g;

const cssPattern =
  /(\/\*.*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw)?\b|[.#]?-?[_a-zA-Z]+[_a-zA-Z0-9-]*(?=\s*[:{])|[{}:;(),])/g;

const markupPattern =
  /(<!--.*?-->|<\/?[A-Za-z][\w:.-]*|(?:[A-Za-z_:][\w:.-]*)(?==)|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[{}<>/=]+)/g;

function highlightWithPattern(
  code: string,
  pattern: RegExp,
  classify: (token: string) => TokenKind | null,
) {
  let html = "";
  let cursor = 0;

  for (const match of code.matchAll(pattern)) {
    const token = match[0];
    const index = match.index ?? 0;

    html += escapeHtml(code.slice(cursor, index));
    html += wrapToken(token, classify(token));
    cursor = index + token.length;
  }

  html += escapeHtml(code.slice(cursor));

  return html;
}

type TokenKind =
  | "comment"
  | "keyword"
  | "name"
  | "number"
  | "property"
  | "punctuation"
  | "string"
  | "tag";

const tokenColors: Record<TokenKind, string> = {
  comment: "var(--code-token-comment)",
  keyword: "var(--code-token-keyword)",
  name: "var(--code-token-name)",
  number: "var(--code-token-number)",
  property: "var(--code-token-property)",
  punctuation: "var(--code-token-punctuation)",
  string: "var(--code-token-string)",
  tag: "var(--code-token-tag)",
};

function classifyTsxToken(token: string): TokenKind | null {
  if (token.startsWith("//") || token.startsWith("/*")) return "comment";
  if (isQuoted(token)) return "string";
  if (/^<\/?[A-Za-z]/.test(token)) return "tag";
  if (/^[A-Z]/.test(token)) return "name";
  if (/^\d/.test(token)) return "number";
  if (/^[{}()[\].,;:=<>/]+$/.test(token)) return "punctuation";
  return "keyword";
}

function classifyJsonToken(token: string): TokenKind | null {
  if (/^".*"$/.test(token) && /"\s*$/.test(token)) return "string";
  if (/^".*"$/.test(token)) return "property";
  if (/^-?\d/.test(token)) return "number";
  if (/^(true|false|null)$/.test(token)) return "keyword";
  return "punctuation";
}

function classifyShellToken(token: string): TokenKind | null {
  if (token.startsWith("#")) return "comment";
  if (isQuoted(token)) return "string";
  if (token.startsWith("-")) return "property";
  if (/^[|&;]$/.test(token)) return "punctuation";
  return "keyword";
}

function classifyCssToken(token: string): TokenKind | null {
  if (token.startsWith("/*")) return "comment";
  if (isQuoted(token)) return "string";
  if (token.startsWith("#") || /^\d/.test(token)) return "number";
  if (/^[{}:;(),]$/.test(token)) return "punctuation";
  return "property";
}

function classifyMarkupToken(token: string): TokenKind | null {
  if (token.startsWith("<!--")) return "comment";
  if (isQuoted(token)) return "string";
  if (/^<\/?[A-Za-z]/.test(token)) return "tag";
  if (/^[{}<>/=]+$/.test(token)) return "punctuation";
  return "property";
}

function wrapToken(token: string, kind: TokenKind | null) {
  if (!kind) return escapeHtml(token);

  return `<span style="color:${tokenColors[kind]}">${escapeHtml(token)}</span>`;
}

function isQuoted(token: string) {
  return token.startsWith('"') || token.startsWith("'") || token.startsWith("`");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function extractCode(children: ReactNode) {
  const child = Children.toArray(children)[0];

  if (!isValidElement(child)) {
    return {
      code: collectText(children),
      displayLanguage: undefined,
      highlighted: undefined,
      language: undefined,
    };
  }

  const props = child.props as {
    children?: ReactNode;
    className?: string;
  };
  const language = extractLanguage(props.className);
  const highlighted = hasHighlightedChildren(props.children) ? props.children : undefined;

  return {
    code: collectText(props.children),
    displayLanguage: language,
    highlighted,
    language: language ? normalizeLanguage(language) : undefined,
  };
}

function extractLanguage(className?: string) {
  return className
    ?.split(/\s+/)
    .find((name) => name.startsWith("language-"))
    ?.replace("language-", "");
}

function hasHighlightedChildren(value: ReactNode): boolean {
  if (Array.isArray(value)) {
    return value.some(hasHighlightedChildren);
  }

  return (
    isValidElement<{ className?: string }>(value) &&
    Boolean(value.props.className?.split(/\s+/).includes("line"))
  );
}

function collectText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(collectText).join("");
  }

  if (isValidElement<{ children?: ReactNode; className?: string }>(value)) {
    const text = collectText(value.props.children);

    if (value.props.className?.split(/\s+/).includes("line")) {
      return `${text}\n`;
    }

    return text;
  }

  return "";
}

function stripTrailingNewline(value: string) {
  return value.replace(/\n$/, "");
}

function countLines(value: string) {
  if (!value) return 0;
  return value.split("\n").length;
}
