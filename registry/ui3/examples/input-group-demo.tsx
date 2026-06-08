"use client";

import { useState } from "react";
import {
  TextInput,
  NumericInputRoot,
  NumericScrubArea,
  NumericInput,
  ColorInput,
  ColorChit,
  InputGroup,
  InputGroupAddon,
  InputGroupDivider,
} from "@/registry/ui3/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui3/ui/select";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

const heightModes = [
  { label: "Fixed", value: "fixed" },
  { label: "Hug contents", value: "hug" },
  { label: "Fill container", value: "fill" },
];

export default function InputGroupDemo() {
  const [color, setColor] = useState("FF24BD");
  const [opacity, setOpacity] = useState(100);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Icon addon + TextInput */}
      <div className="flex flex-col gap-1">
        <span className="typography-body-medium text-grey-500">Icon + Text Input</span>
        <InputGroup className="w-48">
          <InputGroupAddon>
            <SearchIcon className="text-grey-500" />
          </InputGroupAddon>
          <TextInput placeholder="Search..." />
        </InputGroup>
      </div>

      {/* 2. Color chit + ColorInput */}
      <div className="flex flex-col gap-1">
        <span className="typography-body-medium text-grey-500">Color Chit + Color Input</span>
        <InputGroup className="w-36">
          <InputGroupAddon>
            <ColorChit color={color} />
          </InputGroupAddon>
          <ColorInput value={color} onValueChange={setColor} />
        </InputGroup>
      </div>

      {/* 3. ScrubArea + NumericInput (Root wraps Group) */}
      <div className="flex flex-col gap-1">
        <span className="typography-body-medium text-grey-500">Scrub Area + Numeric Input</span>
        <NumericInputRoot defaultValue={50} min={0} max={100}>
          <InputGroup className="w-32">
            <InputGroupAddon>
              <NumericScrubArea className="flex size-6 items-center justify-center text-xs text-grey-500">
                X
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </InputGroup>
        </NumericInputRoot>
      </div>

      {/* 4. Multi-input: color + opacity */}
      <div className="flex flex-col gap-1">
        <span className="typography-body-medium text-grey-500">Color + Opacity (mixed types)</span>
        <InputGroup className="w-52">
          <InputGroupAddon>
            <ColorChit color={color} opacity={opacity} />
          </InputGroupAddon>
          <ColorInput value={color} onValueChange={setColor} />
          <InputGroupDivider />
          <NumericInputRoot
            value={opacity}
            min={0}
            max={100}
            onValueChange={(next) => setOpacity(Number(next) || 0)}
          >
            <NumericInput className="w-10" />
            <InputGroupAddon className="typography-body-medium text-xs text-grey-500">
              <NumericScrubArea>%</NumericScrubArea>
            </InputGroupAddon>
          </NumericInputRoot>
        </InputGroup>
      </div>

      {/* 5. Label + input + preset select */}
      <div className="flex flex-col gap-1">
        <span className="typography-body-medium text-grey-500">Label + Input + Preset Menu</span>
        <InputGroup className="w-48">
          <InputGroupAddon className="typography-body-medium text-grey-500">H</InputGroupAddon>
          <TextInput defaultValue="1374" />
          <InputGroupAddon>
            <Select items={heightModes} defaultValue="fixed">
              <SelectTrigger addon>
                <SelectValue className="sr-only" />
              </SelectTrigger>
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

      {/* 6. XYZ multi-numeric (each Root is a child) */}
      <div className="flex flex-col gap-1">
        <span className="typography-body-medium text-grey-500">XYZ Multi-Numeric</span>
        <InputGroup className="w-64">
          <NumericInputRoot defaultValue={0}>
            <InputGroupAddon>
              <NumericScrubArea className="flex size-6 items-center justify-center text-xs text-grey-500">
                X
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </NumericInputRoot>
          <InputGroupDivider />
          <NumericInputRoot defaultValue={0}>
            <InputGroupAddon>
              <NumericScrubArea className="flex size-6 items-center justify-center text-grey-500">
                Y
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </NumericInputRoot>
          <InputGroupDivider />
          <NumericInputRoot defaultValue={0}>
            <InputGroupAddon>
              <NumericScrubArea className="flex size-6 items-center justify-center text-grey-500">
                Z
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </NumericInputRoot>
        </InputGroup>
      </div>
    </div>
  );
}
