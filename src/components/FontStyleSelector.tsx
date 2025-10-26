import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FontStyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const FONT_STYLES = [
  { value: "Inter", label: "Inter" },
  { value: "Georgia", label: "Georgia" },
  { value: "Courier New", label: "Courier" },
  { value: "Arial", label: "Arial" },
  { value: "Times New Roman", label: "Times" },
  { value: "Verdana", label: "Verdana" },
  { value: "Comic Sans MS", label: "Comic Sans" },
  { value: "monospace", label: "Monospace" },
];

export const FontStyleSelector = ({ value, onChange }: FontStyleSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] bg-secondary/50 border-border backdrop-blur-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {FONT_STYLES.map((font) => (
          <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
