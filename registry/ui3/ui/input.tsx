'use client';
import * as React from 'react';
import { Input as BaseInput } from '@base-ui-components/react';
import { cn } from '@/lib/utils';
import chroma from 'chroma-js';

interface BaseInputProps extends React.ComponentProps<typeof BaseInput> {
  iconLead?: React.ReactNode;
  iconTrail?: React.ReactNode;
}

function InputWrapper({ className, children }: BaseInputProps) {
  return (
    <div
      className={cn(
        'placeholder:text-grey-400 text-black-800 bg-grey-100 typography-body-medium hover:border-grey-200 dark:placeholder:text-grey-400 dark:bg-grey-700 dark:text-white-1000 dark:hover:border-grey-600 flex h-6 w-full min-w-0 items-center rounded-md border border-transparent pr-2 outline-none selection:bg-blue-500 focus-within:border-blue-500 hover:focus-within:border-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:focus-within:border-blue-500',
        className,
      )}
    >
      {children}
    </div>
  );
}

function TextInputPrimitive({
  className,
  type,
  iconLead,
  iconTrail,
  ...props
}: BaseInputProps) {
  return (
    <div className='flex items-center'>
      {iconLead && (
        <div className='flex aspect-square size-6 items-center justify-center'>
          {iconLead}
        </div>
      )}
      <BaseInput
        type={type}
        {...props}
        className={cn('w-full outline-none', className)}
      />
      {iconTrail && (
        <div className='flex aspect-square size-6 items-center justify-center'>
          {iconTrail}
        </div>
      )}
    </div>
  );
}

function TextInput({ className, type, iconLead, ...props }: BaseInputProps) {
  return (
    <InputWrapper className={cn(iconLead ? '' : 'pl-2', className)}>
      <TextInputPrimitive type={type} iconLead={iconLead} {...props} />
    </InputWrapper>
  );
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
  onImmediateValueChange,
  ...props
}: BaseInputProps & {
  nudgeAmount?: number;
  min?: number | string;
  max?: number | string;
  onImmediateValueChange?: (next: string) => void;
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
  const [isMiddleDragging, setIsMiddleDragging] =
    React.useState<boolean>(false);
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
    onImmediateValueChange?.(next);
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
      onImmediateValueChange?.(nextString);
    } else if (e.key === 'Enter') {
      // Apply the same logic as blur
      commit();
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
    setIsMiddleDragging(true);
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
      onImmediateValueChange?.(nextString);
    };

    const endDrag = () => {
      if (!dragActiveRef.current) return;
      dragActiveRef.current = false;
      setIsMiddleDragging(false);
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
      {...props}
      min={min as any}
      max={max as any}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
    />
  );
}

function NumericInput({ className, iconLead, ...props }: BaseInputProps) {
  return (
    <InputWrapper className={cn(iconLead ? '' : 'pl-2', className)}>
      <NumericInputPrimitive iconLead={iconLead} {...props} />
    </InputWrapper>
  );
}

