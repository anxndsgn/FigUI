import { Separator } from "../ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <div className="space-y-1">
        <p className="typography-body-medium text-black-1000 dark:text-white-1000">Horizontal</p>
        <p className="typography-body-medium text-black-500 dark:text-white-500">
          Separates stacked content.
        </p>
      </div>
      <Separator />
      <div className="flex h-8 items-center gap-4">
        <span className="typography-body-medium text-black-1000 dark:text-white-1000">
          Vertical
        </span>
        <Separator orientation="vertical" className="h-full" />
        <span className="typography-body-medium text-black-500 dark:text-white-500">
          Separates inline content.
        </span>
      </div>
    </div>
  );
}
