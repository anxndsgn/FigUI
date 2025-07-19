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
    { label: 'Select font', value: null },
    { label: 'Arial', value: 'arial' },
    { label: 'Helvetica', value: 'helvetica' },
    { label: 'Times New Roman', value: 'times' },
    { label: 'Sans-serif', value: 'sans' },
    { label: 'Serif', value: 'serif' },
    { label: 'Monospace', value: 'mono' },
    { label: 'Cursive', value: 'cursive' },
  ];
  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <SelectRoot items={fonts}>
        <SelectTrigger className='w-40' iconLeading={<RulerIcon />}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <SelectRoot items={fonts}>
        <SelectTrigger className='w-40'>
          <SelectValue />
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
