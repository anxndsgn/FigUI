import { cn } from '@/lib/utils';
import { Input as BaseInput } from '@base-ui-components/react';

interface BaseInputProps extends React.ComponentProps<typeof BaseInput> {
  iconLead?: React.ReactNode;
  iconTrail?: React.ReactNode;
}

function StyledInputWrapper({ className, children }: BaseInputProps) {
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

export { StyledInputWrapper, type BaseInputProps };
