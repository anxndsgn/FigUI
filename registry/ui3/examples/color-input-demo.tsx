import { ColorInput } from '@/registry/ui3/ui/input';

export default function ColorInputDemo() {
  return (
    <div className='flex flex-col gap-2'>
      <ColorInput className='w-32' defaultValue='000000' colorChit />
      <ColorInput defaultValue='000000' opacity colorChit />
    </div>
  );
}
