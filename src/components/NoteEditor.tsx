import { useState, useRef } from "react";
import { FormattingToolbar } from "./FormattingToolbar";
import { AsciiPicker } from "./AsciiPicker";
import { FontStyleSelector } from "./FontStyleSelector";
import { BulletStyleSelector } from "./BulletStyleSelector";
import { toast } from "sonner";

export const NoteEditor = () => {
  const [content, setContent] = useState("");
  const [bulletStyle, setBulletStyle] = useState("•");
  const [fontStyle, setFontStyle] = useState("Inter");
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormat = (type: 'bold' | 'bullet' | 'number') => {
    const editor = editorRef.current;
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    switch (type) {
      case 'bold':
        document.execCommand('bold', false);
        toast.success("Text formatted as bold!");
        break;
      case 'bullet': {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        if (selectedText.includes('\n')) {
          // Multi-line selection
          const lines = selectedText.split('\n');
          const formattedLines = lines.map(line => 
            line.trim() ? `${bulletStyle} ${line}` : line
          ).join('\n');
          document.execCommand('insertText', false, formattedLines);
        } else {
          const text = selectedText || "List item";
          document.execCommand('insertText', false, `${bulletStyle} ${text}`);
        }
        toast.success("Bullet points added!");
        break;
      }
      case 'number': {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        if (selectedText.includes('\n')) {
          // Multi-line selection
          const lines = selectedText.split('\n');
          const formattedLines = lines.map((line, index) => 
            line.trim() ? `${index + 1}. ${line}` : line
          ).join('\n');
          document.execCommand('insertText', false, formattedLines);
        } else {
          const text = selectedText || "List item";
          document.execCommand('insertText', false, `1. ${text}`);
        }
        toast.success("Numbered list added!");
        break;
      }
    }
    
    editor.focus();
  };

  const handleAsciiSelect = (char: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    document.execCommand('insertText', false, char);
    toast.success(`Added ${char}`);
  };

  const updateCharCount = () => {
    const editor = editorRef.current;
    if (editor) {
      setContent(editor.innerText);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 animate-in fade-in-50 duration-700">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <FormattingToolbar onFormat={handleFormat} />
          <BulletStyleSelector value={bulletStyle} onChange={setBulletStyle} />
        </div>
        <div className="flex items-center gap-2">
          <FontStyleSelector value={fontStyle} onChange={setFontStyle} />
          <AsciiPicker onSelect={handleAsciiSelect} />
        </div>
      </div>
      
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={updateCharCount}
          data-placeholder="Start writing your notes... ✨"
          className="w-full min-h-[500px] p-6 text-base bg-card rounded-2xl border border-border 
                     focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                     transition-all duration-300 shadow-sm hover:shadow-md
                     [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground/60"
          style={{
            fontFamily: `${fontStyle}, system-ui, sans-serif`,
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
          <li>• Select text and click Bold to make it <strong>actually bold</strong></li>
          <li>• Choose your bullet style and add custom bullets</li>
          <li>• Change font style for different writing moods</li>
          <li>• Add cool ASCII symbols ★ ♥ ✓ → ☀</li>
        </ul>
      </div>
    </div>
  );
};
