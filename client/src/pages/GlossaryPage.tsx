import { useState, useMemo, useRef } from "react";
import { glossary, domains } from "@/data/roadmapData";
import { Search, BookOpen, Hash } from "lucide-react";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allEntries = useMemo(() => {
    return Object.entries(glossary).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  // Get available letters
  const availableLetters = useMemo(() => {
    const letters = new Set(allEntries.map(([term]) => term[0].toUpperCase()));
    return Array.from(letters).sort();
  }, [allEntries]);

  const entries = useMemo(() => {
    let filtered = allEntries;
    if (selectedLetter) {
      filtered = filtered.filter(([term]) => term[0].toUpperCase() === selectedLetter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(([term, def]) => term.toLowerCase().includes(q) || def.toLowerCase().includes(q));
    }
    return filtered;
  }, [allEntries, search, selectedLetter]);

  // Group entries by first letter
  const groupedEntries = useMemo(() => {
    const groups: Record<string, [string, string][]> = {};
    for (const entry of entries) {
      const letter = entry[0][0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(entry);
    }
    return groups;
  }, [entries]);

  // Find which domains use each term
  const termDomainMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const domain of domains) {
      for (const topic of domain.topics) {
        for (const term of topic.keyTerms) {
          if (!map[term]) map[term] = [];
          if (!map[term].includes(domain.title)) {
            map[term].push(domain.title);
          }
        }
      }
    }
    return map;
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
          <BookOpen size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Glossary & Jargon Decoder</h1>
          <p className="text-sm text-muted-foreground">{allEntries.length} cybersecurity terms and acronyms</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search terms, acronyms, or definitions..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelectedLetter(null); }}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
        />
      </div>

      {/* Alphabet Navigation */}
      <div className="flex flex-wrap gap-1 mb-6 bg-card rounded-xl border border-border p-3">
        <button
          onClick={() => setSelectedLetter(null)}
          className={`w-7 h-7 rounded-md text-xs font-medium transition-smooth flex items-center justify-center ${!selectedLetter ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
        >
          All
        </button>
        {availableLetters.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
            className={`w-7 h-7 rounded-md text-xs font-medium transition-smooth flex items-center justify-center ${selectedLetter === letter ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Results */}
      <div ref={containerRef} className="space-y-6">
        {Object.keys(groupedEntries).length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No matching terms found</p>
        ) : (
          Object.entries(groupedEntries).map(([letter, letterEntries]) => (
            <div key={letter}>
              <div className="flex items-center gap-2 mb-3 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Hash size={14} className="text-primary" />
                </div>
                <h2 className="text-lg font-bold text-primary">{letter}</h2>
                <span className="text-xs text-muted-foreground">({letterEntries.length})</span>
              </div>
              <div className="space-y-2">
                {letterEntries.map(([term, definition]) => {
                  const relatedDomains = termDomainMap[term] || [];
                  return (
                    <div key={term} className="bg-card rounded-lg border border-border p-4 card-hover">
                      <div className="flex items-start gap-3">
                        <span className="inline-block px-2.5 py-1 rounded bg-muted text-xs font-mono font-semibold text-foreground whitespace-nowrap">
                          {term}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-foreground/80 leading-relaxed">{definition}</p>
                          {relatedDomains.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {relatedDomains.map((d) => (
                                <span key={d} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium">{d}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">{entries.length} terms shown</p>
    </div>
  );
}
