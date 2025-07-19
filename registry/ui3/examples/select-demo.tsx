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
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value=''>Select an option</SelectItem>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </SelectRoot>
  );
}
