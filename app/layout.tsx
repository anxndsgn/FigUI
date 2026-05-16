import type { Metadata } from 'next';
import './index.css';
import { ThemeProvider } from '@/components/theme-provider';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'FigUI',
  description: 'Open Source Figma UI3 Components',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <Analytics />
      <Script
        defer
        src='https://umami.anxndsgn.com/script.js'
        data-website-id='b2d1a0d8-2447-4e52-8c53-77f386f5a8b5'
      />
      <body className={`font-(--font-family-default) antialiased`}>
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
