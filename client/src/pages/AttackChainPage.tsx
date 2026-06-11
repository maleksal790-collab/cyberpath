import { useState } from "react";
import { Crosshair, Shield, AlertTriangle, Zap, Info } from "lucide-react";

const killChainStages = [
  {
    name: "Reconnaissance",
    color: "#3b82f6",
    mitre: "TA0043",
    description: "Attacker gathers information about the target — public records, social media, DNS lookups, port scans.",
    techniques: ["OSINT gathering", "Port scanning (Nmap)", "Social engineering research", "DNS enumeration"],
    defenses: ["Minimize public exposure", "Monitor for scanning activity", "Employee awareness training"],
    pmNote: "This is where threat intelligence feeds help. Projects that improve your organization's external attack surface visibility address this stage.",
    realWorldExample: "Before the SolarWinds attack, threat actors spent months researching the company's build processes and supply chain.",
  },
  {
    name: "Weaponization",
    color: "#6366f1",
    mitre: "TA0001",
    description: "Attacker creates a deliverable payload — malware, exploit kit, or malicious document tailored to the target.",
    techniques: ["Crafting phishing emails", "Building exploit payloads", "Creating malicious macros", "Developing custom malware"],
    defenses: ["Threat intelligence sharing", "Sandboxing suspicious files", "Email gateway filtering"],
    pmNote: "Your threat intelligence team works here. Projects involving threat intel platforms (TIPs) or malware analysis tools help detect weaponization patterns.",
    realWorldExample: "The NotPetya attackers weaponized a legitimate Ukrainian tax software update mechanism to deliver their payload.",
  },
  {
    name: "Delivery",
    color: "#8b5cf6",
    mitre: "TA0001",
    description: "Attacker transmits the weapon to the target — via email, web, USB, or compromised websites.",
    techniques: ["Spear phishing emails", "Watering hole attacks", "USB drop attacks", "Supply chain compromise"],
    defenses: ["Email security gateways", "Web filtering/proxy", "USB device control", "Security awareness training"],
    pmNote: "Email security and web filtering projects directly counter this stage. Phishing simulation programs measure your organization's resilience here.",
    realWorldExample: "The Target breach started with a phishing email sent to an HVAC vendor, demonstrating supply chain delivery vectors.",
  },
  {
    name: "Exploitation",
    color: "#f59e0b",
    mitre: "TA0002",
    description: "The weapon triggers — exploiting a vulnerability in software, OS, or human behavior to gain initial access.",
    techniques: ["Zero-day exploits", "Macro execution", "Credential harvesting", "Browser exploits"],
    defenses: ["Patch management", "Application whitelisting", "Endpoint detection (EDR)", "Vulnerability scanning"],
    pmNote: "Patch management and vulnerability management programs are your primary defense projects here. Track patch compliance rates as a key metric.",
    realWorldExample: "WannaCry exploited the EternalBlue vulnerability (MS17-010) in unpatched Windows systems, affecting 200,000+ computers.",
  },
  {
    name: "Installation",
    color: "#ef4444",
    mitre: "TA0003",
    description: "Attacker installs a backdoor or persistent access mechanism on the compromised system.",
    techniques: ["RAT deployment", "Registry persistence", "Scheduled tasks", "DLL hijacking"],
    defenses: ["EDR/XDR monitoring", "Application control", "File integrity monitoring", "Behavioral analysis"],
    pmNote: "EDR/XDR deployment projects address this stage. These tools detect unusual installations and persistence mechanisms in real-time.",
    realWorldExample: "APT29 (Cozy Bear) used multiple persistence mechanisms including WMI subscriptions and scheduled tasks during the SolarWinds campaign.",
  },
  {
    name: "Command & Control",
    color: "#dc2626",
    mitre: "TA0011",
    description: "Attacker establishes a communication channel to remotely control the compromised system.",
    techniques: ["DNS tunneling", "HTTPS beaconing", "Social media C2", "Encrypted channels"],
    defenses: ["Network traffic analysis", "DNS monitoring", "Firewall egress rules", "SSL/TLS inspection"],
    pmNote: "Network security projects (NGFW, NDR, DNS security) help detect C2 traffic. These are often high-priority, high-budget initiatives.",
    realWorldExample: "The SolarWinds SUNBURST backdoor used DNS queries to communicate with C2 servers, blending in with normal traffic.",
  },
  {
    name: "Actions on Objectives",
    color: "#991b1b",
    mitre: "TA0040",
    description: "Attacker achieves their goal — data exfiltration, ransomware deployment, lateral movement, or destruction.",
    techniques: ["Data exfiltration", "Ransomware deployment", "Lateral movement", "Privilege escalation"],
    defenses: ["DLP solutions", "Network segmentation", "Backup & recovery", "Incident response plan"],
    pmNote: "Incident response planning and business continuity projects prepare for this stage. DLP and backup projects limit the damage when attackers reach this point.",
    realWorldExample: "Colonial Pipeline ransomware attack led to a $4.4M ransom payment and fuel shortages across the US East Coast.",
  },
];

