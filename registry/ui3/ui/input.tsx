import * as React from 'react';
import { Input } from '@base-ui-components/react';
import { cn } from '@/lib/utils';

function TextInput({ className, ...props }: React.ComponentProps<'input'>) {
  return <Input className={cn('input', className)} {...props} />;
}

export { TextInput };
