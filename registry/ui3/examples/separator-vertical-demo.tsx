import { Separator } from "../ui/separator";

export default function SeparatorVerticalDemo() {
  return (
    <div className="flex h-8 items-center gap-4">
      <span className="typography-body-medium text-black-1000 dark:text-white-1000">Left</span>
      <Separator orientation="vertical" className="h-full" />
      <span className="typography-body-medium text-black-500 dark:text-white-500">Right</span>
    </div>
  );
}
