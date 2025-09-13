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
    <div className='flex items-center pr-2 pl-2 has-data-[figui=input-icon-lead]:pl-0 has-data-[figui=input-icon-trail]:pr-0'>
      {iconLead && (
        <div
          className='flex aspect-square size-6 items-center justify-center'
          data-figui='input-icon-lead'
        >
          {iconLead}
        </div>
      )}
      <BaseInput
        className={cn('h-6 w-full outline-none', className)}
        {...props}
      />
      {iconTrail && (
        <div
          className='flex aspect-square size-6 items-center justify-center'
          data-figui='input-icon-trail'
        >
          {iconTrail}
        </div>
      )}
    </div>
  );
}

function TextInput({ className, iconLead, ...props }: BaseInputProps) {
  return (
    <StyledInputWrapper className={cn(className)}>
      <TextInputPrimitive iconLead={iconLead} {...props} />
    </StyledInputWrapper>
  );
}

export { TextInput, TextInputPrimitive };
