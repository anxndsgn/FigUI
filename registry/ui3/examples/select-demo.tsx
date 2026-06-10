import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui3/ui/select";

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

export function SelectDemo() {
  return (
    <Select items={fonts}>
      <SelectTrigger className="w-40">
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
  );
}
