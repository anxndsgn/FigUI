'use client';

import {
  InputRoot,
  type BaseInputProps,
  useInputRootContext,
} from './input-utils';
import { TextInputPrimitive } from './text-input';
import { Input as BaseInput } from '@base-ui-components/react';

import React from 'react';

interface NumericInputProps extends BaseInputProps {
  nudgeAmount?: number;
  min?: number | string;
  max?: number | string;
  onValueChange?: (next: string) => void;
}

function NumericInputPrimitive({
  onChange,
  onBlur,
  onKeyDown,
  value,
  defaultValue,
  nudgeAmount = 1,
  min,
  max,
  className,
  onValueChange,
  ...props
}: NumericInputProps) {
  type BaseInputChangeEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onChange']>
  >[0];
  type BaseInputBlurEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onBlur']>
  >[0];
  type BaseInputKeyDownEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onKeyDown']>
  >[0];
  type BaseInputMouseDownEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onMouseDown']>
  >[0];

  const toStringValue = (v: unknown): string => {
    if (typeof v === 'number') return String(v);
    if (typeof v === 'string') return v;
    return '';
  };

  const isValidNumber = (v: string): boolean => {
    return /^-?\d+(\.\d+)?$/.test(v);
  };

  const getDecimalPlaces = (n: number): number => {
    const s = String(n);
    const i = s.indexOf('.');
    return i >= 0 ? s.length - i - 1 : 0;
  };

  const trimTrailingZeros = (s: string): string => {
    if (!s.includes('.')) return s;
    return s.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  };

  const clampNumber = (num: number): number => {
    const minNum = typeof min === 'string' ? Number(min) : min;
    const maxNum = typeof max === 'string' ? Number(max) : max;
    let result = num;
    if (
      minNum !== undefined &&
      Number.isFinite(minNum) &&
      result < (minNum as number)
    )
      result = minNum as number;
    if (
      maxNum !== undefined &&
      Number.isFinite(maxNum) &&
      result > (maxNum as number)
    )
      result = maxNum as number;
    return result;
  };

  const initial = toStringValue(value ?? defaultValue ?? '');
  const [inputValue, setInputValue] = React.useState<string>(initial);
  const lastValidRef = React.useRef<string>(
    isValidNumber(initial) ? initial : '',
  );
  const { setIsMiddleButtonDragging } = useInputRootContext();
  const dragActiveRef = React.useRef<boolean>(false);
  const dragStartXRef = React.useRef<number>(0);
  const dragBaseRef = React.useRef<number>(0);
  const dragStepRef = React.useRef<number>(Number(nudgeAmount ?? 1));
  const dragDecimalsRef = React.useRef<number>(0);
  const dragLastStepsRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (value !== undefined) {
      const s = toStringValue(value);
      setInputValue(s);
      if (isValidNumber(s)) lastValidRef.current = s;
    }
  }, [value]);

  const handleChange = (e: BaseInputChangeEvent) => {
    const next = e.target.value;
    setInputValue(next);
    if (isValidNumber(next)) {
      lastValidRef.current = next;
    }
    onValueChange?.(next);
    onChange?.(e);
  };

  // Basic arithmetic expression evaluator: supports + - * / and parentheses, with unary minus
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
        // handle unary minus
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
    const prec: Record<string, number> = {
      'u-': 3,
      '*': 2,
      '/': 2,
      '+': 1,
      '-': 1,
    };
    const rightAssoc = new Set(['u-']);
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
          ((rightAssoc.has(t) && prec[t] < prec[ops[ops.length - 1]]) ||
            (!rightAssoc.has(t) && prec[t] <= prec[ops[ops.length - 1]]))
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

  const numericInputCommit = React.useCallback(() => {
    const containsOperators = /[+\-*/()]/.test(inputValue);
    if (containsOperators) {
      const result = evaluateExpression(inputValue);
      if (result !== null) {
        const clamped = clampNumber(result);
        const resultStr = String(clamped);
        setInputValue(resultStr);
        lastValidRef.current = resultStr;
      } else {
        if (isValidNumber(lastValidRef.current)) {
          const clamped = clampNumber(Number(lastValidRef.current));
          const s = String(clamped);
          setInputValue(s);
          lastValidRef.current = s;
        } else {
          setInputValue(lastValidRef.current);
        }
      }
    } else if (!isValidNumber(inputValue)) {
      if (isValidNumber(lastValidRef.current)) {
        const clamped = clampNumber(Number(lastValidRef.current));
        const s = String(clamped);
        setInputValue(s);
        lastValidRef.current = s;
      } else {
        setInputValue(lastValidRef.current);
      }
    } else {
      const clamped = clampNumber(Number(inputValue));
      const s = String(clamped);
      setInputValue(s);
      lastValidRef.current = s;
    }
  }, [inputValue, lastValidRef, setInputValue]);

  const handleBlur = (e: BaseInputBlurEvent) => {
    numericInputCommit();
    onBlur?.(e);
  };

  const handleKeyDown = (e: BaseInputKeyDownEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? 1 : -1;
      const containsOperators = /[+\-*/()]/.test(inputValue);
      let base: number | null = null;
      if (containsOperators) base = evaluateExpression(inputValue);
      if (base === null) {
        if (isValidNumber(inputValue)) base = Number(inputValue);
        else if (isValidNumber(lastValidRef.current))
          base = Number(lastValidRef.current);
        else base = 0;
      }
      const step = Number(nudgeAmount ?? 1);
      const decimals = Math.max(
        getDecimalPlaces(base),
        getDecimalPlaces(step),
        typeof min === 'number' ? getDecimalPlaces(min) : 0,
        typeof max === 'number' ? getDecimalPlaces(max) : 0,
      );
      const nextNumber = clampNumber(base + direction * step);
      const nextString = trimTrailingZeros(nextNumber.toFixed(decimals));
      setInputValue(nextString);
      lastValidRef.current = nextString;
      onValueChange?.(nextString);
    } else if (e.key === 'Enter') {
      // Apply the same logic as blur
      numericInputCommit();
      // Then lose focus
      e.currentTarget.blur();
    }
    onKeyDown?.(e);
  };

  const handleMouseDown = (e: BaseInputMouseDownEvent) => {
    // Middle button (button === 1)
    if (e.button !== 1) return;
    e.preventDefault();
    const inputEl = (e.currentTarget as unknown as HTMLElement) ?? null;
    const containsOperators = /[+\-*/()]/.test(inputValue);
    let base: number | null = null;
    if (containsOperators) base = evaluateExpression(inputValue);
    if (base === null) {
      if (isValidNumber(inputValue)) base = Number(inputValue);
      else if (isValidNumber(lastValidRef.current))
        base = Number(lastValidRef.current);
      else base = 0;
    }

    dragActiveRef.current = true;
    setIsMiddleButtonDragging(true);
    dragStartXRef.current = (e as unknown as MouseEvent).clientX;
    dragBaseRef.current = base;
    dragStepRef.current = Number(nudgeAmount ?? 1);
    dragDecimalsRef.current = Math.max(
      getDecimalPlaces(base),
      getDecimalPlaces(dragStepRef.current),
    );
    dragLastStepsRef.current = 0;

    const pixelsPerStep = 8; // horizontal pixels per increment/decrement

    const onMove = (ev: MouseEvent) => {
      if (!dragActiveRef.current) return;
      const dx = ev.clientX - dragStartXRef.current;
      const steps = Math.trunc(dx / pixelsPerStep);
      if (steps === dragLastStepsRef.current) return;
      dragLastStepsRef.current = steps;
      const nextNumber = clampNumber(
        dragBaseRef.current + steps * dragStepRef.current,
      );
      const nextString = trimTrailingZeros(
        nextNumber.toFixed(dragDecimalsRef.current),
      );
      setInputValue(nextString);
      lastValidRef.current = nextString;
      onValueChange?.(nextString);
    };

    const endDrag = () => {
      if (!dragActiveRef.current) return;
      dragActiveRef.current = false;
      setIsMiddleButtonDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      if (inputEl) inputEl.style.cursor = '';
      // Keep the value set during drag; it's already clamped on move
    };

    const onUp = () => {
      endDrag();
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp, { once: true });
    // Change cursor globally while dragging
    document.body.style.cursor = 'ew-resize';
    if (inputEl) inputEl.style.cursor = 'ew-resize';
  };

  return (
    <TextInputPrimitive
      type='text'
      inputMode='decimal'
      className={className}
      min={min as any}
      max={max as any}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      {...props}
    />
  );
}

function NumericInput({ className, iconLead, ...props }: NumericInputProps) {
  return (
    <InputRoot className={className}>
      <NumericInputPrimitive iconLead={iconLead} {...props} />
    </InputRoot>
  );
}

export { NumericInput, NumericInputPrimitive };
