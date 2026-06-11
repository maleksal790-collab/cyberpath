import { useState, useMemo } from "react";
import { toolLandscape } from "@/data/roadmapData";
import { Wrench, Search, ExternalLink } from "lucide-react";

const categoryColors: Record<string, string> = {
  "SIEM": "#6366f1",
  "EDR/XDR": "#ef4444",
  "Firewall/NGFW": "#f59e0b",
  "Vulnerability Scanner": "#10b981",
  "IAM/PAM": "#8b5cf6",
  "Cloud Security": "#0ea5e9",
  "Email Security": "#ec4899",
  "Network Security": "#06b6d4",
  "GRC Platform": "#6366f1",
  "Threat Intelligence": "#ef4444",
};

const categoryDescriptions: Record<string, string> = {
  "SIEM": "Security Information & Event Management — centralized log collection, correlation, and alerting",
  "EDR/XDR": "Endpoint/Extended Detection & Response — real-time monitoring and response on endpoints",
  "Firewall/NGFW": "Next-Generation Firewalls — network traffic filtering with deep packet inspection",
  "Vulnerability Scanner": "Automated tools that identify security weaknesses in systems and applications",
  "IAM/PAM": "Identity & Access Management / Privileged Access Management — controlling who can access what",
  "Cloud Security": "Tools for securing cloud workloads, configurations, and identities",
  "Email Security": "Gateways and filters protecting against phishing, spam, and email-borne threats",
  "Network Security": "Tools for monitoring, analyzing, and protecting network traffic",
  "GRC Platform": "Governance, Risk & Compliance platforms for managing security programs",
  "Threat Intelligence": "Platforms that aggregate and analyze threat data for proactive defense",
};

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = toolLandscape;
    if (selectedCategory) {
      items = items.filter((cat) => cat.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.map((cat) => ({
        ...cat,
        tools: cat.tools.filter((tool) => tool.toLowerCase().includes(q)),
      })).filter((cat) => cat.tools.length > 0 || cat.category.toLowerCase().includes(q));
    }
    return items;
  }, [search, selectedCategory]);

  const totalTools = toolLandscape.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
          <Wrench size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Vendor & Tool Landscape</h1>
          <p className="text-sm text-muted-foreground">{totalTools} security tools across {toolLandscape.length} categories</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
        </div>
        <select
          value={selectedCategory || "all"}
          onChange={(e) => setSelectedCategory(e.target.value === "all" ? null : e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Categories</option>
          {toolLandscape.map((cat) => (
            <option key={cat.category} value={cat.category}>{cat.category}</option>
          ))}
        </select>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {filtered.map((cat) => (
          <div key={cat.category} className="bg-card rounded-xl border border-border border-l-4 p-5 card-hover" style={{ borderLeftColor: categoryColors[cat.category] || "#64748b" }}>
            <h3 className="font-semibold text-sm mb-1" style={{ color: categoryColors[cat.category] || "#64748b" }}>
              {cat.category}
            </h3>
            <p className="text-[10px] text-muted-foreground mb-3 leading-relaxed">
              {categoryDescriptions[cat.category] || ""}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cat.tools.map((tool) => (
                <span key={tool} className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground/80 hover:bg-muted/80 transition-smooth cursor-default">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No matching tools found</p>
      )}

      {/* PM Perspective */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-sm mb-2">PM Perspective</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          As a Cybersecurity PM, you don't need to master these tools, but you should recognize them when your teams mention them. Understanding which category a tool belongs to helps you assess vendor proposals, plan integrations, and understand project dependencies. When evaluating new tools, ask: What problem does it solve? What does it replace? How does it integrate with our existing stack?
        </p>
      </div>

      {/* Evaluation Criteria */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-sm mb-3">Tool Evaluation Criteria for PMs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Integration", desc: "Does it work with our existing stack (SIEM, SOAR, ticketing)?" },
            { title: "Total Cost of Ownership", desc: "License + implementation + training + ongoing maintenance" },
            { title: "Deployment Model", desc: "Cloud, on-prem, hybrid? Matches our architecture?" },
            { title: "Vendor Viability", desc: "Market position, funding, customer base, support quality" },
            { title: "Compliance", desc: "Does it help us meet regulatory requirements?" },
            { title: "Scalability", desc: "Can it grow with our organization's needs?" },
          ].map((item) => (
            <div key={item.title} className="bg-muted/30 rounded-lg p-3">
              <h4 className="text-xs font-semibold mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
