import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { RootProvider } from 'fumadocs-ui/provider';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'FigUI',
  description: 'Open Sourced Figma UI3 Components',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Analytics />
      <body
        className={`font-(--font-family-default) antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>
            <div className='root'>{children}</div>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
