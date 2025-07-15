import { TextInput } from '@/registry/ui3/ui/input';

export default function InputDemo() {
  return (
    <div className='flex flex-col flex-wrap items-center gap-2'>
      <TextInput placeholder='Enter your email' />
    </div>
  );
}
