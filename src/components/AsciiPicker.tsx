import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AsciiPickerProps {
  onSelect: (char: string) => void;
}

const ASCII_CHARS = [
  { category: "Stars & Hearts", chars: ["★", "☆", "♥", "♡", "✦", "✧", "❤", "💜"] },
  { category: "Arrows", chars: ["→", "←", "↑", "↓", "⇒", "⇐", "↔", "⇔"] },
  { category: "Checks & Marks", chars: ["✓", "✔", "✗", "✘", "☑", "☒", "×", "•"] },
  { category: "Symbols", chars: ["☀", "☁", "☂", "⚡", "☎", "✉", "✎", "✏"] },
  { category: "Music & Fun", chars: ["♪", "♫", "♬", "☺", "☻", "😊", "🎵", "🎶"] },
  { category: "Shapes", chars: ["◆", "◇", "○", "●", "◐", "◑", "□", "■"] },
];

export const AsciiPicker = ({ onSelect }: AsciiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          ASCII
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-card/95 backdrop-blur-lg border-border shadow-lg" align="end">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground mb-2">Cool ASCII Characters</h3>
          {ASCII_CHARS.map((group) => (
            <div key={group.category} className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{group.category}</p>
              <div className="grid grid-cols-8 gap-1">
                {group.chars.map((char) => (
                  <Button
                    key={char}
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelect(char)}
                    className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary text-base transition-all"
                  >
                    {char}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
