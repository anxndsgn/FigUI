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

const getFormattedHexNoHashUpper = (s: string): string | null => {
  return chroma.valid(normalizeHex(s)) ? formatHexNoHashUpper(s) : null;
};

type BaseInputProps = Omit<React.ComponentProps<typeof BaseInput>, 'onChange'>;

interface ColorInputProps extends BaseInputProps {
  /**
   * Called with the normalized hex string (uppercase, no leading `#`)
   * when the user commits the value (blur / Enter).
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
  type BaseInputBlurEvent = Parameters<
    NonNullable<BaseInputProps['onBlur']>
  >[0];
  type BaseInputKeyDownEvent = Parameters<
    NonNullable<BaseInputProps['onKeyDown']>
  >[0];

  const initial = toStringValue(value ?? defaultValue ?? '');
  const [inputValue, setInputValue] = React.useState<string>(initial);
  const isControlled = value !== undefined;
  const controlledValue = toStringValue(value);
  const [lastControlledValue, setLastControlledValue] =
    React.useState<string>(controlledValue);
  const controlledValidValue = isControlled
    ? getFormattedHexNoHashUpper(controlledValue)
    : null;
  const [lastControlledValidValue, setLastControlledValidValue] =
    React.useState<string | null>(controlledValidValue);
  const lastValidRef = React.useRef<string>(
    getFormattedHexNoHashUpper(initial) ?? '000000',
  );
  const skipNextBlurCommitRef = React.useRef(false);

  if (isControlled && controlledValue !== lastControlledValue) {
    setLastControlledValue(controlledValue);
    setInputValue(controlledValue);
  }

  if (
    isControlled &&
    controlledValidValue !== null &&
    controlledValidValue !== lastControlledValidValue
  ) {
    setLastControlledValidValue(controlledValidValue);
  }

  const handleChange = (e: BaseInputChangeEvent) => {
    setInputValue(e.target.value);
  };

  const commit = (nextValue = inputValue) => {
    const hex = getFormattedHexNoHashUpper(nextValue);

    if (hex !== null) {
      setInputValue(hex);
      lastValidRef.current = hex;
      onValueChange?.(hex);
    } else {
      const fallback = lastControlledValidValue ?? lastValidRef.current;
      setInputValue(fallback);
      onValueChange?.(fallback);
    }
  };

  const handleBlur = (e: BaseInputBlurEvent) => {
    if (skipNextBlurCommitRef.current) {
      skipNextBlurCommitRef.current = false;
    } else {
      commit(e.currentTarget.value);
    }
    onBlur?.(e);
  };

  const handleKeyDown = (e: BaseInputKeyDownEvent) => {
    if (e.key === 'Enter') {
      commit(e.currentTarget.value);
      skipNextBlurCommitRef.current = true;
      e.currentTarget.blur();
    }
    onKeyDown?.(e);
  };

  return (
    <BaseInput
      type='text'
      {...props}
      data-slot='input'
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(INPUT_BASE_CLASS, className)}
    />
  );
}

export { ColorInput };
