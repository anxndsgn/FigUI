'use client';

import { InputRoot, type BaseInputProps } from './input-utils';
import { NumberField } from '@base-ui/react/number-field';
import { cn } from '@/lib/utils';

import React from 'react';

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

interface NumericInputProps
  extends Omit<
    BaseInputProps,
    'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'onKeyDown'
  > {
  value?: number | string;
  defaultValue?: number | string;
  nudgeAmount?: number;
  min?: number | string;
  max?: number | string;
  onValueChange?: (next: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

function NumericInputPrimitive({
  value,
  defaultValue,
  nudgeAmount = 1,
  min,
  max,
  className,
  iconLead,
  iconTrail,
  onValueChange,
  onChange,
  onBlur,
  onKeyDown,
  ...props
}: NumericInputProps) {
  const minNumber = React.useMemo(
    () => (typeof min === 'string' ? Number(min) : min),
    [min],
  );
  const maxNumber = React.useMemo(
    () => (typeof max === 'string' ? Number(max) : max),
    [max],
  );

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<number | null>(
    () => toNullableNumber(value ?? defaultValue),
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

  const tryEvaluateExpression = React.useCallback((): boolean => {
    const raw = inputRef.current?.value ?? '';
    if (!OPERATORS_REGEX.test(raw)) return false;
    const r = evaluateExpression(raw);
    if (r === null) return false;
    const clamped = clampNumber(r, minNumber, maxNumber);
    if (!isControlled) setInternalValue(clamped);
    if (inputRef.current) {
      inputRef.current.value = trimTrailingZeros(String(clamped));
    }
    emit(clamped);
    return true;
  }, [emit, isControlled, maxNumber, minNumber]);

  type InputBlurEvent = Parameters<
    NonNullable<React.ComponentProps<typeof NumberField.Input>['onBlur']>
  >[0];
  type InputKeyDownEvent = Parameters<
    NonNullable<React.ComponentProps<typeof NumberField.Input>['onKeyDown']>
  >[0];

  const handleBlur = React.useCallback(
    (e: InputBlurEvent) => {
      tryEvaluateExpression();
      onBlur?.(e);
    },
    [onBlur, tryEvaluateExpression],
  );

  const handleKeyDown = React.useCallback(
    (e: InputKeyDownEvent) => {
      if (e.key === 'Enter') {
        if (tryEvaluateExpression()) {
          e.preventDefault();
          (e.currentTarget as HTMLInputElement).blur();
        }
      }
      onKeyDown?.(e);
    },
    [onKeyDown, tryEvaluateExpression],
  );

  const step = Number(nudgeAmount ?? 1);

  return (
    <NumberField.Root
      value={rootValue}
      onValueChange={handleValueChange}
      min={minNumber}
      max={maxNumber}
      step={Number.isFinite(step) && step > 0 ? step : 1}
      className='flex h-full w-full items-center'
    >
      {iconLead != null && (
        <NumberField.ScrubArea
          direction='horizontal'
          pixelSensitivity={8}
          className='flex aspect-square size-6 cursor-ew-resize items-center justify-center select-none'
          data-figui='input-icon-lead'
        >
          {typeof iconLead === 'string' ? (
            <span className='text-black-500 dark:text-white-500'>
              {iconLead}
            </span>
          ) : (
            iconLead
          )}
          <NumberField.ScrubAreaCursor className='pointer-events-none z-50'>
            <svg
              width='26'
              height='14'
              viewBox='0 0 24 14'
              fill='black'
              stroke='white'
              style={{ display: 'block' }}
            >
              <path d='M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z' />
            </svg>
          </NumberField.ScrubAreaCursor>
        </NumberField.ScrubArea>
      )}
      <div className='flex h-full flex-1 items-center pr-2 pl-2 has-data-[figui=input-icon-lead]:pl-0 has-data-[figui=input-icon-trail]:pr-0'>
        <NumberField.Input
          {...(props as React.ComponentProps<typeof NumberField.Input>)}
          ref={inputRef}
          className={cn('h-full w-full bg-transparent outline-none', className)}
          onChange={onChange as React.ComponentProps<typeof NumberField.Input>['onChange']}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
      {iconTrail != null && (
        <div
          className='flex aspect-square size-6 items-center justify-center select-none'
          data-figui='input-icon-trail'
        >
          {typeof iconTrail === 'string' ? (
            <span className='text-black-500 dark:text-white-500'>
              {iconTrail}
            </span>
          ) : (
            iconTrail
          )}
        </div>
      )}
    </NumberField.Root>
  );
}

function NumericInput({ className, iconLead, iconTrail, ...props }: NumericInputProps) {
  return (
    <InputRoot className={className}>
      <NumericInputPrimitive
        iconLead={iconLead}
        iconTrail={iconTrail}
        {...props}
      />
    </InputRoot>
  );
}

export { NumericInput, NumericInputPrimitive };
