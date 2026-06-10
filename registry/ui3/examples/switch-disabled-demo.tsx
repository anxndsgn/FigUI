import { Switch } from "../ui/switch";

export default function SwitchDisabledDemo() {
  return (
    <label htmlFor="switch-disabled" className="typography-body-medium flex items-center gap-2">
      <Switch id="switch-disabled" disabled defaultChecked />
      Disabled
    </label>
  );
}
