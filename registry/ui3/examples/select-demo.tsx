import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/registry/ui3/ui/select';

export function SelectDemo() {
  return (
    <SelectRoot>
      <SelectTrigger className='w-32'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='1'>Option 1</SelectItem>
        <SelectItem value='2'>Option 2</SelectItem>
        <SelectItem value='3'>Option 3</SelectItem>
      </SelectContent>
    </SelectRoot>
  );
}
