/// <reference types="vite/client" />
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DocsSidebarProvider } from "../components/site/docs-sidebar-context";
import { legacyThemeStorageKey, uiStorageKey } from "../lib/theme";
import appCss from "../styles/app.css?url";

const buttonLinkClass =
  "inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md bg-primary px-3.5 text-sm font-bold text-primary-foreground transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-primary/90 active:scale-[0.96]";

const themeInitScript = `
(() => {
  try {
    const storedUi = window.localStorage.getItem('${uiStorageKey}')
    const parsedUi = storedUi ? JSON.parse(storedUi) : null
    const persistedTheme = parsedUi?.state?.theme
    const legacyTheme = window.localStorage.getItem('${legacyThemeStorageKey}')
    const storedTheme =
      persistedTheme === 'light' || persistedTheme === 'dark' ? persistedTheme : legacyTheme
    const theme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'

    document.documentElement.dataset.theme = theme
  } catch (_) {}
})()
`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "color-scheme", content: "light dark" },
      { title: "FigUI" },
      {
        name: "description",
        content: "Figma UI3 components for your Figma plugins.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <DocsSidebarProvider>
          <div className="h-dvh min-h-0">
            {children}
          </div>
        </DocsSidebarProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="mx-auto w-[min(1120px,calc(100vw_-_40px))] py-14 max-md:w-[min(calc(100%_-_28px),940px)] max-md:pt-9">
      <div className="grid min-h-[420px] content-center gap-4">
        <p className="m-0 text-xs font-bold text-muted-foreground uppercase">404</p>
        <h1 className="m-0 max-w-[780px] text-[clamp(2.25rem,6vw,5.4rem)] leading-[0.96] text-balance max-md:text-4xl max-md:leading-[1.02]">
          Page not found
        </h1>
        <p className="m-0 max-w-[660px] text-[1.06rem] leading-7 text-pretty text-muted-foreground">
          The route does not exist in FigUI.
        </p>
        <Link to="/docs" className={buttonLinkClass}>
          Open docs
        </Link>
      </div>
    </main>
  );
}
