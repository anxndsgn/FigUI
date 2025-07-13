import { Button } from '@/registry/ui3/ui/button';

export default function ButtonDemo() {
  return (
    <div className='flex flex-col flex-wrap items-center gap-2'>
      <Button>Button</Button>
      <Button size='large'>Button</Button>
    </div>
  );
}