export default function AttackChainPage() {
  const [selectedStage, setSelectedStage] = useState(0);
  const [showMitre, setShowMitre] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center">
          <Crosshair size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Cyber Kill Chain</h1>
          <p className="text-sm text-muted-foreground">Understanding the 7 stages of a cyber attack — and where your projects fit in</p>
        </div>
      </div>

      {/* Visual Chain */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-[700px]">
          {killChainStages.map((stage, i) => (
            <button
              key={stage.name}
              onClick={() => setSelectedStage(i)}
              className={`flex-1 relative group transition-smooth ${selectedStage === i ? "scale-105 z-10" : "hover:scale-102"}`}
            >
              <div
                className={`py-3 px-2 text-center rounded-lg border-2 transition-smooth ${selectedStage === i ? "shadow-lg" : "border-transparent hover:border-current/20"}`}
                style={{
                  backgroundColor: selectedStage === i ? stage.color + "15" : "transparent",
                  borderColor: selectedStage === i ? stage.color : undefined,
                }}
              >
                <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: stage.color }}>
                  {i + 1}
                </div>
                <p className="text-[10px] sm:text-xs font-medium leading-tight" style={{ color: selectedStage === i ? stage.color : undefined }}>
                  {stage.name}
                </p>
              </div>
              {i < killChainStages.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 text-muted-foreground">
                  →
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Detail */}
      <div className="bg-card rounded-xl border border-border border-l-4 p-6 mb-6" style={{ borderLeftColor: killChainStages[selectedStage].color }}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold" style={{ color: killChainStages[selectedStage].color }}>
            Stage {selectedStage + 1}: {killChainStages[selectedStage].name}
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
            MITRE: {killChainStages[selectedStage].mitre}
          </span>
        </div>
        <p className="text-sm text-foreground/80 mb-6">{killChainStages[selectedStage].description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
              <AlertTriangle size={12} />
              Attack Techniques
            </h4>
            <ul className="space-y-1.5">
              {killChainStages[selectedStage].techniques.map((t) => (
                <li key={t} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: killChainStages[selectedStage].color }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
              <Shield size={12} />
              Defensive Controls
            </h4>
            <ul className="space-y-1.5">
              {killChainStages[selectedStage].defenses.map((d) => (
                <li key={d} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
              <Zap size={12} />
              PM Perspective
            </h4>
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
              <p className="text-xs text-foreground/80 leading-relaxed">{killChainStages[selectedStage].pmNote}</p>
            </div>
          </div>
        </div>

        {/* Real World Example */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1">
            <Info size={12} />
            Real-World Example
          </h4>
          <p className="text-xs text-amber-900/80 leading-relaxed">{killChainStages[selectedStage].realWorldExample}</p>
        </div>
      </div>

      {/* Coverage Matrix */}
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <h3 className="font-semibold text-sm mb-3">Defense Coverage Matrix</h3>
        <p className="text-xs text-muted-foreground mb-4">Map your security projects to kill chain stages to identify gaps</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-semibold text-muted-foreground">Project Type</th>
                {killChainStages.map((s, i) => (
                  <th key={i} className="text-center py-2 px-1 font-semibold" style={{ color: s.color }}>
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { project: "Threat Intelligence", coverage: [true, true, false, false, false, false, false] },
                { project: "Email Security", coverage: [false, false, true, false, false, false, false] },
                { project: "Patch Management", coverage: [false, false, false, true, false, false, false] },
                { project: "EDR/XDR", coverage: [false, false, false, true, true, false, false] },
                { project: "Network Security", coverage: [true, false, false, false, false, true, false] },
                { project: "DLP & Backup", coverage: [false, false, false, false, false, false, true] },
                { project: "Security Awareness", coverage: [true, false, true, true, false, false, false] },
                { project: "Incident Response", coverage: [false, false, false, false, true, true, true] },
              ].map((row) => (
                <tr key={row.project} className="border-b border-border/50">
                  <td className="py-2 px-2 font-medium">{row.project}</td>
                  {row.coverage.map((covered, i) => (
                    <td key={i} className="text-center py-2 px-1">
                      {covered ? (
                        <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: killChainStages[i].color + "30", border: `2px solid ${killChainStages[i].color}` }} />
                      ) : (
                        <span className="inline-block w-4 h-4 rounded-full bg-muted" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-semibold text-sm mb-2">Key Takeaway for Project Managers</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">
          Every security project you manage maps to one or more stages of the kill chain. When justifying budget or prioritizing initiatives, frame them as: "This project breaks the kill chain at Stage X, preventing attackers from progressing to Y." This language resonates with executives and helps prioritize investments where your organization has the biggest gaps.
        </p>
      </div>
    </div>
  );
}
