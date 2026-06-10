import { Button } from "@/registry/ui3/ui/button";
import { PlusIcon } from "lucide-react";

export default function ButtonIconDemo() {
  return (
    <Button variant="ghost" size="icon">
      <PlusIcon />
    </Button>
  );
}
