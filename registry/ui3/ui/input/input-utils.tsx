'use client';

import { cn } from '@/lib/utils';
import { Input as BaseInput } from '@base-ui-components/react';
import { createContext, useContext, useState } from 'react';

// types
interface BaseInputProps extends React.ComponentProps<typeof BaseInput> {
  iconLead?: React.ReactNode;
  iconTrail?: React.ReactNode;
}

type StyledInputWrapperContextType = {
  isMiddleButtonDragging: boolean;
  setIsMiddleButtonDragging: (isMiddleButtonDragging: boolean) => void;
};

// context
const StyledInputWrapperContext = createContext<StyledInputWrapperContextType>({
  isMiddleButtonDragging: false,
  setIsMiddleButtonDragging: () => {},
});

// component
function StyledInputWrapper({ className, children }: BaseInputProps) {
  const [isMiddleButtonDragging, setIsMiddleButtonDragging] = useState(false);

  return (
    <StyledInputWrapperContext.Provider
      value={{
        isMiddleButtonDragging,
        setIsMiddleButtonDragging,
      }}
    >
      <div
        className={cn(
          'placeholder:text-grey-400 text-black-800 bg-grey-100 typography-body-medium hover:ring-grey-200 dark:placeholder:text-grey-400 dark:bg-grey-700 dark:text-white-1000 dark:hover:ring-grey-600 flex h-6 w-full min-w-0 items-center rounded-md ring ring-transparent outline-none selection:bg-blue-500 focus-within:ring-blue-500 hover:focus-within:ring-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:focus-within:ring-blue-500',
          isMiddleButtonDragging &&
            'cursor-ew-resize !ring-blue-600 dark:!ring-blue-400',
          className,
        )}
      >
        {children}
      </div>
    </StyledInputWrapperContext.Provider>
  );
}

function InputMultiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StyledInputWrapper className='divide-white-1000 dark:divide-grey-800 flex divide-x [&>*:not(:last-child)]:pr-1'>
      {children}
    </StyledInputWrapper>
  );
}

// hook
function useStyledInputWrapperContext(): StyledInputWrapperContextType {
  return useContext(StyledInputWrapperContext);
}

export {
  StyledInputWrapper,
  InputMultiWrapper,
  type BaseInputProps,
  useStyledInputWrapperContext,
};
