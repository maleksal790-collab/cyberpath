import { useState } from "react";
import { BarChart3, Users, Calendar, DollarSign, MessageSquare, ChevronDown, Target } from "lucide-react";

const meetingPreps = [
  {
    meeting: "SOC Standup",
    frequency: "Daily",
    whatToKnow: "Current alert volume, open incidents, escalations pending your decision",
    questionsToAsk: ["What's our current alert queue depth?", "Any incidents requiring cross-team coordination?", "Are we seeing any new attack patterns?"],
  },
  {
    meeting: "Change Advisory Board (CAB)",
    frequency: "Weekly",
    whatToKnow: "Upcoming changes, risk assessments, rollback plans, affected systems",
    questionsToAsk: ["What's the blast radius if this change fails?", "Has security reviewed this change?", "What's the rollback timeline?"],
  },
  {
    meeting: "Risk Review",
    frequency: "Monthly",
    whatToKnow: "Top risks, risk scores, mitigation progress, new threats",
    questionsToAsk: ["Which risks have changed since last review?", "Are any mitigations behind schedule?", "Do we need to escalate anything to leadership?"],
  },
  {
    meeting: "Vendor Assessment",
    frequency: "As needed",
    whatToKnow: "Vendor security posture, SLAs, compliance certifications, data handling",
    questionsToAsk: ["What certifications does the vendor hold?", "Where will our data reside?", "What's their incident notification timeline?"],
  },
  {
    meeting: "Executive Security Briefing",
    frequency: "Quarterly",
    whatToKnow: "KPI trends, major incidents, compliance status, budget utilization",
    questionsToAsk: ["Are we within risk appetite?", "What's our biggest exposure?", "How do we compare to industry benchmarks?"],
  },
];

const projectPhases = [
  {
    phase: "Initiation",
    securityGates: ["Threat modeling workshop", "Data classification", "Regulatory requirements identified"],
    pmActions: "Define security requirements in project charter. Identify which data/systems are in scope.",
  },
  {
    phase: "Planning",
    securityGates: ["Security architecture review", "Risk assessment", "Vendor security evaluation"],
    pmActions: "Include security tasks in WBS. Allocate time for security reviews. Plan penetration testing.",
  },
  {
    phase: "Execution",
    securityGates: ["Secure code review", "Vulnerability scanning", "Security configuration baseline"],
    pmActions: "Track security findings as risks/issues. Ensure developers follow secure coding standards.",
  },
  {
    phase: "Testing",
    securityGates: ["Penetration testing", "Security acceptance testing", "Compliance validation"],
    pmActions: "Schedule pen test early. Track remediation of findings. Get sign-off from security team.",
  },
  {
    phase: "Deployment",
    securityGates: ["Go-live security checklist", "Monitoring configured", "Incident response plan updated"],
    pmActions: "Verify all security controls are active. Confirm monitoring coverage. Update runbooks.",
  },
  {
    phase: "Closure",
    securityGates: ["Lessons learned (security)", "Residual risk acceptance", "Documentation handover"],
    pmActions: "Document security decisions. Transfer operational security to BAU team. Archive evidence.",
  },
];

const budgetCategories = [
  { category: "Security Tools & Licensing", percentage: 35, examples: "SIEM, EDR, firewall, vulnerability scanner subscriptions" },
  { category: "Professional Services", percentage: 20, examples: "Pen testing, consulting, incident response retainer" },
  { category: "Staff & Training", percentage: 25, examples: "Security team salaries, certifications, awareness training" },
  { category: "Infrastructure", percentage: 12, examples: "Hardware, cloud security services, network equipment" },
  { category: "Compliance & Audit", percentage: 8, examples: "External audits, compliance tools, legal review" },
];