function ColorChit({
  color,
  solidColor,
  className,
}: {
  color: string;
  solidColor?: string;
  className?: string;
}) {
  const swatch = React.useMemo(() => {
    const normalize = (s: string): string => {
      const t = s.trim();
      if (/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(t))
        return `#${t}`;
      return t;
    };
    try {
      const norm = normalize(color);
      if (chroma.valid(norm)) return chroma(norm).css();
    } catch {}
    return null;
  }, [color]);
  return (
    <div
      className={cn(
        'inset-ring-black-200 flex size-4 shrink-0 justify-start overflow-hidden rounded-sm inset-ring',
        className,
      )}
      style={{
        backgroundImage: swatch
          ? `linear-gradient(${swatch}, ${swatch}), conic-gradient(#eee 25%, #ccc 0 50%, #eee 0 75%, #ccc 0)`
          : 'conic-gradient(#eee 25%, #ccc 0 50%, #eee 0 75%, #ccc 0)',
        backgroundSize: swatch ? 'auto, 8px 8px' : '8px 8px',
        backgroundPosition: swatch ? '0 0, 0 0' : '0 0',
        backgroundRepeat: 'repeat',
      }}
    >
      <div
        className='w-1/2'
        style={{
          backgroundColor: chroma(solidColor ?? color).hex(),
        }}
      />
    </div>
  );
}
function ColorInput({
  onChange,
  onBlur,
  onKeyDown,
  value,
  defaultValue,
  colorChit,
  className,
  opacity = false,
  ...props
}: React.ComponentProps<typeof BaseInput> & {
  opacity?: boolean;
  colorChit?: React.ReactNode;
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
    if (typeof v === 'string') return v;
    return '';
  };

  const normalizeForValidation = (s: string): string => {
    if (/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s))
      return `#${s}`;
    return s;
  };

  const formatHexNoHashUpper = (s: string): string => {
    return chroma(normalizeForValidation(s)).hex().slice(1).toUpperCase();
  };

  const hasExplicitAlpha = (s: string): boolean => {
    const t = s.trim();
    if (/^#?[0-9a-fA-F]{8}$/.test(t)) return true;
    if (/^rgba\(/i.test(t)) return true;
    if (/^hsla\(/i.test(t)) return true;
    if (/^color\(/i.test(t)) return true;
    return false;
  };

  const initial = toStringValue(value ?? defaultValue ?? '');
  const [inputValue, setInputValue] = React.useState<string>(initial);
  const lastValidRef = React.useRef<string>(
    chroma.valid(normalizeForValidation(initial))
      ? formatHexNoHashUpper(initial)
      : '000000',
  );
  const [opacityPercent, setOpacityPercent] = React.useState<number>(() => {
    try {
      if (chroma.valid(normalizeForValidation(initial))) {
        const a = chroma(normalizeForValidation(initial)).alpha();
        return Math.round(a * 100);
      }
    } catch {}
    return 100;
  });

  React.useEffect(() => {
    if (value !== undefined) {
      const s = toStringValue(value);
      setInputValue(s);
      if (chroma.valid(normalizeForValidation(s))) {
        lastValidRef.current = formatHexNoHashUpper(s);
        if (hasExplicitAlpha(s)) {
          try {
            const a = chroma(normalizeForValidation(s)).alpha();
            setOpacityPercent(Math.round(a * 100));
          } catch {}
        }
      }
    }
  }, [value]);

  const handleChange = (e: BaseInputChangeEvent) => {
    const next = e.target.value;
    setInputValue(next);
    if (chroma.valid(normalizeForValidation(next))) {
      lastValidRef.current = formatHexNoHashUpper(next);
      if (hasExplicitAlpha(next)) {
        try {
          const a = chroma(normalizeForValidation(next)).alpha();
          setOpacityPercent(Math.round(a * 100));
        } catch {}
      }
    }
    onChange?.(e);
  };

  const commit = React.useCallback(() => {
    if (chroma.valid(normalizeForValidation(inputValue))) {
      const hexNoHashUpper = formatHexNoHashUpper(inputValue);
      setInputValue(hexNoHashUpper);
      lastValidRef.current = hexNoHashUpper;
      if (hasExplicitAlpha(inputValue)) {
        try {
          const a = chroma(normalizeForValidation(inputValue)).alpha();
          setOpacityPercent(Math.round(a * 100));
        } catch {}
      }
    } else {
      setInputValue(lastValidRef.current);
    }
  }, [inputValue]);

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
    <InputWrapper
      className={cn('w-40 pr-0', colorChit ? '' : 'pl-2', className)}
    >
      {colorChit && (
        <div className='flex aspect-square size-6 shrink-0 items-center justify-center'>
          <ColorChit color={previewColor} solidColor={previewHex} />
        </div>
      )}
      <TextInputPrimitive
        type='text'
        {...props}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className='w-full min-w-16 flex-1 outline-none'
      />
      {opacity && (
        <div className='flex w-full items-center justify-between'>
          <NumericInputPrimitive
            min={0}
            max={100}
            value={String(opacityPercent)}
            onImmediateValueChange={(next) => {
              const v = Number(next);
              if (Number.isFinite(v)) {
                const clamped = Math.max(0, Math.min(100, v));
                setOpacityPercent(clamped);
              }
            }}
            onChange={(e) => {
              const v = Number((e.target as HTMLInputElement).value);
              if (Number.isFinite(v)) {
                const clamped = Math.max(0, Math.min(100, v));
                setOpacityPercent(clamped);
              }
            }}
            onBlur={(e) => {
              const v = Number((e.target as HTMLInputElement).value);
              const clamped = Number.isFinite(v)
                ? Math.max(0, Math.min(100, v))
                : opacityPercent;
              setOpacityPercent(clamped);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const el = e.currentTarget as unknown as HTMLInputElement;
                const v = Number(el.value);
                const clamped = Number.isFinite(v)
                  ? Math.max(0, Math.min(100, v))
                  : opacityPercent;
                setOpacityPercent(clamped);
              }
            }}
            className={
              'border-white-1000 dark:border-grey-800 h-6 w-full border-l pl-2 outline-none'
            }
          />
          <div className='flex aspect-square size-6 items-center justify-center'>
            <span className='text-black-600 dark:text-white-600'>%</span>
          </div>
        </div>
      )}
    </InputWrapper>
  );
}

const Input = TextInput;

export { TextInput, NumericInput, Input, ColorInput, ColorChit };
