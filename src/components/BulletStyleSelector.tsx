import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BulletStyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const BULLET_STYLES = [
  { value: "•", label: "• Classic" },
  { value: "⦾", label: "⦾ Circle" },
  { value: "⦿", label: "⦿ Filled Circle" },
  { value: "⊛", label: "⊛ Star" },
  { value: "⇛", label: "⇛ Arrow 1" },
  { value: "➣", label: "➣ Arrow 2" },
  { value: "➨", label: "➨ Arrow 3" },
  { value: "⇢", label: "⇢ Arrow 4" },
  { value: "▸", label: "▸ Triangle" },
  { value: "◆", label: "◆ Diamond" },
  { value: "✓", label: "✓ Check" },
  { value: "★", label: "★ Star" },
];

export const BulletStyleSelector = ({ value, onChange }: BulletStyleSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] bg-secondary/50 border-border backdrop-blur-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {BULLET_STYLES.map((style) => (
          <SelectItem key={style.value} value={style.value}>
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
