import React from 'react';
import chroma from 'chroma-js';
import { cn } from '@/lib/utils';

const HEX_RE = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const normalizeHex = (s: string): string => {
  const t = s.trim();
  return HEX_RE.test(t) ? `#${t}` : t;
};

interface ColorChitProps {
  color: string;
  opacity?: string | number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ColorChit = React.memo(function ColorChit({
  color,
  opacity,
  className,
  onClick,
}: ColorChitProps) {
  const swatch = React.useMemo(() => {
    try {
      const norm = normalizeHex(color);
      if (chroma.valid(norm)) return chroma(norm).css();
    } catch {}
    return null;
  }, [color]);

  return (
    <div
      className={cn(
        'inset-ring-black-200 dark:inset-ring-white-200 flex size-4 shrink-0 justify-start overflow-hidden rounded-sm inset-ring',
        onClick && 'cursor-pointer',
        className,
      )}
      style={{
        backgroundImage:
          'conic-gradient(#eee 25%, #ccc 0 50%, #eee 0 75%, #ccc 0)',
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0',
        backgroundRepeat: 'repeat',
      }}
      onClick={onClick}
    >
      <div
        className='h-full w-1/2'
        style={{
          backgroundColor: swatch ?? 'transparent',
        }}
      />
      <div
        className='h-full w-1/2'
        style={{
          backgroundColor: swatch ?? 'transparent',
          opacity: opacity === undefined ? undefined : Number(opacity) / 100,
        }}
      />
    </div>
  );
});

export { ColorChit };