const raciMatrix = [
  { activity: "Security Requirements", pm: "A", ciso: "R", secArch: "C", devTeam: "I", legal: "C" },
  { activity: "Risk Assessment", pm: "R", ciso: "A", secArch: "C", devTeam: "I", legal: "I" },
  { activity: "Vendor Selection", pm: "R", ciso: "A", secArch: "C", devTeam: "C", legal: "C" },
  { activity: "Penetration Testing", pm: "A", ciso: "I", secArch: "R", devTeam: "C", legal: "I" },
  { activity: "Incident Response", pm: "C", ciso: "A", secArch: "R", devTeam: "R", legal: "I" },
  { activity: "Compliance Reporting", pm: "R", ciso: "A", secArch: "C", devTeam: "I", legal: "R" },
  { activity: "Budget Approval", pm: "R", ciso: "A", secArch: "I", devTeam: "I", legal: "I" },
  { activity: "Security Training", pm: "A", ciso: "R", secArch: "C", devTeam: "I", legal: "I" },
];

const raciColors: Record<string, string> = {
  R: "bg-blue-100 text-blue-700",
  A: "bg-red-100 text-red-700",
  C: "bg-amber-100 text-amber-700",
  I: "bg-gray-100 text-gray-600",
};

const raciLabels: Record<string, string> = {
  R: "Responsible",
  A: "Accountable",
  C: "Consulted",
  I: "Informed",
};

