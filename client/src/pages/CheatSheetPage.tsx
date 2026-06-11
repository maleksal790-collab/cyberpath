import { useState, useMemo } from "react";
import { portCheatSheet } from "@/data/roadmapData";
import { Search, Table2, AlertTriangle, Shield } from "lucide-react";

// Ports that are considered insecure or commonly attacked
const insecurePorts = [21, 23, 25, 69, 80, 110, 143, 161, 445, 3389];
const highValuePorts = [22, 53, 443, 636, 993, 995, 8443];

export default function CheatSheetPage() {
  const [search, setSearch] = useState("");
  const [filterTcp, setFilterTcp] = useState<"all" | "tcp" | "udp">("all");
  const [filterRisk, setFilterRisk] = useState<"all" | "insecure" | "high-value">("all");

  const filtered = useMemo(() => {
    let items = portCheatSheet;
    if (filterTcp === "tcp") items = items.filter((p) => p.tcp);
    if (filterTcp === "udp") items = items.filter((p) => !p.tcp);
    if (filterRisk === "insecure") items = items.filter((p) => insecurePorts.includes(p.port));
    if (filterRisk === "high-value") items = items.filter((p) => highValuePorts.includes(p.port));
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) =>
        p.port.toString().includes(q) ||
        p.protocol.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, filterTcp, filterRisk]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
          <Table2 size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Port & Protocol Cheat Sheet</h1>
          <p className="text-sm text-muted-foreground">Quick reference for common ports and their security implications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by port number, protocol, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            {(["all", "tcp", "udp"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterTcp(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${filterTcp === f ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
            {([
              { key: "all", label: "All" },
              { key: "insecure", label: "Insecure" },
              { key: "high-value", label: "Critical" },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterRisk(f.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${filterRisk === f.key ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-lg border border-border p-3 text-center">
          <p className="text-lg font-bold text-primary">{portCheatSheet.length}</p>
          <p className="text-[10px] text-muted-foreground">Total Ports</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-3 text-center">
          <p className="text-lg font-bold text-blue-600">{portCheatSheet.filter((p) => p.tcp).length}</p>
          <p className="text-[10px] text-muted-foreground">TCP Ports</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-3 text-center">
          <p className="text-lg font-bold text-amber-600">{portCheatSheet.filter((p) => !p.tcp).length}</p>
          <p className="text-[10px] text-muted-foreground">UDP Ports</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Port</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Protocol</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Risk</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isInsecure = insecurePorts.includes(p.port);
                const isHighValue = highValuePorts.includes(p.port);
                return (
                  <tr key={`${p.port}-${p.protocol}`} className={`border-b border-border/50 hover:bg-muted/20 transition-smooth ${isInsecure ? "bg-red-50/30" : ""}`}>
                    <td className="px-4 py-3">
                      <span className="font-mono font-medium text-primary">{p.port}</span>
                    </td>
                    <td className="px-4 py-3 font-medium">{p.protocol}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${p.tcp ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                        {p.tcp ? "TCP" : "UDP"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {isInsecure && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700">
                          <AlertTriangle size={10} />
                          Insecure
                        </span>
                      )}
                      {isHighValue && !isInsecure && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-700">
                          <Shield size={10} />
                          Critical
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No matching ports found</p>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">{filtered.length} ports shown</p>

      {/* Security Note */}
      <div className="mt-6 bg-red-50/50 border border-red-100 rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-2 text-red-800">Security Note</h3>
        <p className="text-sm text-red-700/80 leading-relaxed">
          Ports marked as insecure (like Telnet on 23, FTP on 21) should never be exposed to the internet. When reviewing firewall rules, ensure only necessary ports are open and prefer encrypted alternatives (SSH over Telnet, SFTP over FTP, HTTPS over HTTP).
        </p>
      </div>

      {/* PM Quick Reference */}
      <div className="mt-4 bg-blue-50/50 border border-blue-100 rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-2">PM Quick Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/80">
          <div>
            <p className="font-medium mb-1">When reviewing firewall change requests:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Is the port necessary for the application?</li>
              <li>• Is there a more secure alternative?</li>
              <li>• Is access restricted to specific IPs?</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1">When scoping penetration tests:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Which ports are internet-facing?</li>
              <li>• Are any insecure protocols in use?</li>
              <li>• What services are running on non-standard ports?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
