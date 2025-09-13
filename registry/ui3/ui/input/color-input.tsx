import React from 'react';
import { cn } from '@/lib/utils';
import chroma from 'chroma-js';
import { TextInputPrimitive } from './text-input';
import { InputRoot, type BaseInputProps } from './input-utils';
import { Input as BaseInput } from '@base-ui-components/react';

function ColorChit({
  color,
  solidColor,
  className,
}: {
  color: string;
  solidColor?: string;
  className?: string;
  onClick?: () => void;
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

  const isValid = React.useMemo(() => {
    return chroma.valid(color);
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
          backgroundColor: isValid
            ? chroma(solidColor ?? color).hex()
            : 'transparent',
        }}
      />
    </div>
  );
}

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
