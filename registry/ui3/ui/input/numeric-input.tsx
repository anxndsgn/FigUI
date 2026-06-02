'use client';

import React from 'react';
import { NumberField } from '@base-ui/react/number-field';
import { cn } from '@/lib/utils';
import { INPUT_BASE_CLASS } from './text-input';

// ----- pure helpers -----
const OPERATORS_REGEX = /[+\-*/()]/;
const PREC: Record<string, number> = {
  'u-': 3,
  '*': 2,
  '/': 2,
  '+': 1,
  '-': 1,
};
const RIGHT_ASSOC = new Set(['u-']);

const toNullableNumber = (v: unknown): number | null => {
  if (v === '' || v === undefined || v === null) return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'string') {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

const trimTrailingZeros = (s: string): string => {
  if (!s.includes('.')) return s;
  return s.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
};

const evaluateExpression = (expr: string): number | null => {
  const tokens: (number | string)[] = [];
  const src = expr.replace(/\s+/g, '');
  let i = 0;
  const isDigit = (c: string) => /[0-9]/.test(c);
  while (i < src.length) {
    const c = src[i];
    if (isDigit(c) || c === '.') {
      let j = i + 1;
      while (j < src.length && (isDigit(src[j]) || src[j] === '.')) j++;
      const n = Number(src.slice(i, j));
      if (!Number.isFinite(n)) return null;
      tokens.push(n);
      i = j;
    } else if (
      c === '+' ||
      c === '-' ||
      c === '*' ||
      c === '/' ||
      c === '(' ||
      c === ')'
    ) {
      const prev = tokens[tokens.length - 1];
      if (
        c === '-' &&
        (prev === undefined ||
          (typeof prev === 'string' &&
            (prev === '+' ||
              prev === '-' ||
              prev === '*' ||
              prev === '/' ||
              prev === '(')))
      ) {
        tokens.push('u-');
        i++;
      } else {
        tokens.push(c);
        i++;
      }
    } else {
      return null;
    }
  }
  const output: (number | string)[] = [];
  const ops: string[] = [];
  for (const t of tokens) {
    if (typeof t === 'number') {
      output.push(t);
    } else if (t === '(') {
      ops.push(t);
    } else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(')
        output.push(ops.pop() as string);
      if (ops.pop() !== '(') return null;
    } else {
      while (
        ops.length &&
        ops[ops.length - 1] !== '(' &&
        ((RIGHT_ASSOC.has(t) && PREC[t] < PREC[ops[ops.length - 1]]) ||
          (!RIGHT_ASSOC.has(t) && PREC[t] <= PREC[ops[ops.length - 1]]))
      )
        output.push(ops.pop() as string);
      ops.push(t);
    }
  }
  while (ops.length) {
    const op = ops.pop() as string;
    if (op === '(') return null;
    output.push(op);
  }
  const stack: number[] = [];
  for (const t of output) {
    if (typeof t === 'number') stack.push(t);
    else if (t === 'u-') {
      const a = stack.pop();
      if (a === undefined) return null;
      stack.push(-a);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) return null;
      let r: number;
      if (t === '+') r = a + b;
      else if (t === '-') r = a - b;
      else if (t === '*') r = a * b;
      else if (t === '/') r = a / b;
      else return null;
      if (!Number.isFinite(r)) return null;
      stack.push(r);
    }
  }
  if (stack.length !== 1) return null;
  return stack[0];
};

const clampNumber = (num: number, minNum?: number, maxNum?: number): number => {
  let result = num;
  if (minNum !== undefined && Number.isFinite(minNum) && result < minNum)
    result = minNum;
  if (maxNum !== undefined && Number.isFinite(maxNum) && result > maxNum)
    result = maxNum;
  return result;
};

// ----- internal context: lets <NumericInput/> reach Root state for expression eval -----
interface NumericContextValue {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  minNumber?: number;
  maxNumber?: number;
  isControlled: boolean;
  setInternalValue: (n: number | null) => void;
  emit: (n: number | null) => void;
}

const NumericContext = React.createContext<NumericContextValue | null>(null);

// ----- Root -----
interface NumericInputRootProps extends Omit<
  React.ComponentProps<typeof NumberField.Root>,
  'value' | 'defaultValue' | 'min' | 'max' | 'step' | 'onValueChange'
> {
  value?: number | string;
  defaultValue?: number | string;
  min?: number | string;
  max?: number | string;
  nudgeAmount?: number;
  onValueChange?: (next: string) => void;
}

