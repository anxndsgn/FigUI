"use client";

import { TextInput, InputGroup, InputGroupAddon } from "@/registry/ui3/ui/input";

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

export default function InputGroupDemo() {
  return (
    <InputGroup className="w-48">
      <InputGroupAddon>
        <SearchIcon className="text-grey-500" />
      </InputGroupAddon>
      <TextInput placeholder="Search..." />
    </InputGroup>
  );
}
