import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/ui3/ui/select';

import { RulerIcon } from 'lucide-react';

export function SelectDemo() {
  return (
    <div className='flex items-center justify-center'>
      <SelectRoot>
        <SelectTrigger
          className='w-40'
          iconLeading={<RulerIcon />}
          placeholder='Select an option'
        />
        <SelectContent>
          <SelectItem value='1'>Option 1</SelectItem>
          <SelectItem value='2'>Option 2</SelectItem>
          <SelectItem value='3'>Option 3</SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
