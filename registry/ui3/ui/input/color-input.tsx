import React from 'react';
import { cn } from '@/lib/utils';
import chroma from 'chroma-js';
import { TextInputPrimitive } from './text-input';
import { InputRoot, type BaseInputProps } from './input-utils';
import { Input as BaseInput } from '@base-ui-components/react';

const HEX_RE = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const HEX8_RE = /^#?[0-9a-fA-F]{8}$/;
const RGBA_RE = /^rgba\(/i;
const HSLA_RE = /^hsla\(/i;
const COLOR_FUNC_RE = /^color\(/i;

const normalizeHex = (s: string): string => {
  const t = s.trim();
  return HEX_RE.test(t) ? `#${t}` : t;
};

const toStringValue = (v: unknown): string => (typeof v === 'string' ? v : '');

const formatHexNoHashUpper = (s: string): string => {
  return chroma(normalizeHex(s)).hex().slice(1).toUpperCase();
};

const hasExplicitAlpha = (s: string): boolean => {
  const t = s.trim();
  return (
    HEX8_RE.test(t) ||
    RGBA_RE.test(t) ||
    HSLA_RE.test(t) ||
    COLOR_FUNC_RE.test(t)
  );
};

const ColorChit = React.memo(function ColorChit({
  color,
  opacity,
  className,
  onClick,
}: {
  color: string;
  opacity?: string | number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
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

function ColorInputPrimitive({
  onChange,
  onBlur,
  onKeyDown,
  value,
  defaultValue,
  className,
  ...props
}: BaseInputProps) {
  type BaseInputChangeEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onChange']>
  >[0];
  type BaseInputBlurEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onBlur']>
  >[0];
  type BaseInputKeyDownEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onKeyDown']>
  >[0];

  const initial = toStringValue(value ?? defaultValue ?? '');
  const [inputValue, setInputValue] = React.useState<string>(initial);
  const lastValidRef = React.useRef<string>(
    chroma.valid(normalizeHex(initial))
      ? formatHexNoHashUpper(initial)
      : '000000',
  );
  const [opacityPercent, setOpacityPercent] = React.useState<number>(() => {
    try {
      if (chroma.valid(normalizeHex(initial))) {
        const a = chroma(normalizeHex(initial)).alpha();
        return Math.round(a * 100);
      }
    } catch {}
    return 100;
  });

  React.useEffect(() => {
    if (value !== undefined) {
      const s = toStringValue(value);
      setInputValue(s);
      if (chroma.valid(normalizeHex(s))) {
        lastValidRef.current = formatHexNoHashUpper(s);
        if (hasExplicitAlpha(s)) {
          try {
            const a = chroma(normalizeHex(s)).alpha();
            setOpacityPercent(Math.round(a * 100));
          } catch {}
        }
      }
    }
  }, [value]);

  const handleChange = React.useCallback(
    (e: BaseInputChangeEvent) => {
      const next = e.target.value;
      setInputValue(next);
      if (chroma.valid(normalizeHex(next))) {
        lastValidRef.current = formatHexNoHashUpper(next);
        if (hasExplicitAlpha(next)) {
          try {
            const a = chroma(normalizeHex(next)).alpha();
            setOpacityPercent(Math.round(a * 100));
          } catch {}
        }
      }
      onChange?.(e);
    },
    [onChange],
  );

  const commit = React.useCallback(() => {
    if (chroma.valid(normalizeHex(inputValue))) {
      const hexNoHashUpper = formatHexNoHashUpper(inputValue);
      setInputValue(hexNoHashUpper);
      lastValidRef.current = hexNoHashUpper;
      if (hasExplicitAlpha(inputValue)) {
        try {
          const a = chroma(normalizeHex(inputValue)).alpha();
          setOpacityPercent(Math.round(a * 100));
        } catch {}
      }
    } else {
      setInputValue(lastValidRef.current);
    }
  }, [inputValue]);

  const handleBlur = React.useCallback(
    (e: BaseInputBlurEvent) => {
      commit();
      onBlur?.(e);
    },
    [commit, onBlur],
  );

  const handleKeyDown = React.useCallback(
    (e: BaseInputKeyDownEvent) => {
      if (e.key === 'Enter') {
        commit();
        e.currentTarget.blur();
      }
      onKeyDown?.(e);
    },
    [commit, onKeyDown],
  );

  const previewHex = lastValidRef.current;
  const previewColor = React.useMemo(() => {
    try {
      return chroma(`#${previewHex}`)
        .alpha((opacityPercent ?? 100) / 100)
        .css();
    } catch {
      return `#${previewHex}`;
    }
  }, [previewHex, opacityPercent]);

  return (
    <TextInputPrimitive
      type='text'
      {...props}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn('w-full flex-1 outline-none', className)}
    />
  );
}

function ColorInput({
  className,
  ...props
}: React.ComponentProps<typeof BaseInput>) {
  return (
    <InputRoot className={cn(className)}>
      <ColorInputPrimitive {...props} />
    </InputRoot>
  );
}

export { ColorInput, ColorChit, ColorInputPrimitive };
