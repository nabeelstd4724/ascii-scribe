import { NoteEditor } from "@/components/NoteEditor";
import { FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12 animate-in fade-in-50 slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
            NotePad
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            A beautiful, functional note-taking experience with rich formatting and cool ASCII characters
          </p>
        </header>

        <main>
          <NoteEditor />
        </main>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Made with ♥ for better note-taking</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
