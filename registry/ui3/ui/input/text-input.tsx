import { Input as BaseInput } from '@base-ui-components/react';
import { cn } from '@/lib/utils';
import { InputRoot, type BaseInputProps } from './input-utils';

function TextInputPrimitive({
  className,
  iconLead,
  iconTrail,
  ...props
}: BaseInputProps) {
  return (
    <div className='flex h-full items-center pr-2 pl-2 has-data-[figui=input-icon-lead]:pl-0 has-data-[figui=input-icon-trail]:pr-0'>
      {iconLead && (
        <div
          className='flex aspect-square size-6 items-center justify-center select-none'
          data-figui='input-icon-lead'
        >
          {typeof iconLead === 'string' ? (
            <span className='text-black-500 dark:text-white-500'>
              {iconLead}
            </span>
          ) : (
            iconLead
          )}
        </div>
      )}
      <BaseInput
        className={cn('h-full w-full outline-none', className)}
        {...props}
      />
      {iconTrail && (
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
    </div>
  );
}

function TextInput({ iconLead, className, ...props }: BaseInputProps) {
  return (
    <InputRoot className={cn(className)}>
      <TextInputPrimitive iconLead={iconLead} {...props} />
    </InputRoot>
  );
}

export { TextInput, TextInputPrimitive };
