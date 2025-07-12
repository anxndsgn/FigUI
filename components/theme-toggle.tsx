'use client';

import { Button } from '@/registry/ui3/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='icon'
      variant='ghost'
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