export default function MetricsPage() {
  const [activeSection, setActiveSection] = useState<string>("meetings");

  const sections = [
    { id: "meetings", label: "Meeting Prep", icon: <Users size={14} /> },
    { id: "lifecycle", label: "Project Lifecycle", icon: <Calendar size={14} /> },
    { id: "budget", label: "Budget Planning", icon: <DollarSign size={14} /> },
    { id: "raci", label: "RACI Matrix", icon: <Target size={14} /> },
    { id: "translation", label: "Tech Translation", icon: <MessageSquare size={14} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
          <BarChart3 size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">PM Command Center</h1>
          <p className="text-sm text-muted-foreground">Meeting prep, project lifecycle, budget planning, and stakeholder communication</p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 mb-6 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-smooth whitespace-nowrap ${activeSection === section.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      {/* Meeting Prep Cards */}
      {activeSection === "meetings" && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-primary" />
            <h2 className="text-lg font-bold">Meeting Prep Cheat Sheets</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Quick reference cards for common cybersecurity meetings</p>
          <div className="space-y-3">
            {meetingPreps.map((m) => (
              <details key={m.meeting} className="bg-card rounded-xl border border-border group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">{m.meeting}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{m.frequency}</span>
                  </div>
                  <ChevronDown size={14} className="text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-4 border-t border-border pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">What to Know Beforehand</h4>
                      <p className="text-sm text-foreground/80">{m.whatToKnow}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Questions to Ask</h4>
                      <ul className="space-y-1">
                        {m.questionsToAsk.map((q) => (
                          <li key={q} className="text-sm text-foreground/80 flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Project Lifecycle */}
      {activeSection === "lifecycle" && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-primary" />
            <h2 className="text-lg font-bold">Project Lifecycle × Security Gates</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Security checkpoints mapped to standard project phases</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Phase</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Security Gates</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Your Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectPhases.map((p, i) => (
                    <tr key={p.phase} className="border-b border-border/50 hover:bg-muted/20 transition-smooth align-top">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{i + 1}</span>
                          <span className="font-medium text-primary whitespace-nowrap">{p.phase}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <ul className="space-y-1">
                          {p.securityGates.map((g) => (
                            <li key={g} className="text-muted-foreground flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              {g}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3 text-foreground/80">{p.pmActions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Budget Planning */}
      {activeSection === "budget" && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={18} className="text-primary" />
            <h2 className="text-lg font-bold">Typical Cybersecurity Budget Breakdown</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Industry-average allocation for cybersecurity spending</p>
          <div className="bg-card rounded-xl border border-border p-5 mb-6">
            <div className="space-y-4">
              {budgetCategories.map((b) => (
                <div key={b.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{b.category}</span>
                    <span className="text-sm font-bold text-primary">{b.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-full transition-all duration-600"
                      style={{ width: `${b.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{b.examples}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-2">Budget Justification Tips</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-foreground/80">
              <div className="bg-white/50 rounded-lg p-3">
                <p className="font-medium mb-1">Cost of a Breach</p>
                <p className="text-muted-foreground">Average cost: $4.45M (IBM 2023). Use this to justify preventive spending.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <p className="font-medium mb-1">ROI Formula</p>
                <p className="text-muted-foreground">Risk Reduction = (ALE before - ALE after) / Cost of Control</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <p className="font-medium mb-1">Industry Benchmark</p>
                <p className="text-muted-foreground">Security spend should be 10-15% of total IT budget.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <p className="font-medium mb-1">Regulatory Fines</p>
                <p className="text-muted-foreground">GDPR: up to 4% of annual revenue. Compare to prevention cost.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RACI Matrix */}
      {activeSection === "raci" && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-primary" />
            <h2 className="text-lg font-bold">Security RACI Matrix</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Responsibility assignment for common security activities</p>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4">
            {Object.entries(raciLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${raciColors[key]}`}>{key}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Activity</th>
                    <th className="text-center px-3 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">PM</th>
                    <th className="text-center px-3 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">CISO</th>
                    <th className="text-center px-3 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Sec Arch</th>
                    <th className="text-center px-3 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Dev Team</th>
                    <th className="text-center px-3 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Legal</th>
                  </tr>
                </thead>
                <tbody>
                  {raciMatrix.map((row) => (
                    <tr key={row.activity} className="border-b border-border/50 hover:bg-muted/20 transition-smooth">
                      <td className="px-4 py-3 font-medium">{row.activity}</td>
                      {[row.pm, row.ciso, row.secArch, row.devTeam, row.legal].map((val, i) => (
                        <td key={i} className="text-center px-3 py-3">
                          <span className={`inline-flex w-7 h-7 rounded items-center justify-center text-[10px] font-bold ${raciColors[val]}`}>{val}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Stakeholder Translation */}
      {activeSection === "translation" && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={18} className="text-primary" />
            <h2 className="text-lg font-bold">Translating Technical to Business Language</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Bridge the gap between security teams and executive stakeholders</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Technical Finding</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Executive Translation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tech: "Critical CVE on internet-facing server", exec: "A known vulnerability on a public system could allow unauthorized access to customer data" },
                    { tech: "Lateral movement detected in AD", exec: "An attacker is moving between systems inside our network, expanding their access" },
                    { tech: "Failed MFA bypass attempt", exec: "Someone tried to break through our login security — our controls blocked it" },
                    { tech: "SOC MTTD reduced from 72h to 8h", exec: "We now detect threats 9x faster than before, limiting potential damage" },
                    { tech: "Patch compliance at 67%", exec: "One-third of our systems still have known security gaps that need to be fixed" },
                    { tech: "Phishing click rate at 23%", exec: "Nearly 1 in 4 employees clicked a simulated attack — we need more training" },
                    { tech: "Zero-day exploit in the wild", exec: "A brand-new vulnerability with no patch exists — we need emergency mitigations" },
                    { tech: "DLP alert: PII exfiltration attempt", exec: "Someone tried to send customer personal data outside our network — it was blocked" },
                  ].map((row) => (
                    <tr key={row.tech} className="border-b border-border/50 hover:bg-muted/20 transition-smooth">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">"{row.tech}"</td>
                      <td className="px-4 py-3 text-foreground/80">"{row.exec}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-semibold text-sm mb-2">Communication Framework</h3>
            <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
              <p><strong>For the Board:</strong> Focus on business impact, risk trends, and comparison to industry benchmarks. Avoid technical jargon entirely.</p>
              <p><strong>For the CISO:</strong> Use metrics, timelines, and resource needs. Be specific about blockers and dependencies.</p>
              <p><strong>For Engineering:</strong> Be precise about requirements, acceptance criteria, and security testing expectations.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
