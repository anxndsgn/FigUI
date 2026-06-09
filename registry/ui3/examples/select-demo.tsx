import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui3/ui/select";
import { InputGroup, InputGroupAddon, InputGroupButton, TextInput } from "@/registry/ui3/ui/input";

import { ChevronDownIcon, RulerIcon } from "lucide-react";

export function SelectDemo() {
  const fonts = [
    { label: "Select font", value: null },
    { label: "Arial", value: "arial" },
    { label: "Helvetica", value: "helvetica" },
    { label: "Times New Roman", value: "times" },
    { label: "Sans-serif", value: "sans" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "mono" },
    { label: "Cursive", value: "cursive" },
  ];
  const heightModes = [
    { label: "Fixed", value: "fixed" },
    { label: "Hug contents", value: "hug" },
    { label: "Fill container", value: "fill" },
  ];
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Select items={fonts}>
        <SelectTrigger className="w-40" iconLead={<RulerIcon />}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select items={fonts}>
        <SelectTrigger className="w-32" iconLead="Aa">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <InputGroup className="w-48">
        <InputGroupAddon className="typography-body-medium text-grey-500">H</InputGroupAddon>
        <TextInput defaultValue="1374" />
        <InputGroupAddon>
          <Select items={heightModes} defaultValue="fixed">
            <SelectTrigger
              render={
                <InputGroupButton aria-label="Select height mode">
                  <ChevronDownIcon />
                </InputGroupButton>
              }
            />

            <SelectContent>
              {heightModes.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
