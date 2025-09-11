'use client';
import * as React from 'react';
import { Input as BaseInput } from '@base-ui-components/react';
import { cn } from '@/lib/utils';

function TextInput({
  className,
  type,
  iconLead,
  ...props
}: React.ComponentProps<typeof BaseInput> & { iconLead?: React.ReactNode }) {
  return (
    <div
      className={cn(
        'placeholder:text-grey-400 text-black-800 bg-grey-100 typography-body-medium hover:border-grey-200 dark:placeholder:text-grey-400 dark:bg-grey-700 dark:text-white-1000 dark:hover:border-grey-600 flex h-6 w-full min-w-0 items-center rounded-md border border-transparent pr-2 outline-none selection:bg-blue-500 focus-within:border-blue-500 hover:focus-within:border-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:focus-within:border-blue-500',
        iconLead ? '' : 'pl-2',
        className,
      )}
    >
      {iconLead && (
        <div className='flex aspect-square size-6 items-center justify-center'>
          {iconLead}
        </div>
      )}
      <BaseInput type={type} {...props} className='w-full outline-none' />
    </div>
  );
}

function NumericInput({
  className,
  placeholder,
  onChange,
  onBlur,
  onKeyDown,
  value,
  defaultValue,
  nudgeAmount = 1,
  ...props
}: React.ComponentProps<typeof BaseInput> & {
  nudgeAmount?: number;
}) {
  type BaseInputChangeEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onChange']>
  >[0];
  type BaseInputBlurEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onBlur']>
  >[0];
  type BaseInputKeyDownEvent = Parameters<
    NonNullable<React.ComponentProps<typeof BaseInput>['onKeyDown']>
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

  const initial = toStringValue(value ?? defaultValue ?? '');
  const [inputValue, setInputValue] = React.useState<string>(initial);
  const lastValidRef = React.useRef<string>(
    isValidNumber(initial) ? initial : '',
  );

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

  const commit = React.useCallback(() => {
    const containsOperators = /[+\-*/()]/.test(inputValue);
    if (containsOperators) {
      const result = evaluateExpression(inputValue);
      if (result !== null) {
        const resultStr = String(result);
        setInputValue(resultStr);
        lastValidRef.current = resultStr;
      } else {
        setInputValue(lastValidRef.current);
      }
    } else if (!isValidNumber(inputValue)) {
      setInputValue(lastValidRef.current);
    }
  }, [inputValue, lastValidRef, setInputValue]);

  const handleBlur = (e: BaseInputBlurEvent) => {
    commit();
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
      const decimals = Math.max(getDecimalPlaces(base), getDecimalPlaces(step));
      const nextNumber = base + direction * step;
      const nextString = trimTrailingZeros(nextNumber.toFixed(decimals));
      setInputValue(nextString);
      lastValidRef.current = nextString;
    } else if (e.key === 'Enter') {
      // Apply the same logic as blur
      commit();
      // Then lose focus
      e.currentTarget.blur();
    }
    onKeyDown?.(e);
  };

  return (
    <TextInput
      type='text'
      inputMode='decimal'
      {...props}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(className, '')}
      placeholder={placeholder}
    />
  );
}

const Input = TextInput;

export { TextInput, NumericInput, Input };
