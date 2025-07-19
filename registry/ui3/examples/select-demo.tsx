import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/ui3/ui/select';

import { RulerIcon } from 'lucide-react';

export function SelectDemo() {
  const fonts = [
    { label: 'Sans-serif', value: 'sans' },
    { label: 'Serif', value: 'serif' },
    { label: 'Monospace', value: 'mono' },
    { label: 'Cursive', value: 'cursive' },
  ];
  return (
    <div className='flex items-center justify-center'>
      <SelectRoot items={fonts}>
        <SelectTrigger className='w-40' iconLeading={<RulerIcon />}>
          <SelectValue placeholder='Select font' />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
