'use client';

import React from 'react';
import chroma from 'chroma-js';
import { Input as BaseInput } from '@base-ui/react';
import { cn } from '@/lib/utils';
import { INPUT_BASE_CLASS } from './text-input';

const HEX_RE = /^([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const normalizeHex = (s: string): string => {
  const t = s.trim();
  return HEX_RE.test(t) ? `#${t}` : t;
};

const toStringValue = (v: unknown): string => (typeof v === 'string' ? v : '');

const formatHexNoHashUpper = (s: string): string => {
  return chroma(normalizeHex(s)).hex().slice(1).toUpperCase();
};

type BaseInputProps = Omit<React.ComponentProps<typeof BaseInput>, 'onChange'>;

interface ColorInputProps extends BaseInputProps {
  /**
   * Called with the normalized hex string (uppercase, no leading `#`)
   * whenever the user types a valid color, and on commit (blur / Enter).
   */
  onValueChange?: (next: string) => void;
}

function ColorInput({
  onValueChange,
  onBlur,
  onKeyDown,
  value,
  defaultValue,
  className,
  ...props
}: ColorInputProps) {
  type BaseInputChangeEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onChange']>
  >[0];
  type BaseInputBlurEvent = Parameters<NonNullable<BaseInputProps['onBlur']>>[0];
  type BaseInputKeyDownEvent = Parameters<NonNullable<BaseInputProps['onKeyDown']>>[0];

  const initial = toStringValue(value ?? defaultValue ?? '');
  const [inputValue, setInputValue] = React.useState<string>(initial);
  const lastValidRef = React.useRef<string>(
    chroma.valid(normalizeHex(initial))
      ? formatHexNoHashUpper(initial)
      : '000000',
  );

  React.useEffect(() => {
    if (value !== undefined) {
      const s = toStringValue(value);
      setInputValue(s);
      if (chroma.valid(normalizeHex(s))) {
        lastValidRef.current = formatHexNoHashUpper(s);
      }
    }
  }, [value]);

  const handleChange = (e: BaseInputChangeEvent) => {
    const next = e.target.value;
    setInputValue(next);
    if (chroma.valid(normalizeHex(next))) {
      const hex = formatHexNoHashUpper(next);
      lastValidRef.current = hex;
      onValueChange?.(hex);
    }
  };

  const commit = () => {
    if (chroma.valid(normalizeHex(inputValue))) {
      const hex = formatHexNoHashUpper(inputValue);
      setInputValue(hex);
      lastValidRef.current = hex;
      onValueChange?.(hex);
    } else {
      setInputValue(lastValidRef.current);
      onValueChange?.(lastValidRef.current);
    }
  };

  const handleBlur = (e: BaseInputBlurEvent) => {
    commit();
    onBlur?.(e);
  };

  const handleKeyDown = (e: BaseInputKeyDownEvent) => {
    if (e.key === 'Enter') {
      commit();
      e.currentTarget.blur();
    }
    onKeyDown?.(e);
  };

  return (
    <BaseInput
      type='text'
      {...props}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(INPUT_BASE_CLASS, className)}
    />
  );
}

export { ColorInput };
