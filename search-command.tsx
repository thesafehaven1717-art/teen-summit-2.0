import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Search, FileText, Video, BookOpen } from "lucide-react";

interface SearchResult {
  type: "episode" | "blog" | "dossier";
  id: number | string;
  title: string;
  description?: string;
  slug?: string;
  url: string;
}

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: results = [], isLoading } = useQuery<SearchResult[]>({
    queryKey: [`/api/search?q=${encodeURIComponent(searchQuery)}`],
    enabled: searchQuery.length > 0 && open,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    setLocation(url);
    setSearchQuery("");
  };

  const groupedResults = {
    episodes: results.filter((r) => r.type === "episode"),
    blog: results.filter((r) => r.type === "blog"),
    dossiers: results.filter((r) => r.type === "dossier"),
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Search Content</DialogTitle>
      <DialogDescription className="sr-only">
        Search across episodes, blog posts, and dossiers
      </DialogDescription>
      <CommandInput
        placeholder="Search episodes, blog posts, dossiers..."
        value={searchQuery}
        onValueChange={setSearchQuery}
        data-testid="input-search"
      />
      <CommandList>
        {searchQuery.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Type to search episodes, blog posts, and dossiers
          </div>
        ) : isLoading ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Searching...
          </div>
        ) : (
          <>
            <CommandEmpty>No results found.</CommandEmpty>

            {groupedResults.episodes.length > 0 && (
              <CommandGroup heading="Episodes">
                {groupedResults.episodes.map((result) => (
                  <CommandItem
                    key={`episode-${result.id}`}
                    onSelect={() => handleSelect(result.url)}
                    data-testid={`search-result-episode-${result.id}`}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{result.title}</div>
                      {result.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {result.description}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {groupedResults.blog.length > 0 && (
              <CommandGroup heading="Blog Posts">
                {groupedResults.blog.map((result) => (
                  <CommandItem
                    key={`blog-${result.id}`}
                    onSelect={() => handleSelect(result.url)}
                    data-testid={`search-result-blog-${result.id}`}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{result.title}</div>
                      {result.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {result.description}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {groupedResults.dossiers.length > 0 && (
              <CommandGroup heading="Dossiers">
                {groupedResults.dossiers.map((result) => (
                  <CommandItem
                    key={`dossier-${result.id}`}
                    onSelect={() => handleSelect(result.url)}
                    data-testid={`search-result-dossier-${result.id}`}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{result.title}</div>
                      {result.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {result.description}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