function NumericInputRoot({
  value,
  defaultValue,
  min,
  max,
  nudgeAmount = 1,
  onValueChange,
  className,
  children,
  ...props
}: NumericInputRootProps) {
  const minNumber = React.useMemo(
    () => (typeof min === 'string' ? Number(min) : min),
    [min],
  );
  const maxNumber = React.useMemo(
    () => (typeof max === 'string' ? Number(max) : max),
    [max],
  );

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<number | null>(() =>
    toNullableNumber(value ?? defaultValue),
  );
  const rootValue = isControlled ? toNullableNumber(value) : internalValue;

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const emit = React.useCallback(
    (n: number | null) => {
      if (n === null) {
        onValueChange?.('');
      } else {
        onValueChange?.(trimTrailingZeros(String(n)));
      }
    },
    [onValueChange],
  );

  const handleValueChange = React.useCallback(
    (next: number | null) => {
      if (!isControlled) setInternalValue(next);
      emit(next);
    },
    [emit, isControlled],
  );

  const step = Number(nudgeAmount ?? 1);

  const ctx = React.useMemo<NumericContextValue>(
    () => ({
      inputRef,
      minNumber,
      maxNumber,
      isControlled,
      setInternalValue,
      emit,
    }),
    [minNumber, maxNumber, isControlled, emit],
  );

  return (
    <NumericContext.Provider value={ctx}>
      <NumberField.Root
        value={rootValue}
        onValueChange={handleValueChange}
        min={minNumber}
        max={maxNumber}
        step={Number.isFinite(step) && step > 0 ? step : 1}
        className={cn(
          'inline-flex h-6 items-center rounded-md',
          'has-data-scrubbing:cursor-ew-resize has-data-scrubbing:ring-blue-600! dark:has-data-scrubbing:ring-blue-400!',
          className,
        )}
        {...props}
      >
        {children}
      </NumberField.Root>
    </NumericContext.Provider>
  );
}

// ----- Input -----
type NumberFieldInputProps = React.ComponentProps<typeof NumberField.Input>;

function NumericInput({
  className,
  onBlur,
  onKeyDown,
  ...props
}: NumberFieldInputProps) {
  const ctx = React.useContext(NumericContext);

  const tryEvaluateExpression = React.useCallback((): boolean => {
    if (!ctx) return false;
    const raw = ctx.inputRef.current?.value ?? '';
    if (!OPERATORS_REGEX.test(raw)) return false;
    const r = evaluateExpression(raw);
    if (r === null) return false;
    const clamped = clampNumber(r, ctx.minNumber, ctx.maxNumber);
    if (!ctx.isControlled) ctx.setInternalValue(clamped);
    if (ctx.inputRef.current) {
      ctx.inputRef.current.value = trimTrailingZeros(String(clamped));
    }
    ctx.emit(clamped);
    return true;
  }, [ctx]);

  const handleBlur: NumberFieldInputProps['onBlur'] = (e) => {
    tryEvaluateExpression();
    onBlur?.(e);
  };

  const handleKeyDown: NumberFieldInputProps['onKeyDown'] = (e) => {
    if (e.key === 'Enter') {
      if (tryEvaluateExpression()) {
        e.preventDefault();
        (e.currentTarget as HTMLInputElement).blur();
      }
    }
    onKeyDown?.(e);
  };

  return (
    <NumberField.Input
      {...props}
      ref={ctx?.inputRef}
      className={cn(INPUT_BASE_CLASS, 'flex-1', className)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
}

// ----- ScrubArea -----
function ScrubAreaCursorIcon({ className }: { className?: string }) {
  return (
    <svg
      width='26'
      height='14'
      viewBox='0 0 24 14'
      fill='black'
      stroke='white'
      style={{ display: 'block' }}
      className={className}
    >
      <path d='M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z' />
    </svg>
  );
}

// A sizeless wrapper. The consumer decides the size, padding, and visual
// content via className + children. The cursor + horizontal scrub behavior
// are baked in.
function NumericScrubArea({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <NumberField.ScrubArea
      direction='horizontal'
      pixelSensitivity={8}
      className={cn('cursor-ew-resize select-none', className)}
    >
      {children}
      <NumberField.ScrubAreaCursor className='pointer-events-none z-50'>
        <ScrubAreaCursorIcon />
      </NumberField.ScrubAreaCursor>
    </NumberField.ScrubArea>
  );
}

export { NumericInputRoot, NumericScrubArea, NumericInput };
