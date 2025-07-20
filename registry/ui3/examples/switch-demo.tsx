import { Switch } from '../ui/switch';

export default function SwitchDemo() {
  return (
    <div className='flex flex-col items-center gap-2'>
      <label
        htmlFor='switch-1'
        className='typography-body-medium flex items-center gap-2'
      >
        <Switch id='switch-1' defaultChecked />
        Switch
      </label>
    </div>
  );
}
