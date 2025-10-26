import { NoteEditor } from "@/components/NoteEditor";
import { FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-6 animate-in fade-in-50 slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NotePad
            </h1>
          </div>
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
