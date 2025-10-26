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
  { category: "Stars & Hearts", chars: ["★", "☆", "⭐", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "♥", "♡", "❤", "💜", "💙", "💚", "💛", "🧡", "❣", "💕", "💖", "💗", "💝", "💞"] },
  { category: "Arrows", chars: ["→", "←", "↑", "↓", "↔", "↕", "⇒", "⇐", "⇑", "⇓", "⇔", "⇕", "➔", "➘", "➙", "➚", "➛", "➜", "➝", "➞", "➟", "➠", "➡", "➢", "➣", "➤", "➥", "➦", "➧", "➨", "➩", "➪", "➫", "➬", "➭", "➮", "➯", "➱", "➲", "➳", "➴", "➵", "➶", "➷", "➸", "➹", "➺", "➻", "➼", "➽", "➾", "⟰", "⟱", "⟲", "⟳", "⟴", "⇛", "⇜", "⇝", "⇞", "⇟", "⇠", "⇡", "⇢", "⇣"] },
  { category: "Checks & Marks", chars: ["✓", "✔", "✕", "✖", "✗", "✘", "☐", "☑", "☒", "✅", "❎", "×", "•", "‣", "⁃", "◘", "◦", "⦾", "⦿", "▪", "▫", "⊛", "⊚"] },
  { category: "Weather & Nature", chars: ["☀", "☁", "☂", "☃", "☄", "⛅", "⛈", "🌤", "🌥", "🌦", "🌧", "🌨", "🌩", "🌪", "☔", "⚡", "❄", "💧", "🌊", "🔥", "💨", "🌈", "⭐", "🌙", "🌟", "✨", "🌞", "🌝", "🌛", "🌜"] },
  { category: "Symbols", chars: ["☎", "☏", "✉", "✎", "✏", "✐", "✑", "✒", "✍", "📝", "📌", "📍", "🔖", "🏷", "💼", "🎯", "🔔", "🔕", "⚙", "🔧", "🔨", "⚒", "🛠", "⚖", "⚗", "🔬", "🔭", "📡", "🎓", "📚", "📖", "✂", "📎", "🖇", "📏", "📐", "🗝", "🔑", "🔓", "🔒", "🔐"] },
  { category: "Music & Fun", chars: ["♪", "♫", "♬", "♭", "♮", "♯", "🎵", "🎶", "🎼", "🎤", "🎧", "🎸", "🎹", "🎺", "🎻", "☺", "☻", "😊", "😃", "😄", "😁", "🙂", "🙃", "😉", "😌", "🎉", "🎊", "🎈", "🎁", "🎀"] },
  { category: "Shapes", chars: ["◆", "◇", "◈", "○", "●", "◐", "◑", "◒", "◓", "◔", "◕", "◖", "◗", "□", "■", "▢", "▣", "▤", "▥", "▦", "▧", "▨", "▩", "▪", "▫", "▬", "▭", "▮", "▯", "▰", "▱", "▲", "△", "▴", "▵", "▶", "▷", "▸", "▹", "►", "▻", "▼", "▽", "▾", "▿", "◀", "◁", "◂", "◃", "◄", "◅", "◉", "◊", "○", "◌", "◍", "◎", "●", "◦", "◯"] },
  { category: "Math & Logic", chars: ["±", "×", "÷", "≠", "≈", "≡", "≤", "≥", "∞", "∑", "∏", "∫", "∂", "∆", "∇", "√", "∛", "∜", "∝", "∟", "∠", "∡", "∢", "⊥", "⊤", "⊕", "⊖", "⊗", "⊘", "⊙", "⊚", "⊛", "⊜", "∈", "∉", "∋", "∌", "⊂", "⊃", "⊄", "⊅", "⊆", "⊇", "∩", "∪", "∧", "∨", "¬", "⊻", "∀", "∃", "∄"] },
  { category: "Currency & Numbers", chars: ["$", "¢", "£", "€", "¥", "₹", "₽", "₩", "₪", "₱", "฿", "₴", "₵", "₡", "₦", "₨", "₮", "₸", "₺", "₼", "₾", "₿", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⓪", "¼", "½", "¾", "⅓", "⅔", "⅛", "⅜", "⅝", "⅞"] },
  { category: "Greek Letters", chars: ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω", "Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ", "Ω"] },
  { category: "Borders & Lines", chars: ["─", "━", "│", "┃", "┄", "┅", "┆", "┇", "┈", "┉", "┊", "┋", "┌", "┍", "┎", "┏", "┐", "┑", "┒", "┓", "└", "┕", "┖", "┗", "┘", "┙", "┚", "┛", "├", "┝", "┞", "┟", "┠", "┡", "┢", "┣", "┤", "┥", "┦", "┧", "┨", "┩", "┪", "┫", "┬", "┭", "┮", "┯", "┰", "┱", "┲", "┳", "┴", "┵", "┶", "┷", "┸", "┹", "┺", "┻", "┼", "┽", "┾", "┿", "╀", "╁", "╂", "╃", "╄", "╅", "╆", "╇", "╈", "╉", "╊", "╋"] },
  { category: "Special Symbols", chars: ["©", "®", "™", "§", "¶", "†", "‡", "•", "‣", "⁂", "⁎", "⁕", "⁜", "⁝", "⁞", "※", "‼", "⁉", "‽", "⁇", "⁈", "⁺", "⁻", "⁼", "⁽", "⁾", "ⁿ", "°", "′", "″", "‴", "‵", "‶", "‷", "‸", "‹", "›", "«", "»", "‐", "‑", "‒", "–", "—", "―", "‖", "‗", "‾", "⁀"] },
  { category: "Emoji & Faces", chars: ["☺", "☻", "☹", "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "😉", "😊", "😋", "😌", "😍", "😎", "😏", "😐", "😑", "😒", "😓", "😔", "😕", "😖", "😗", "😘", "😙", "😚", "😛", "😜", "😝", "😞", "😟", "😠", "😡", "😢", "😣", "😤", "😥", "😦", "😧", "😨", "😩", "😪", "😫", "😬", "😭", "😮", "😯", "😰", "😱", "😲", "😳", "😴", "😵"] },
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
      <PopoverContent className="w-96 max-h-[600px] overflow-y-auto p-4 bg-card/95 backdrop-blur-lg border-border shadow-lg" align="end">
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
