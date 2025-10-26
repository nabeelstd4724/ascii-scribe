import { Button } from "@/components/ui/button";
import { FileText, FolderOpen, Download } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";

interface FileActionsProps {
  onNewFile: () => void;
  onFileLoad: (content: string, filename: string) => void;
  content: string;
  filename: string;
}

export const FileActions = ({ onNewFile, onFileLoad, content, filename }: FileActionsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileLoad(content, file.name);
      toast.success(`Opened: ${file.name}`);
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewFile = () => {
    if (content.trim() && !confirm("Create new file? Any unsaved changes will be lost.")) {
      return;
    }
    onNewFile();
    toast.success("New file created");
  };

  const handleDownload = () => {
    if (!content.trim()) {
      toast.error("Nothing to save");
      return;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'note.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Saved: ${filename || 'note.txt'}`);
  };

  return (
    <div className="flex gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.text"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleNewFile}
        className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        title="New File"
      >
        <FileText className="h-4 w-4" />
        New
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenFile}
        className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        title="Open File"
      >
        <FolderOpen className="h-4 w-4" />
        Open
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
        title="Save File"
      >
        <Download className="h-4 w-4" />
        Save
      </Button>
    </div>
  );
};
