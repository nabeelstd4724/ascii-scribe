import { Bold, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormattingToolbarProps {
  onFormat: (type: 'bold' | 'bullet' | 'number') => void;
}

export const FormattingToolbar = ({ onFormat }: FormattingToolbarProps) => {
  return (
    <div className="flex gap-2 p-2 bg-secondary/50 rounded-lg border border-border backdrop-blur-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormat('bold')}
        className="hover:bg-primary/10 hover:text-primary transition-all"
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormat('bullet')}
        className="hover:bg-primary/10 hover:text-primary transition-all"
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormat('number')}
        className="hover:bg-primary/10 hover:text-primary transition-all"
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};
