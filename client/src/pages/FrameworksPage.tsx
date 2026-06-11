import { useState } from "react";
import { frameworkComparison, securityMetrics } from "@/data/roadmapData";
import { GitCompare, BarChart3, ChevronDown, Info } from "lucide-react";

const frameworkDetails: Record<string, { description: string; keyComponents: string[]; certBody: string }> = {
  "NIST CSF": {
    description: "A voluntary framework providing guidance for managing cybersecurity risk. Widely adopted across industries in the US.",
    keyComponents: ["Identify", "Protect", "Detect", "Respond", "Recover"],
    certBody: "NIST (National Institute of Standards and Technology)",
  },
  "ISO 27001": {
    description: "International standard for Information Security Management Systems (ISMS). Requires formal certification audit.",
    keyComponents: ["Context of Organization", "Leadership", "Planning", "Support", "Operation", "Performance Evaluation", "Improvement"],
    certBody: "ISO/IEC (International Organization for Standardization)",
  },
  "CIS Controls": {
    description: "Prioritized set of actions to protect organizations from known cyber attack vectors. Practical and prescriptive.",
    keyComponents: ["Basic Controls (1-6)", "Foundational Controls (7-16)", "Organizational Controls (17-18)"],
    certBody: "CIS (Center for Internet Security)",
  },
  "SOC 2": {
    description: "Audit framework for service organizations demonstrating security controls. Required by many enterprise customers.",
    keyComponents: ["Security", "Availability", "Processing Integrity", "Confidentiality", "Privacy"],
    certBody: "AICPA (American Institute of CPAs)",
  },
  "PCI DSS": {
    description: "Mandatory standard for organizations handling credit card data. Specific technical requirements with regular assessments.",
    keyComponents: ["Build Secure Network", "Protect Cardholder Data", "Vulnerability Management", "Access Control", "Monitoring", "Security Policy"],
    certBody: "PCI SSC (Payment Card Industry Security Standards Council)",
  },
};

export default function FrameworksPage() {
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);
  const [metricFilter, setMetricFilter] = useState<string>("all");

  const metricCategories = [...new Set(securityMetrics.map((m) => m.category))];
  const filteredMetrics = metricFilter === "all" ? securityMetrics : securityMetrics.filter((m) => m.category === metricFilter);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
          <GitCompare size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Framework Comparison & Metrics</h1>
          <p className="text-sm text-muted-foreground">Side-by-side comparison of major cybersecurity frameworks</p>
        </div>
      </div>

      {/* Framework Comparison Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border bg-muted/20">
          <h2 className="font-semibold text-sm">Compliance Framework Comparison</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Click any framework row for detailed information</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Framework</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Scope</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Approach</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Structure</th>
                <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Best For</th>
              </tr>
            </thead>
            <tbody>
              {frameworkComparison.map((fw) => (
                <>
                  <tr
                    key={fw.framework}
                    className={`border-b border-border/50 hover:bg-muted/20 transition-smooth cursor-pointer ${expandedFramework === fw.framework ? "bg-muted/30" : ""}`}
                    onClick={() => setExpandedFramework(expandedFramework === fw.framework ? null : fw.framework)}
                  >
                    <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ChevronDown size={14} className={`transition-transform ${expandedFramework === fw.framework ? "rotate-180" : ""}`} />
                        {fw.framework}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{fw.scope}</td>
                    <td className="px-4 py-3 text-muted-foreground">{fw.approach}</td>
                    <td className="px-4 py-3 text-muted-foreground">{fw.structure}</td>
                    <td className="px-4 py-3 text-foreground/80">{fw.bestFor}</td>
                  </tr>
                  {expandedFramework === fw.framework && frameworkDetails[fw.framework] && (
                    <tr key={`${fw.framework}-detail`} className="border-b border-border/50 bg-primary/5">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
                            <p className="text-xs text-foreground/80 leading-relaxed">{frameworkDetails[fw.framework].description}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Components</h4>
                            <div className="flex flex-wrap gap-1">
                              {frameworkDetails[fw.framework].keyComponents.map((comp) => (
                                <span key={comp} className="px-2 py-0.5 rounded bg-primary/10 text-[10px] font-medium text-primary">{comp}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Certification Body</h4>
                            <p className="text-xs text-foreground/80">{frameworkDetails[fw.framework].certBody}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Framework Selection Guide */}
      <div className="bg-card rounded-xl border border-border p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-primary" />
          <h3 className="font-semibold text-sm">Framework Selection Guide</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { scenario: "US Government contractor", recommendation: "NIST CSF + NIST 800-53" },
            { scenario: "SaaS company selling to enterprises", recommendation: "SOC 2 Type II" },
            { scenario: "Global organization", recommendation: "ISO 27001" },
            { scenario: "Processing credit cards", recommendation: "PCI DSS (mandatory)" },
            { scenario: "Starting from scratch", recommendation: "CIS Controls (most actionable)" },
            { scenario: "Healthcare (US)", recommendation: "HIPAA + NIST CSF" },
          ].map((item) => (
            <div key={item.scenario} className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">{item.scenario}</p>
              <p className="text-xs font-semibold text-primary">{item.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Metrics Dashboard */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BarChart3 size={20} className="text-primary" />
          <div>
            <h2 className="text-lg font-bold">Security Metrics for PMs</h2>
            <p className="text-xs text-muted-foreground">Key Performance Indicators you should track and report on</p>
          </div>
        </div>
        <select
          value={metricFilter}
          onChange={(e) => setMetricFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Categories</option>
          {metricCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {filteredMetrics.map((m) => (
          <div key={m.metric} className="bg-card rounded-xl border border-border p-4 card-hover">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-muted text-foreground">{m.metric}</span>
                <h4 className="font-medium text-sm mt-1.5">{m.fullName}</h4>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                m.category === "Detection" ? "bg-blue-100 text-blue-700" :
                m.category === "Response" ? "bg-red-100 text-red-700" :
                m.category === "Prevention" ? "bg-green-100 text-green-700" :
                m.category === "Awareness" ? "bg-amber-100 text-amber-700" :
                "bg-purple-100 text-purple-700"
              }`}>
                {m.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{m.description}</p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-semibold text-primary">Target:</span>
              <span className="text-xs text-foreground/80">{m.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PM Tips */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
        <h3 className="font-semibold text-sm mb-2">How to Use These Metrics</h3>
        <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
          <p>
            <strong>Board Reporting:</strong> Focus on MTTD, MTTR, and incident trends. Executives want to know: "Are we getting better at finding and stopping threats?"
          </p>
          <p>
            <strong>Project Justification:</strong> Use metrics to show improvement. "This SIEM project reduced our MTTD from 72 hours to 8 hours."
          </p>
          <p>
            <strong>Team Performance:</strong> Track false positive rates and resolution times to identify where your SOC needs investment or training.
          </p>
        </div>
      </div>
    </div>
  );
}
