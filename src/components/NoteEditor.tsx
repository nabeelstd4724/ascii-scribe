import { useState, useRef } from "react";
import { FormattingToolbar } from "./FormattingToolbar";
import { AsciiPicker } from "./AsciiPicker";
import { toast } from "sonner";

export const NoteEditor = () => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFormat = (type: 'bold' | 'bullet' | 'number') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    let newText = "";

    switch (type) {
      case 'bold':
        if (selectedText) {
          newText = beforeText + `**${selectedText}**` + afterText;
          toast.success("Text formatted as bold!");
        } else {
          newText = beforeText + "****" + afterText;
          toast.info("Select text to make it bold");
        }
        break;
      case 'bullet':
        const bulletLine = selectedText || "List item";
        newText = beforeText + `• ${bulletLine}` + afterText;
        toast.success("Bullet point added!");
        break;
      case 'number':
        const numberLine = selectedText || "List item";
        newText = beforeText + `1. ${numberLine}` + afterText;
        toast.success("Numbered list added!");
        break;
    }

    setContent(newText);
    
    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus();
      if (type === 'bold' && !selectedText) {
        textarea.setSelectionRange(start + 2, start + 2);
      }
    }, 0);
  };

  const handleAsciiSelect = (char: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = content.substring(0, start) + char + content.substring(start);
    
    setContent(newText);
    
    // Restore focus and move cursor after the inserted character
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + char.length, start + char.length);
    }, 0);
    
    toast.success(`Added ${char}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 animate-in fade-in-50 duration-700">
      <div className="flex items-center justify-between gap-4">
        <FormattingToolbar onFormat={handleFormat} />
        <AsciiPicker onSelect={handleAsciiSelect} />
      </div>
      
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your notes... ✨"
          className="w-full min-h-[500px] p-6 text-base bg-card rounded-2xl border border-border 
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                     resize-none transition-all duration-300 shadow-sm hover:shadow-md
                     placeholder:text-muted-foreground/60"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            lineHeight: '1.75',
          }}
        />
        {content && (
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-secondary/80 px-3 py-1 rounded-full backdrop-blur-sm">
            {content.length} characters
          </div>
        )}
      </div>

      <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
        <h3 className="text-sm font-semibold mb-2 text-foreground">Quick Tips:</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Use <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">Ctrl+B</kbd> or click Bold to format text</li>
          <li>• Add bullets or numbers for organized lists</li>
          <li>• Click ASCII to add cool symbols ★ ♥ ✓ → ☀</li>
        </ul>
      </div>
    </div>
  );
};
