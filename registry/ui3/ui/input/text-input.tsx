import { Input as BaseInput } from '@base-ui-components/react';
import { cn } from '@/lib/utils';
import { StyledInputWrapper, type BaseInputProps } from './input-utils';

function TextInputPrimitive({
  className,
  iconLead,
  iconTrail,
  ...props
}: BaseInputProps) {
  return (
    <>
      {iconLead && (
        <div className='flex aspect-square size-6 items-center justify-center'>
          {iconLead}
        </div>
      )}
      <BaseInput className={cn('w-full outline-none', className)} {...props} />
      {iconTrail && (
        <div className='flex aspect-square size-6 items-center justify-center'>
          {iconTrail}
        </div>
      )}
    </>
  );
}

function TextInput({ className, iconLead, ...props }: BaseInputProps) {
  return (
    <StyledInputWrapper className={cn(iconLead ? '' : 'pl-2', className)}>
      <TextInputPrimitive iconLead={iconLead} {...props} />
    </StyledInputWrapper>
  );
}

export { TextInput, TextInputPrimitive };
