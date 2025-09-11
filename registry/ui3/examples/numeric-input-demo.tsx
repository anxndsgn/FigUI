import { NumericInput } from '@/registry/ui3/ui/input';

export default function NumericInputDemo() {
  return <NumericInput className='w-32' defaultValue={12} min={0} max={100} />;
}
