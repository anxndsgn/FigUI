"use client";

import {
  TextInput,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/registry/ui3/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/registry/ui3/ui/select";
import { ChevronDownIcon } from "lucide-react";

const heightModes = [
  { label: "Fixed", value: "fixed" },
  { label: "Hug contents", value: "hug" },
  { label: "Fill container", value: "fill" },
];

export default function InputGroupPresetSelectDemo() {
  return (
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
  );
}
