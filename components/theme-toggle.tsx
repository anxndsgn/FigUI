'use client';

import { Button } from '@/registry/ui3/ui/button';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='w-fit'
    >
      <span>Toggle theme</span>
    </Button>
  );
}
