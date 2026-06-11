// CyberPath Learning Roadmap - Complete Data Structure
// 9 Domains, Beginner → Advanced, with PM Perspectives

export interface Topic {
  id: string;
  title: string;
  difficulty: 1 | 2 | 3; // 1=beginner, 2=intermediate, 3=advanced
  timeToRead: string;
  overview: string;
  pmPerspective: string;
  deepDive: string[];
  keyTerms: string[];
  relatedTopics: string[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Domain {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  topics: Topic[];
}

export const domains: Domain[] = [
  {
    id: "it-fundamentals",
    title: "IT Fundamentals",
    icon: "Monitor",
    color: "#3b82f6",
    description: "Hardware, operating systems, virtualization, and core IT concepts",
    topics: [
      {
        id: "hardware-basics",
        title: "Hardware Components",
        difficulty: 1,
        timeToRead: "12 min",
        overview: "Understanding the physical components that make up computing systems: CPU, RAM, storage devices, motherboards, power supplies, and peripheral devices. These components work together to process, store, and transmit data.",
        pmPerspective: "When your infrastructure team discusses hardware refresh cycles, capacity planning, or performance bottlenecks, understanding these components helps you assess timelines, budget requirements, and risk. A failing hard drive or insufficient RAM can be a security vulnerability if it causes system instability.",
        deepDive: [
          "CPU (Central Processing Unit): The brain of the computer. Measured in cores, clock speed (GHz), and architecture (x86, ARM). Security relevance: hardware-level vulnerabilities like Spectre/Meltdown.",
          "RAM (Random Access Memory): Volatile memory for active processes. Measured in GB. Security relevance: memory forensics, buffer overflow attacks target RAM.",
          "Storage: HDD (mechanical, slower, cheaper) vs SSD (flash, faster, more reliable). Security relevance: data at rest encryption, secure data destruction, disk forensics.",
          "Motherboard: Main circuit board connecting all components. Contains BIOS/UEFI firmware. Security relevance: firmware attacks, rootkits at hardware level.",
          "NIC (Network Interface Card): Enables network connectivity. Security relevance: MAC address spoofing, network sniffing.",
          "Power Supply Unit (PSU): Converts AC to DC power. Redundant PSUs in servers for high availability."
        ],
        keyTerms: ["CPU", "RAM", "SSD", "HDD", "NIC", "BIOS", "UEFI", "Firmware", "Motherboard"],
        relatedTopics: ["operating-systems", "virtualization", "server-hardening"],
        quiz: [
          {
            question: "Which component is most relevant to memory forensics investigations?",
            options: ["CPU", "RAM", "Hard Drive", "Power Supply"],
            correct: 1,
            explanation: "RAM holds active process data and can contain evidence of malware, encryption keys, and user activity that disappears when power is lost."
          },
          {
            question: "What hardware-level vulnerability affected Intel CPUs and could leak sensitive data?",
            options: ["Heartbleed", "Spectre", "SQL Injection", "Cross-Site Scripting"],
            correct: 1,
            explanation: "Spectre (and Meltdown) are hardware vulnerabilities in CPU speculative execution that can leak sensitive data from memory."
          }
        ]
      },
      {
        id: "operating-systems",
        title: "Operating Systems",
        difficulty: 1,
        timeToRead: "15 min",
        overview: "Operating systems manage hardware resources and provide services to applications. The three major OS families in enterprise environments are Windows, Linux, and macOS, each with distinct security models, administration tools, and use cases.",
        pmPerspective: "Your teams will work across multiple OS platforms. Windows dominates enterprise desktops and Active Directory environments. Linux runs most servers, cloud infrastructure, and security tools. Understanding OS differences helps you plan cross-platform projects, estimate training needs, and assess compatibility risks.",
        deepDive: [
          "Windows: Dominant in enterprise. Active Directory for identity management. PowerShell for automation. Windows Defender, BitLocker for security. Registry, Event Logs for forensics.",
          "Linux: Open-source, dominates servers and cloud. Distributions: Ubuntu, CentOS, Kali (security). File permissions (chmod), package managers (apt, yum). Most security tools run on Linux.",
          "macOS: Unix-based, common in creative/dev teams. Gatekeeper, FileVault, XProtect for security. Increasingly targeted by malware.",
          "Kernel: Core of the OS managing hardware. Kernel vulnerabilities are critical (privilege escalation).",
          "File Systems: NTFS (Windows), ext4 (Linux), APFS (macOS). Each has different permission models and forensic artifacts.",
          "Process Management: How OS handles running programs. Important for understanding malware behavior and incident response."
        ],
        keyTerms: ["Kernel", "File System", "Process", "Registry", "Permissions", "Shell", "GUI", "CLI", "Daemon", "Service"],
        relatedTopics: ["hardware-basics", "linux-administration", "active-directory"],
        quiz: [
          {
            question: "Which operating system is most commonly used for enterprise identity management via Active Directory?",
            options: ["Linux", "macOS", "Windows", "FreeBSD"],
            correct: 2,
            explanation: "Windows Server with Active Directory is the dominant enterprise identity and access management platform."
          },
          {
            question: "What Linux distribution is specifically designed for penetration testing and security research?",
            options: ["Ubuntu", "CentOS", "Kali Linux", "Red Hat"],
            correct: 2,
            explanation: "Kali Linux comes pre-loaded with hundreds of security and penetration testing tools."
          }
        ]
      },
      {
        id: "virtualization",
        title: "Virtualization & Containers",
        difficulty: 2,
        timeToRead: "10 min",
        overview: "Virtualization allows multiple operating systems to run on a single physical machine using hypervisors. Containers provide lightweight, isolated environments for applications. Both are foundational to modern infrastructure and cloud computing.",
        pmPerspective: "Virtualization projects involve capacity planning, licensing costs, and migration timelines. When your team says 'spin up a VM,' they're creating an isolated virtual computer. Container projects (Docker, Kubernetes) move faster but require different security considerations. Understanding this helps you scope infrastructure projects accurately.",
        deepDive: [
          "Type 1 Hypervisor (Bare-metal): VMware ESXi, Microsoft Hyper-V, Citrix XenServer. Runs directly on hardware. Used in data centers.",
          "Type 2 Hypervisor (Hosted): VirtualBox, VMware Workstation. Runs on top of an OS. Used for development/testing.",
          "Containers: Docker packages applications with dependencies. Kubernetes orchestrates containers at scale. Lighter than VMs but share the host kernel.",
          "Security Implications: VM escape attacks, container breakout, hypervisor vulnerabilities, snapshot management, network isolation between VMs.",
          "Use Cases: Server consolidation, disaster recovery, development environments, sandboxing malware for analysis, cloud infrastructure."
        ],
        keyTerms: ["Hypervisor", "VM", "Container", "Docker", "Kubernetes", "Snapshot", "vMotion", "Orchestration"],
        relatedTopics: ["cloud-models", "server-hardening", "operating-systems"],
        quiz: [
          {
            question: "What is the key difference between a Type 1 and Type 2 hypervisor?",
            options: ["Type 1 is free, Type 2 is paid", "Type 1 runs on bare metal, Type 2 runs on a host OS", "Type 1 is for containers, Type 2 is for VMs", "There is no difference"],
            correct: 1,
            explanation: "Type 1 hypervisors run directly on hardware (bare-metal) for better performance, while Type 2 runs as software on an existing operating system."
          }
        ]
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting Methodology",
        difficulty: 1,
        timeToRead: "8 min",
        overview: "Systematic approaches to identifying, diagnosing, and resolving technical issues. The CompTIA troubleshooting model provides a structured 7-step process applicable across all IT domains.",
        pmPerspective: "When incidents occur, your teams follow troubleshooting methodologies. Understanding these steps helps you set realistic resolution timelines, ask the right questions during status updates, and identify when escalation is needed. It also helps you structure post-incident reviews.",
        deepDive: [
          "Step 1: Identify the problem — Gather information, question users, identify symptoms, determine scope.",
          "Step 2: Establish a theory — Consider multiple causes, use OSI model for network issues, check simple things first.",
          "Step 3: Test the theory — Confirm or eliminate theories through testing. If theory fails, establish new theory.",
          "Step 4: Establish a plan of action — Document the fix, assess impact, plan implementation window.",
          "Step 5: Implement the solution — Execute the plan, may require change management approval.",
          "Step 6: Verify functionality — Confirm the fix works, test related systems, ensure no new issues.",
          "Step 7: Document findings — Record root cause, solution, lessons learned for future reference."
        ],
        keyTerms: ["Root Cause Analysis", "Escalation", "Change Management", "Incident", "Workaround", "Known Error", "Problem Management"],
        relatedTopics: ["incident-response", "operating-systems", "network-troubleshooting"],
        quiz: [
          {
            question: "What is the first step in the CompTIA troubleshooting methodology?",
            options: ["Establish a theory", "Implement the solution", "Identify the problem", "Document findings"],
            correct: 2,
            explanation: "Always start by identifying and understanding the problem — gathering information, questioning users, and determining scope before jumping to solutions."
          }
        ]
      }
    ]
  },
  {
    id: "networking",
    title: "Networking",
    icon: "Network",
    color: "#06b6d4",
    description: "OSI/TCP-IP models, protocols, routing, switching, and network architecture",
    topics: [
      {
        id: "osi-model",
        title: "OSI & TCP/IP Models",
        difficulty: 1,
        timeToRead: "15 min",
        overview: "The OSI (Open Systems Interconnection) model is a 7-layer conceptual framework for understanding how data moves across networks. The TCP/IP model is the practical 4-layer implementation used on the internet. Together, they provide the vocabulary for all network communication.",
        pmPerspective: "When your network team says 'the issue is at Layer 3,' they mean routing/IP addressing. When they say 'Layer 7 attack,' it targets the application itself. Understanding layers helps you quickly assess which team should handle an issue and how severe it is.",
        deepDive: [
          "Layer 7 - Application: HTTP, HTTPS, DNS, FTP, SMTP, SSH. What users interact with. Attacks: SQL injection, XSS, phishing.",
          "Layer 6 - Presentation: Data formatting, encryption/decryption, compression. SSL/TLS operates here.",
          "Layer 5 - Session: Manages connections between applications. Session hijacking attacks target this layer.",
          "Layer 4 - Transport: TCP (reliable, ordered) vs UDP (fast, no guarantee). Ports identify services. SYN flood attacks.",
          "Layer 3 - Network: IP addressing, routing between networks. Routers operate here. IP spoofing, routing attacks.",
          "Layer 2 - Data Link: MAC addresses, switches, frames. ARP spoofing, VLAN hopping attacks.",
          "Layer 1 - Physical: Cables, wireless signals, hubs. Physical security, wiretapping, jamming.",
          "TCP/IP Model: Application (OSI 5-7), Transport (OSI 4), Internet (OSI 3), Network Access (OSI 1-2)."
        ],
        keyTerms: ["OSI", "TCP/IP", "Layer", "Encapsulation", "Protocol", "PDU", "Frame", "Packet", "Segment"],
        relatedTopics: ["ip-addressing", "protocols-ports", "network-attacks"],
        quiz: [
          {
            question: "At which OSI layer do routers primarily operate?",
            options: ["Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application"],
            correct: 1,
            explanation: "Routers operate at Layer 3 (Network layer), making forwarding decisions based on IP addresses."
          },
          {
            question: "A DDoS SYN flood attack targets which OSI layer?",
            options: ["Layer 3", "Layer 4", "Layer 5", "Layer 7"],
            correct: 1,
            explanation: "SYN floods exploit the TCP three-way handshake at Layer 4 (Transport), overwhelming a server's ability to establish connections."
          }
        ]
      },
      {
        id: "ip-addressing",
        title: "IP Addressing & Subnetting",
        difficulty: 2,
        timeToRead: "18 min",
        overview: "IP addresses are unique identifiers for devices on a network. IPv4 uses 32-bit addresses (e.g., 192.168.1.1), while IPv6 uses 128-bit addresses. Subnetting divides networks into smaller segments for security, performance, and management.",
        pmPerspective: "Network segmentation (subnetting) is a key security control. When your team proposes 'segmenting the network,' they're creating boundaries between systems. This affects project scope — new subnets may require firewall rules, routing changes, and testing. IP address planning is critical for infrastructure projects.",
        deepDive: [
          "IPv4: 32-bit, ~4.3 billion addresses. Format: x.x.x.x (0-255 each octet). Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
          "IPv6: 128-bit, virtually unlimited. Format: xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx. Adoption growing but IPv4 still dominant.",
          "Subnet Mask: Defines network vs host portion. /24 = 255.255.255.0 = 254 usable hosts. /16 = 65,534 hosts.",
          "CIDR Notation: Classless Inter-Domain Routing. /24, /16, /8 indicate network size. Replaced classful addressing.",
          "NAT (Network Address Translation): Maps private IPs to public IPs. Allows many devices to share one public IP. Security through obscurity.",
          "DHCP: Automatically assigns IP addresses to devices. DHCP starvation attacks can exhaust available addresses."
        ],
        keyTerms: ["IPv4", "IPv6", "Subnet", "CIDR", "NAT", "DHCP", "Gateway", "Broadcast", "Unicast", "Multicast"],
        relatedTopics: ["osi-model", "routing-switching", "firewalls-vpns"],
        quiz: [
          {
            question: "Which private IP range provides the most host addresses?",
            options: ["192.168.0.0/16", "172.16.0.0/12", "10.0.0.0/8", "169.254.0.0/16"],
            correct: 2,
            explanation: "10.0.0.0/8 provides over 16 million host addresses, making it the largest private IP range."
          }
        ]
      },
      {
        id: "protocols-ports",
        title: "Protocols & Ports",
        difficulty: 1,
        timeToRead: "12 min",
        overview: "Network protocols are standardized rules for communication. Ports are numbered endpoints (0-65535) that identify specific services. Understanding common protocols and their ports is essential for firewall configuration, traffic analysis, and threat detection.",
        pmPerspective: "When your security team says 'block port 3389,' they're preventing Remote Desktop access. When they discuss 'encrypted traffic on 443,' that's HTTPS. Knowing key ports helps you understand firewall change requests, assess exposure risks, and communicate with network teams.",
        deepDive: [
          "Well-Known Ports (0-1023): HTTP(80), HTTPS(443), FTP(21), SSH(22), Telnet(23), SMTP(25), DNS(53), DHCP(67/68), POP3(110), IMAP(143), LDAP(389), RDP(3389).",
          "TCP vs UDP: TCP = reliable, connection-oriented (web, email, file transfer). UDP = fast, connectionless (DNS, streaming, gaming, VoIP).",
          "HTTP/HTTPS: Web traffic. HTTPS adds TLS encryption. Port 80 vs 443.",
          "DNS: Translates domain names to IPs. Port 53. DNS poisoning/spoofing attacks.",
          "SSH vs Telnet: Both for remote access. SSH is encrypted (port 22), Telnet is plaintext (port 23). Never use Telnet.",
          "SMTP/POP3/IMAP: Email protocols. SMTP sends (25/587), POP3 downloads (110), IMAP syncs (143)."
        ],
        keyTerms: ["TCP", "UDP", "Port", "Protocol", "Socket", "Handshake", "Stateful", "Stateless"],
        relatedTopics: ["osi-model", "firewalls-vpns", "network-monitoring"],
        quiz: [
          {
            question: "Which port does HTTPS use by default?",
            options: ["80", "443", "8080", "22"],
            correct: 1,
            explanation: "HTTPS uses port 443. HTTP (unencrypted) uses port 80."
          },
          {
            question: "Why should Telnet never be used in a production environment?",
            options: ["It's too slow", "It transmits data in plaintext including passwords", "It only works on Linux", "It requires too much bandwidth"],
            correct: 1,
            explanation: "Telnet sends everything in plaintext, including credentials. SSH (port 22) should always be used instead as it encrypts all communication."
          }
        ]
      },
      {
        id: "routing-switching",
        title: "Routing & Switching",
        difficulty: 2,
        timeToRead: "14 min",
        overview: "Switches connect devices within a network (Layer 2) using MAC addresses. Routers connect different networks (Layer 3) using IP addresses. Together they form the backbone of enterprise network infrastructure.",
        pmPerspective: "Network infrastructure projects often involve switch upgrades, router configurations, and VLAN implementations. These are typically high-risk changes requiring maintenance windows. Understanding routing and switching helps you plan downtime, assess blast radius of changes, and coordinate between network and security teams.",
        deepDive: [
          "Switches: Forward frames based on MAC addresses. Create separate collision domains. Managed vs unmanaged. PoE (Power over Ethernet) for IP phones/cameras.",
          "VLANs: Virtual LANs segment a physical switch into logical networks. Critical for security — isolate departments, guest networks, IoT devices.",
          "Routers: Forward packets between networks based on IP. Routing tables determine best path. Default gateway connects to other networks.",
          "Routing Protocols: OSPF, BGP, EIGRP determine optimal paths. BGP runs the internet. Routing protocol attacks can redirect traffic.",
          "Layer 3 Switches: Combine switching and routing. Common in enterprise core networks for performance.",
          "Spanning Tree Protocol (STP): Prevents loops in switched networks. STP attacks can cause network outages."
        ],
        keyTerms: ["Switch", "Router", "VLAN", "MAC Address", "Routing Table", "Default Gateway", "OSPF", "BGP", "STP", "Trunk"],
        relatedTopics: ["osi-model", "ip-addressing", "network-security-arch"],
        quiz: [
          {
            question: "What is the primary security benefit of implementing VLANs?",
            options: ["Faster internet speed", "Network segmentation and isolation", "Cheaper hardware costs", "Better WiFi signal"],
            correct: 1,
            explanation: "VLANs segment the network logically, isolating traffic between departments and limiting the blast radius of security incidents."
          }
        ]
      },
      {
        id: "firewalls-vpns",
        title: "Firewalls & VPNs",
        difficulty: 2,
        timeToRead: "14 min",
        overview: "Firewalls control traffic flow between networks based on rules. VPNs (Virtual Private Networks) create encrypted tunnels over public networks. Together they form the primary perimeter defense for most organizations.",
        pmPerspective: "Firewall change requests are among the most common tasks in security projects. Each rule change needs review, approval, and testing. VPN projects involve capacity planning, user onboarding, and split-tunnel decisions. Understanding these helps you manage change advisory boards and assess security posture.",
        deepDive: [
          "Stateless Firewalls: Filter packets individually based on source/destination IP, port, protocol. Fast but limited context.",
          "Stateful Firewalls: Track connection state. Understand that a response packet belongs to an established connection. More secure.",
          "Next-Generation Firewalls (NGFW): Add application awareness, IPS, deep packet inspection, SSL inspection. Palo Alto, Fortinet, Cisco.",
          "Web Application Firewalls (WAF): Protect web apps from OWASP Top 10 attacks. Layer 7 filtering.",
          "VPN Types: Site-to-Site (connect offices), Remote Access (individual users), SSL VPN (browser-based).",
          "VPN Protocols: IPSec (strong, complex), OpenVPN (open-source), WireGuard (modern, fast), SSL/TLS VPN."
        ],
        keyTerms: ["Firewall", "VPN", "ACL", "Rule", "Stateful", "NGFW", "WAF", "IPSec", "DMZ", "Split Tunnel"],
        relatedTopics: ["protocols-ports", "network-security-arch", "zero-trust"],
        quiz: [
          {
            question: "What advantage does a Next-Generation Firewall (NGFW) have over a traditional stateful firewall?",
            options: ["It's cheaper", "Application-layer awareness and deep packet inspection", "It doesn't need rules", "It only works with VPNs"],
            correct: 1,
            explanation: "NGFWs can identify and control applications regardless of port, perform deep packet inspection, and integrate IPS capabilities."
          }
        ]
      },
      {
        id: "dns-dhcp",
        title: "DNS & DHCP",
        difficulty: 1,
        timeToRead: "10 min",
        overview: "DNS (Domain Name System) translates human-readable domain names to IP addresses. DHCP (Dynamic Host Configuration Protocol) automatically assigns IP configurations to devices. Both are critical infrastructure services that are frequent attack targets.",
        pmPerspective: "DNS outages can take down entire organizations even when servers are healthy. DHCP issues prevent users from connecting. These 'invisible' services are often overlooked in project planning but are critical dependencies. DNS changes for new applications need propagation time (TTL) factored into go-live plans.",
        deepDive: [
          "DNS Hierarchy: Root servers → TLD (.com, .org) → Authoritative servers → Recursive resolvers → Local cache.",
          "DNS Record Types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), TXT (verification/SPF), NS (nameserver).",
          "DNS Attacks: DNS spoofing/poisoning, DNS tunneling (data exfiltration), DDoS on DNS, typosquatting.",
          "DHCP Process: DORA — Discover, Offer, Request, Acknowledge. Client gets IP, subnet mask, gateway, DNS server.",
          "DHCP Attacks: DHCP starvation (exhaust pool), rogue DHCP server (redirect traffic through attacker).",
          "DNS Security: DNSSEC (authentication), DoH/DoT (encrypted DNS), DNS filtering (block malicious domains)."
        ],
        keyTerms: ["DNS", "DHCP", "A Record", "CNAME", "MX", "TTL", "Resolver", "Zone", "DORA", "Lease"],
        relatedTopics: ["ip-addressing", "protocols-ports", "network-attacks"],
        quiz: [
          {
            question: "What does DNS tunneling allow an attacker to do?",
            options: ["Speed up DNS queries", "Exfiltrate data through DNS queries", "Block all DNS traffic", "Encrypt website traffic"],
            correct: 1,
            explanation: "DNS tunneling encodes data within DNS queries/responses, allowing attackers to exfiltrate data or communicate with C2 servers through a protocol that's rarely blocked."
          }
        ]
      },
      {
        id: "wireless-networking",
        title: "Wireless Networking",
        difficulty: 2,
        timeToRead: "11 min",
        overview: "Wireless networks use radio frequencies to transmit data without physical cables. WiFi (802.11 standards), Bluetooth, and cellular are common wireless technologies. Wireless introduces unique security challenges due to the broadcast nature of radio signals.",
        pmPerspective: "Wireless projects involve site surveys, access point placement, and security protocol selection. The shift to WPA3, guest network isolation, and BYOD policies are common project scopes. Wireless is often the weakest link — understanding risks helps you prioritize security controls.",
        deepDive: [
          "WiFi Standards: 802.11a/b/g/n/ac/ax (WiFi 6/6E). Each generation improves speed, range, and capacity.",
          "Security Protocols: WEP (broken, never use) → WPA (weak) → WPA2 (current standard) → WPA3 (latest, strongest).",
          "Authentication: PSK (pre-shared key, home/small office), Enterprise (802.1X with RADIUS server, corporate).",
          "Attacks: Evil twin (fake AP), deauthentication attacks, WPA2 KRACK vulnerability, wardriving, packet sniffing.",
          "Best Practices: WPA3 or WPA2-Enterprise, disable WPS, MAC filtering (weak but layered), network segmentation for IoT.",
          "Site Surveys: Assess coverage, interference, capacity needs before deployment. Tools: Ekahau, NetSpot."
        ],
        keyTerms: ["WiFi", "SSID", "WPA2", "WPA3", "802.1X", "RADIUS", "Access Point", "Evil Twin", "Deauth"],
        relatedTopics: ["protocols-ports", "firewalls-vpns", "network-security-arch"],
        quiz: [
          {
            question: "Which wireless security protocol should never be used due to known vulnerabilities?",
            options: ["WPA3", "WPA2-Enterprise", "WEP", "802.1X"],
            correct: 2,
            explanation: "WEP (Wired Equivalent Privacy) has been thoroughly broken and can be cracked in minutes. Always use WPA2 or WPA3."
          }
        ]
      }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: "Shield",
    color: "#ef4444",
    description: "Threats, attacks, defense strategies, cryptography, and access control",
    topics: [
      {
        id: "cia-triad",
        title: "CIA Triad & Security Principles",
        difficulty: 1,
        timeToRead: "10 min",
        overview: "The CIA Triad — Confidentiality, Integrity, and Availability — forms the foundation of all cybersecurity. Every security control, policy, and decision maps back to protecting one or more of these three principles.",
        pmPerspective: "Every security project you manage ultimately serves the CIA Triad. When prioritizing controls, ask: 'Does this protect confidentiality, integrity, or availability?' This framework helps you justify budget requests to executives and prioritize competing security initiatives.",
        deepDive: [
          "Confidentiality: Ensuring information is accessible only to authorized parties. Controls: encryption, access controls, classification, DLP.",
          "Integrity: Ensuring data hasn't been tampered with. Controls: hashing, digital signatures, version control, checksums.",
          "Availability: Ensuring systems and data are accessible when needed. Controls: redundancy, backups, DDoS protection, failover.",
          "Additional Principles: Authentication (proving identity), Authorization (what you can access), Non-repudiation (can't deny actions), Accountability (tracking who did what).",
          "Defense in Depth: Multiple layers of security controls. If one fails, others still protect. Like a castle with moat, walls, and guards.",
          "Least Privilege: Users get minimum access needed for their role. Reduces blast radius of compromised accounts."
        ],
        keyTerms: ["CIA Triad", "Confidentiality", "Integrity", "Availability", "Defense in Depth", "Least Privilege", "Non-repudiation"],
        relatedTopics: ["access-control", "cryptography", "risk-frameworks"],
        quiz: [
          {
            question: "A ransomware attack that encrypts all company files primarily violates which CIA principle?",
            options: ["Confidentiality", "Integrity", "Availability", "All three equally"],
            correct: 2,
            explanation: "While ransomware may also compromise confidentiality (data theft), its primary impact is on Availability — users cannot access their files and systems."
          }
        ]
      },
      {
        id: "threat-landscape",
        title: "Threat Landscape & Attack Types",
        difficulty: 1,
        timeToRead: "16 min",
        overview: "The threat landscape encompasses all potential threats to an organization including threat actors (who), attack vectors (how), and motivations (why). Understanding threats is the first step to defending against them.",
        pmPerspective: "As a PM, you'll manage projects responding to emerging threats. Understanding the threat landscape helps you prioritize projects, justify urgency to stakeholders, and assess whether your organization's defenses match the threats it faces. Threat intelligence feeds into project planning.",
        deepDive: [
          "Threat Actors: Nation-states (APTs, espionage), cybercriminals (financial), hacktivists (ideology), insiders (employees), script kiddies (low skill).",
          "Malware Types: Virus (attaches to files), Worm (self-replicating), Trojan (disguised), Ransomware (encrypts for payment), Spyware (surveillance), Rootkit (hides deep).",
          "Social Engineering: Phishing (email), Spear phishing (targeted), Whaling (executives), Vishing (voice), Smishing (SMS), Pretexting (fake scenario).",
          "Network Attacks: DDoS, Man-in-the-Middle, DNS poisoning, ARP spoofing, packet sniffing, session hijacking.",
          "Web Attacks: SQL injection, Cross-Site Scripting (XSS), CSRF, directory traversal, file inclusion.",
          "Supply Chain Attacks: Compromising software vendors/updates to reach their customers. SolarWinds, Kaseya examples."
        ],
        keyTerms: ["APT", "Malware", "Phishing", "DDoS", "Ransomware", "Zero-day", "Exploit", "Vulnerability", "Threat Actor", "Attack Vector"],
        relatedTopics: ["cia-triad", "incident-response", "network-attacks"],
        quiz: [
          {
            question: "What distinguishes an APT (Advanced Persistent Threat) from typical cybercrime?",
            options: ["APTs use more malware", "APTs are nation-state backed with long-term objectives", "APTs only target banks", "APTs are always automated"],
            correct: 1,
            explanation: "APTs are typically nation-state sponsored, well-funded, and maintain long-term persistent access to targets for espionage or strategic objectives."
          }
        ]
      },
      {
        id: "cryptography",
        title: "Cryptography & Encryption",
        difficulty: 2,
        timeToRead: "14 min",
        overview: "Cryptography transforms readable data (plaintext) into unreadable form (ciphertext) using mathematical algorithms and keys. It provides confidentiality, integrity, authentication, and non-repudiation — the mathematical backbone of digital security.",
        pmPerspective: "Encryption decisions affect performance, compliance, and interoperability. Projects involving data protection, secure communications, or compliance (GDPR, HIPAA) require encryption. Understanding symmetric vs asymmetric helps you assess vendor solutions and infrastructure requirements.",
        deepDive: [
          "Symmetric Encryption: Same key encrypts and decrypts. Fast. AES-256 (current standard), DES (obsolete), 3DES (legacy). Challenge: key distribution.",
          "Asymmetric Encryption: Public key encrypts, private key decrypts (or vice versa for signing). RSA, ECC. Slower but solves key distribution.",
          "Hashing: One-way function producing fixed-length output. SHA-256, MD5 (broken), bcrypt (passwords). Used for integrity verification.",
          "Digital Signatures: Hash + asymmetric encryption proves authenticity and integrity. Used in code signing, certificates, documents.",
          "PKI (Public Key Infrastructure): Certificate Authorities issue digital certificates binding public keys to identities. Enables HTTPS, email signing.",
          "TLS/SSL: Encrypts data in transit. TLS 1.3 is current standard. Protects web traffic, email, VPN connections."
        ],
        keyTerms: ["AES", "RSA", "SHA-256", "Hash", "PKI", "Certificate", "TLS", "Public Key", "Private Key", "Digital Signature"],
        relatedTopics: ["cia-triad", "protocols-ports", "compliance-frameworks"],
        quiz: [
          {
            question: "Why is symmetric encryption preferred for bulk data encryption over asymmetric?",
            options: ["It's more secure", "It's significantly faster", "It doesn't need keys", "It works offline only"],
            correct: 1,
            explanation: "Symmetric encryption is much faster (1000x+) than asymmetric, making it practical for encrypting large amounts of data. Asymmetric is used to securely exchange the symmetric key."
          }
        ]
      },
      {
        id: "access-control",
        title: "Authentication & Access Control",
        difficulty: 2,
        timeToRead: "13 min",
        overview: "Authentication verifies identity (who are you?). Authorization determines permissions (what can you do?). Access control models define how permissions are structured and enforced across an organization.",
        pmPerspective: "Identity and Access Management (IAM) projects are among the most complex in cybersecurity. They touch every user, system, and application. Understanding access control models helps you scope IAM projects, assess vendor solutions, and plan role-based access implementations.",
        deepDive: [
          "Authentication Factors: Something you know (password), something you have (token/phone), something you are (biometric). MFA combines 2+.",
          "MFA (Multi-Factor Authentication): Dramatically reduces account compromise. Push notifications, TOTP apps, hardware keys (YubiKey), SMS (weakest).",
          "Access Control Models: DAC (owner decides), MAC (system/labels decide), RBAC (role-based), ABAC (attribute-based).",
          "RBAC: Most common in enterprise. Users assigned to roles, roles have permissions. Simplifies management at scale.",
          "SSO (Single Sign-On): One login for multiple applications. SAML, OAuth 2.0, OpenID Connect protocols.",
          "Privileged Access Management (PAM): Extra controls for admin accounts. Just-in-time access, session recording, credential vaulting."
        ],
        keyTerms: ["MFA", "SSO", "RBAC", "ABAC", "OAuth", "SAML", "PAM", "IAM", "Least Privilege", "Zero Trust"],
        relatedTopics: ["cia-triad", "active-directory", "zero-trust"],
        quiz: [
          {
            question: "Which MFA method is considered the weakest and most vulnerable to interception?",
            options: ["Hardware security key", "Authenticator app (TOTP)", "SMS codes", "Biometric"],
            correct: 2,
            explanation: "SMS codes can be intercepted through SIM swapping, SS7 vulnerabilities, or social engineering of mobile carriers."
          }
        ]
      }
    ]
  },
  {
    id: "infrastructure",
    title: "Infrastructure Security",
    icon: "Server",
    color: "#8b5cf6",
    description: "Server hardening, Active Directory, endpoint protection, and data center security",
    topics: [
      {
        id: "server-hardening",
        title: "Server Hardening",
        difficulty: 2,
        timeToRead: "12 min",
        overview: "Server hardening is the process of reducing a server's attack surface by removing unnecessary services, applying security configurations, and implementing protective controls. A hardened server has minimal vulnerabilities exposed to attackers.",
        pmPerspective: "Hardening projects require coordination between system admins, security teams, and application owners. Each hardening step must be tested against application compatibility. CIS Benchmarks provide standardized checklists — useful for scoping work and measuring progress.",
        deepDive: [
          "Remove unnecessary services and software — every running service is a potential attack vector.",
          "Apply CIS Benchmarks — industry-standard hardening guides for Windows, Linux, cloud platforms.",
          "Patch management — regular updates for OS, applications, firmware. Automate where possible.",
          "Disable default accounts and change default passwords. Rename admin accounts.",
          "Configure host-based firewalls — restrict inbound/outbound traffic to required ports only.",
          "Enable logging and auditing — track all access attempts, changes, and administrative actions.",
          "File integrity monitoring — detect unauthorized changes to critical system files.",
          "Implement endpoint detection and response (EDR) for real-time threat detection."
        ],
        keyTerms: ["CIS Benchmark", "Patch Management", "Attack Surface", "EDR", "Baseline", "GPO", "Hardening Guide"],
        relatedTopics: ["operating-systems", "active-directory", "vulnerability-management"],
        quiz: [
          {
            question: "What is the primary purpose of CIS Benchmarks?",
            options: ["Network speed testing", "Standardized security configuration guidelines", "Employee training", "Budget planning"],
            correct: 1,
            explanation: "CIS Benchmarks provide consensus-based, best-practice security configuration guides for hardening systems, developed by the Center for Internet Security."
          }
        ]
      },
      {
        id: "active-directory",
        title: "Active Directory & Identity",
        difficulty: 2,
        timeToRead: "15 min",
        overview: "Active Directory (AD) is Microsoft's directory service for managing users, computers, and resources in enterprise networks. It's the backbone of identity management in most organizations and a primary target for attackers.",
        pmPerspective: "AD touches everything — user accounts, group policies, authentication, authorization. AD migration or security hardening projects are high-risk, high-impact. Understanding AD structure helps you assess project dependencies and coordinate with identity teams.",
        deepDive: [
          "Domain Controllers: Servers running AD DS (Active Directory Domain Services). Store the directory database. Must be highly protected.",
          "Organizational Units (OUs): Containers for organizing users, groups, computers. Group Policies (GPOs) apply to OUs.",
          "Group Policy Objects (GPOs): Centrally manage settings across all domain-joined machines. Password policies, software deployment, security settings.",
          "Kerberos Authentication: AD's authentication protocol. Ticket-based. Attacks: Kerberoasting, Golden Ticket, Pass-the-Hash.",
          "AD Attacks: Credential dumping, lateral movement, privilege escalation, DCSync, BloodHound for attack path mapping.",
          "Azure AD (Entra ID): Cloud-based identity service. Hybrid environments connect on-prem AD to cloud. Conditional Access policies."
        ],
        keyTerms: ["Domain Controller", "OU", "GPO", "Kerberos", "LDAP", "Forest", "Trust", "Entra ID", "Conditional Access"],
        relatedTopics: ["access-control", "server-hardening", "lateral-movement"],
        quiz: [
          {
            question: "Why is Active Directory considered a primary target for attackers?",
            options: ["It's easy to hack", "Compromising AD gives access to all domain resources and users", "It stores financial data", "It's always exposed to the internet"],
            correct: 1,
            explanation: "AD is the 'keys to the kingdom' — compromising a Domain Admin account gives an attacker control over every user, computer, and resource in the domain."
          }
        ]
      },
      {
        id: "endpoint-protection",
        title: "Endpoint Protection",
        difficulty: 2,
        timeToRead: "11 min",
        overview: "Endpoints (laptops, desktops, phones, servers) are the most common entry point for attacks. Endpoint protection encompasses antivirus, EDR, device management, and security policies that protect these devices.",
        pmPerspective: "Endpoint security rollouts affect every user in the organization. Projects involve agent deployment, policy configuration, exception management, and user communication. EDR tools generate alerts that feed into SOC operations — understanding this helps you connect security projects.",
        deepDive: [
          "Antivirus (AV): Signature-based detection of known malware. Legacy approach. High false negative rate for new threats.",
          "EDR (Endpoint Detection & Response): Behavioral analysis, real-time monitoring, automated response. CrowdStrike, SentinelOne, Microsoft Defender for Endpoint.",
          "XDR (Extended Detection & Response): Correlates data across endpoints, network, cloud, email for holistic threat detection.",
          "MDM/UEM (Mobile Device Management/Unified Endpoint Management): Manage and secure mobile devices. Enforce policies, remote wipe, app management.",
          "DLP (Data Loss Prevention): Prevents sensitive data from leaving the organization. Monitors email, USB, cloud uploads, printing.",
          "Application Whitelisting: Only approved applications can run. Strong control but high management overhead."
        ],
        keyTerms: ["EDR", "XDR", "MDM", "DLP", "Antivirus", "HIDS", "Agent", "Quarantine", "Behavioral Analysis"],
        relatedTopics: ["server-hardening", "incident-response", "soc-operations"],
        quiz: [
          {
            question: "What is the key advantage of EDR over traditional antivirus?",
            options: ["EDR is free", "EDR uses behavioral analysis to detect unknown threats", "EDR doesn't need updates", "EDR only works on servers"],
            correct: 1,
            explanation: "EDR goes beyond signature matching by analyzing behavior patterns, enabling detection of zero-day threats, fileless malware, and living-off-the-land attacks."
          }
        ]
      },
      {
        id: "data-center-security",
        title: "Data Center & Physical Security",
        difficulty: 1,
        timeToRead: "9 min",
        overview: "Physical security protects the hardware, facilities, and infrastructure that house digital assets. Data centers require multiple layers of physical controls including access restrictions, environmental protections, and surveillance.",
        pmPerspective: "Data center projects involve facilities teams, physical security, and IT. Considerations include power redundancy, cooling capacity, physical access controls, and compliance requirements. Understanding tiers helps you assess vendor SLAs and plan disaster recovery.",
        deepDive: [
          "Physical Access Controls: Mantraps, biometric readers, badge access, security guards, visitor logs.",
          "Environmental Controls: HVAC (cooling), fire suppression (FM-200, not water), humidity monitoring, hot/cold aisle containment.",
          "Power: UPS (Uninterruptible Power Supply), generators, redundant feeds, PDUs (Power Distribution Units).",
          "Data Center Tiers: Tier 1 (basic, 99.67% uptime) → Tier 4 (fault-tolerant, 99.995% uptime). Higher tier = more redundancy.",
          "Surveillance: CCTV, motion sensors, intrusion detection. Retention policies for footage.",
          "Destruction: Secure media disposal — degaussing, shredding, cryptographic erasure for SSDs."
        ],
        keyTerms: ["Mantrap", "UPS", "HVAC", "Tier", "Redundancy", "Hot Site", "Cold Site", "Degaussing"],
        relatedTopics: ["hardware-basics", "disaster-recovery", "compliance-frameworks"],
        quiz: [
          {
            question: "What is the minimum uptime guarantee for a Tier 4 data center?",
            options: ["99.67%", "99.74%", "99.98%", "99.995%"],
            correct: 3,
            explanation: "Tier 4 data centers are fully fault-tolerant with redundant components, providing 99.995% uptime (approximately 26 minutes of downtime per year)."
          }
        ]
      }
    ]
  },
  {
    id: "application-security",
    title: "Application Security",
    icon: "Code",
    color: "#f59e0b",
    description: "OWASP Top 10, secure SDLC, DevSecOps, API security, and web vulnerabilities",
    topics: [
      {
        id: "owasp-top10",
        title: "OWASP Top 10",
        difficulty: 2,
        timeToRead: "16 min",
        overview: "The OWASP Top 10 is the industry-standard list of the most critical web application security risks. Updated periodically, it guides developers and security teams on the most common vulnerabilities to address.",
        pmPerspective: "When your application security team reports findings, they often reference OWASP categories. Understanding the Top 10 helps you prioritize remediation, assess severity, and communicate risk to stakeholders. It's also a common compliance requirement.",
        deepDive: [
          "A01 Broken Access Control: Users accessing unauthorized functions/data. Most common vulnerability. Fix: enforce server-side access checks.",
          "A02 Cryptographic Failures: Sensitive data exposed due to weak/missing encryption. Fix: encrypt data at rest and in transit, use strong algorithms.",
          "A03 Injection: Untrusted data sent to interpreters (SQL, OS, LDAP). Fix: parameterized queries, input validation, ORM.",
          "A04 Insecure Design: Flaws in architecture/design that can't be fixed by implementation. Fix: threat modeling, secure design patterns.",
          "A05 Security Misconfiguration: Default configs, unnecessary features, missing hardening. Fix: automated config management, minimal installs.",
          "A06 Vulnerable Components: Using libraries/frameworks with known vulnerabilities. Fix: SCA tools, dependency updates, SBOM.",
          "A07 Authentication Failures: Broken auth mechanisms allowing account compromise. Fix: MFA, strong password policies, rate limiting.",
          "A08 Data Integrity Failures: Code/data without integrity verification. Includes insecure deserialization, unsigned updates.",
          "A09 Logging & Monitoring Failures: Insufficient logging prevents breach detection. Fix: comprehensive logging, alerting, SIEM integration.",
          "A10 Server-Side Request Forgery (SSRF): Server makes requests to unintended locations. Fix: input validation, network segmentation."
        ],
        keyTerms: ["OWASP", "Injection", "XSS", "CSRF", "SSRF", "Broken Access Control", "SBOM", "SCA"],
        relatedTopics: ["secure-sdlc", "web-vulnerabilities", "threat-modeling"],
        quiz: [
          {
            question: "According to the latest OWASP Top 10, what is the #1 most common web application vulnerability?",
            options: ["SQL Injection", "Cross-Site Scripting", "Broken Access Control", "Cryptographic Failures"],
            correct: 2,
            explanation: "Broken Access Control moved to #1 in the 2021 OWASP Top 10, reflecting that 94% of applications tested had some form of broken access control."
          }
        ]
      },
      {
        id: "secure-sdlc",
        title: "Secure SDLC & DevSecOps",
        difficulty: 2,
        timeToRead: "13 min",
        overview: "Secure SDLC integrates security practices into every phase of software development. DevSecOps automates security testing within CI/CD pipelines, shifting security 'left' to catch issues earlier when they're cheaper to fix.",
        pmPerspective: "This directly impacts how you manage application development projects. Security gates at each phase mean additional time and tooling in your project plans. Understanding where security fits in the pipeline helps you set realistic timelines and avoid last-minute security blockers before release.",
        deepDive: [
          "Requirements Phase: Security requirements, compliance needs, data classification, threat modeling.",
          "Design Phase: Secure architecture review, trust boundaries, attack surface analysis.",
          "Development Phase: Secure coding standards, SAST (Static Application Security Testing), code review.",
          "Testing Phase: DAST (Dynamic testing), penetration testing, fuzzing, security regression testing.",
          "Deployment Phase: Configuration review, secrets management, infrastructure as code security scanning.",
          "Operations Phase: Runtime protection (RASP), monitoring, vulnerability management, incident response.",
          "CI/CD Security: Automated SAST/DAST in pipelines, container scanning, dependency checking, secrets detection."
        ],
        keyTerms: ["SDLC", "DevSecOps", "SAST", "DAST", "CI/CD", "Shift Left", "Threat Modeling", "RASP", "Pipeline"],
        relatedTopics: ["owasp-top10", "vulnerability-management", "cloud-security-arch"],
        quiz: [
          {
            question: "What does 'shifting left' mean in the context of DevSecOps?",
            options: ["Moving to open-source tools", "Integrating security earlier in the development lifecycle", "Reducing the development team size", "Using left-aligned code formatting"],
            correct: 1,
            explanation: "Shifting left means moving security testing and practices earlier (to the 'left') in the development timeline, catching vulnerabilities when they're cheaper and easier to fix."
          }
        ]
      },
      {
        id: "api-security",
        title: "API Security",
        difficulty: 2,
        timeToRead: "11 min",
        overview: "APIs (Application Programming Interfaces) are the connective tissue of modern applications. They expose functionality and data between services, making them high-value targets. The OWASP API Security Top 10 addresses API-specific risks.",
        pmPerspective: "Modern applications are API-driven. When your teams build or integrate APIs, security must be designed in from the start. API security projects involve authentication standards (OAuth), rate limiting, input validation, and API gateway implementation.",
        deepDive: [
          "API Types: REST (most common, HTTP-based), GraphQL (flexible queries), SOAP (legacy, XML-based), gRPC (high-performance).",
          "Authentication: API keys (simple but weak), OAuth 2.0 (delegated access), JWT tokens (stateless auth).",
          "Common Vulnerabilities: Broken Object Level Authorization (BOLA), excessive data exposure, lack of rate limiting, injection.",
          "API Gateway: Central point for authentication, rate limiting, logging, transformation. Kong, AWS API Gateway, Apigee.",
          "Rate Limiting & Throttling: Prevent abuse and DDoS. Implement per-user, per-IP, and per-endpoint limits.",
          "API Documentation & Discovery: OpenAPI/Swagger specs. Shadow APIs (undocumented) are major risks."
        ],
        keyTerms: ["REST", "GraphQL", "OAuth", "JWT", "API Gateway", "Rate Limiting", "BOLA", "Swagger", "Endpoint"],
        relatedTopics: ["owasp-top10", "access-control", "cloud-security-arch"],
        quiz: [
          {
            question: "What is BOLA in the context of API security?",
            options: ["A type of encryption", "Broken Object Level Authorization — accessing other users' data by manipulating IDs", "A logging framework", "A rate limiting algorithm"],
            correct: 1,
            explanation: "BOLA (Broken Object Level Authorization) is the #1 API vulnerability where attackers manipulate object IDs in API requests to access other users' data."
          }
        ]
      }
    ]
  },
  {
    id: "security-operations",
    title: "Security Operations",
    icon: "Eye",
    color: "#10b981",
    description: "SOC operations, SIEM, threat detection, incident response, and forensics",
    topics: [
      {
        id: "soc-operations",
        title: "SOC Operations & Structure",
        difficulty: 2,
        timeToRead: "13 min",
        overview: "A Security Operations Center (SOC) is the centralized team responsible for monitoring, detecting, analyzing, and responding to cybersecurity incidents 24/7. It combines people, processes, and technology to protect organizational assets.",
        pmPerspective: "You may manage projects that build, enhance, or optimize SOC capabilities. Understanding SOC tiers, workflows, and tooling helps you scope projects accurately — from SIEM deployments to playbook development to staffing models.",
        deepDive: [
          "SOC Tiers: Tier 1 (alert triage, initial analysis), Tier 2 (deep investigation, incident handling), Tier 3 (threat hunting, advanced forensics, engineering).",
          "SOC Functions: Continuous monitoring, alert triage, incident response, threat intelligence, vulnerability management, compliance reporting.",
          "Key Metrics: MTTD (Mean Time to Detect), MTTR (Mean Time to Respond), false positive rate, alert volume, incidents closed.",
          "SOC Models: In-house (full control, expensive), MSSP (outsourced, cost-effective), Hybrid (mix of both).",
          "Shift Coverage: 24/7/365 requires multiple shifts. Follow-the-sun model for global organizations.",
          "SOC Maturity: Level 1 (reactive) → Level 5 (optimizing). Most organizations are Level 2-3."
        ],
        keyTerms: ["SOC", "MSSP", "MTTD", "MTTR", "Triage", "Playbook", "Runbook", "Alert Fatigue", "Tier 1/2/3"],
        relatedTopics: ["siem-logging", "incident-response", "threat-hunting"],
        quiz: [
          {
            question: "What is the primary responsibility of a SOC Tier 1 analyst?",
            options: ["Threat hunting", "Alert triage and initial analysis", "Malware reverse engineering", "Security architecture design"],
            correct: 1,
            explanation: "Tier 1 analysts handle initial alert triage — reviewing alerts, determining if they're true or false positives, and escalating confirmed incidents to Tier 2."
          }
        ]
      },
      {
        id: "siem-logging",
        title: "SIEM & Log Management",
        difficulty: 2,
        timeToRead: "14 min",
        overview: "SIEM (Security Information and Event Management) systems collect, correlate, and analyze log data from across the organization to detect threats. Effective logging is the foundation of all security monitoring and incident investigation.",
        pmPerspective: "SIEM projects are complex, multi-phase initiatives involving log source onboarding, rule development, tuning, and integration. They're never 'done' — continuous improvement is required. Understanding SIEM helps you manage expectations and plan iterative delivery.",
        deepDive: [
          "Log Sources: Firewalls, servers, endpoints, applications, cloud services, authentication systems, network devices.",
          "SIEM Platforms: Splunk, Microsoft Sentinel, IBM QRadar, Elastic SIEM, Google Chronicle, LogRhythm.",
          "Correlation Rules: Logic that identifies suspicious patterns across multiple log sources. E.g., 'failed login from Country X followed by successful login = potential compromise.'",
          "Use Cases: Brute force detection, impossible travel, privilege escalation, data exfiltration, lateral movement.",
          "SOAR (Security Orchestration, Automation, Response): Automates repetitive SOC tasks. Playbooks trigger automatic responses to common alerts.",
          "Log Retention: Compliance requirements dictate how long logs must be kept. Typically 90 days hot, 1 year warm, 7 years cold for regulated industries."
        ],
        keyTerms: ["SIEM", "SOAR", "Correlation", "Use Case", "Log Source", "Parser", "Alert", "Dashboard", "Retention"],
        relatedTopics: ["soc-operations", "incident-response", "compliance-frameworks"],
        quiz: [
          {
            question: "What does SOAR add on top of SIEM capabilities?",
            options: ["Better log storage", "Automated response and orchestration of security workflows", "Faster network speeds", "User authentication"],
            correct: 1,
            explanation: "SOAR automates repetitive security tasks through playbooks, orchestrates tools to work together, and enables faster response to common incidents without manual intervention."
          }
        ]
      },
      {
        id: "incident-response",
        title: "Incident Response",
        difficulty: 2,
        timeToRead: "15 min",
        overview: "Incident Response (IR) is the structured approach to handling security breaches and cyberattacks. The NIST IR framework defines four phases: Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Activity.",
        pmPerspective: "You may lead IR improvement projects or coordinate during active incidents. Understanding the IR lifecycle helps you develop realistic response plans, conduct tabletop exercises, and manage the chaos of a real incident with clear roles and communication channels.",
        deepDive: [
          "Phase 1 - Preparation: IR plan, team roles, communication templates, tools ready, training, tabletop exercises.",
          "Phase 2 - Detection & Analysis: Identify indicators of compromise (IoCs), determine scope, classify severity, document timeline.",
          "Phase 3 - Containment: Short-term (isolate affected systems) and long-term (patch, rebuild). Balance between stopping spread and preserving evidence.",
          "Phase 4 - Eradication: Remove the threat completely. Identify root cause. Ensure no persistence mechanisms remain.",
          "Phase 5 - Recovery: Restore systems from clean backups. Monitor closely for re-infection. Gradual return to normal operations.",
          "Phase 6 - Lessons Learned: Post-incident review within 2 weeks. Document what worked, what failed, improvements needed. Update playbooks."
        ],
        keyTerms: ["IR Plan", "IoC", "Containment", "Eradication", "Recovery", "Tabletop Exercise", "Playbook", "Severity", "Escalation"],
        relatedTopics: ["soc-operations", "digital-forensics", "threat-landscape"],
        quiz: [
          {
            question: "Why is the 'Lessons Learned' phase critical after an incident?",
            options: ["To assign blame", "To improve future response and prevent recurrence", "To satisfy legal requirements only", "To reduce the security budget"],
            correct: 1,
            explanation: "Lessons Learned identifies gaps in detection, response, and prevention — driving improvements to playbooks, tools, training, and controls to prevent similar incidents."
          }
        ]
      },
      {
        id: "threat-hunting",
        title: "Threat Hunting & Intelligence",
        difficulty: 3,
        timeToRead: "12 min",
        overview: "Threat hunting is the proactive search for threats that have evaded existing security controls. Unlike reactive alerting, hunters form hypotheses and actively look for indicators of compromise. Threat intelligence provides context about adversaries, their tactics, and indicators.",
        pmPerspective: "Threat hunting programs require skilled analysts, dedicated time, and proper tooling. Projects to establish hunting capabilities involve defining hypotheses, building data pipelines, and measuring effectiveness. Threat intelligence feeds into multiple security functions you may oversee.",
        deepDive: [
          "Hunting Hypothesis: Start with an assumption (e.g., 'An attacker may be using PowerShell for lateral movement') and search for evidence.",
          "MITRE ATT&CK Framework: Knowledge base of adversary tactics and techniques. Maps real-world attacks to detectable behaviors. 14 tactics, hundreds of techniques.",
          "Threat Intelligence Types: Strategic (executive-level trends), Tactical (TTPs for defenders), Operational (specific campaigns), Technical (IoCs — IPs, hashes, domains).",
          "Intelligence Sources: Open source (OSINT), commercial feeds, ISACs (industry sharing), government (CISA), dark web monitoring.",
          "Hunting Tools: EDR telemetry, SIEM queries, network traffic analysis, memory forensics, YARA rules.",
          "Cyber Kill Chain: Lockheed Martin model — Reconnaissance → Weaponization → Delivery → Exploitation → Installation → C2 → Actions on Objectives."
        ],
        keyTerms: ["MITRE ATT&CK", "Kill Chain", "TTP", "IoC", "OSINT", "Hypothesis", "YARA", "C2", "Lateral Movement"],
        relatedTopics: ["soc-operations", "siem-logging", "incident-response"],
        quiz: [
          {
            question: "What does the MITRE ATT&CK framework primarily document?",
            options: ["Software vulnerabilities", "Adversary tactics, techniques, and procedures based on real-world observations", "Compliance requirements", "Network protocols"],
            correct: 1,
            explanation: "MITRE ATT&CK catalogs real-world adversary behaviors organized by tactics (the 'why') and techniques (the 'how'), enabling defenders to understand and detect specific attack patterns."
          }
        ]
      }
    ]
  },
  {
    id: "grc",
    title: "GRC",
    icon: "Scale",
    color: "#6366f1",
    description: "Governance, risk management, compliance frameworks, policies, and audits",
    topics: [
      {
        id: "risk-frameworks",
        title: "Risk Management Frameworks",
        difficulty: 2,
        timeToRead: "14 min",
        overview: "Risk management identifies, assesses, and prioritizes risks, then applies resources to minimize their impact. Frameworks like NIST RMF, ISO 31000, and FAIR provide structured approaches to managing cybersecurity risk.",
        pmPerspective: "Risk management is central to your role. Every project decision involves risk trade-offs. Understanding frameworks helps you build risk registers, conduct risk assessments, communicate risk to executives in business terms, and prioritize security investments.",
        deepDive: [
          "Risk Formula: Risk = Threat × Vulnerability × Impact. Or simplified: Likelihood × Impact.",
          "NIST Risk Management Framework (RMF): Categorize → Select → Implement → Assess → Authorize → Monitor. Used by US government.",
          "ISO 31000: International risk management standard. Principles, framework, and process for any type of risk.",
          "FAIR (Factor Analysis of Information Risk): Quantitative risk model. Translates risk into financial terms executives understand.",
          "Risk Treatment: Accept (tolerate), Mitigate (reduce), Transfer (insurance), Avoid (eliminate the activity).",
          "Risk Register: Document listing identified risks, likelihood, impact, owner, treatment plan, status. Living document updated regularly."
        ],
        keyTerms: ["Risk Register", "Likelihood", "Impact", "Residual Risk", "Risk Appetite", "Risk Treatment", "FAIR", "Quantitative", "Qualitative"],
        relatedTopics: ["compliance-frameworks", "security-metrics", "cia-triad"],
        quiz: [
          {
            question: "What are the four options for treating an identified risk?",
            options: ["Block, Allow, Monitor, Ignore", "Accept, Mitigate, Transfer, Avoid", "Encrypt, Backup, Patch, Scan", "Detect, Prevent, Respond, Recover"],
            correct: 1,
            explanation: "The four risk treatment options are: Accept (tolerate it), Mitigate (reduce likelihood/impact), Transfer (shift to third party like insurance), Avoid (eliminate the risk source)."
          }
        ]
      },
      {
        id: "compliance-frameworks",
        title: "Compliance Frameworks & Standards",
        difficulty: 2,
        timeToRead: "16 min",
        overview: "Compliance frameworks provide structured sets of controls and requirements that organizations must implement. NIST CSF, ISO 27001, CIS Controls, SOC 2, and PCI DSS are among the most widely adopted in cybersecurity.",
        pmPerspective: "Compliance projects are a major part of cybersecurity PM work. You'll manage gap assessments, control implementations, audit preparations, and certification maintenance. Understanding framework differences helps you advise on which applies and plan implementation roadmaps.",
        deepDive: [
          "NIST Cybersecurity Framework (CSF) 2.0: Six functions — Govern, Identify, Protect, Detect, Respond, Recover. Flexible, widely adopted, not mandatory (except US federal).",
          "ISO 27001: International standard for Information Security Management Systems (ISMS). Requires certification audit. Annex A has 93 controls.",
          "CIS Controls: 18 prioritized security controls. Implementation Groups (IG1, IG2, IG3) based on organization size/risk.",
          "SOC 2: Trust Service Criteria — Security, Availability, Processing Integrity, Confidentiality, Privacy. Common for SaaS vendors.",
          "PCI DSS: Payment Card Industry standard. 12 requirements for handling credit card data. Mandatory for merchants/processors.",
          "GDPR: EU data protection regulation. Privacy by design, data subject rights, 72-hour breach notification, heavy fines (4% global revenue)."
        ],
        keyTerms: ["NIST CSF", "ISO 27001", "CIS Controls", "SOC 2", "PCI DSS", "GDPR", "ISMS", "Control", "Audit", "Gap Assessment"],
        relatedTopics: ["risk-frameworks", "security-policies", "data-privacy"],
        quiz: [
          {
            question: "Which framework uses the six functions: Govern, Identify, Protect, Detect, Respond, Recover?",
            options: ["ISO 27001", "CIS Controls", "NIST CSF 2.0", "PCI DSS"],
            correct: 2,
            explanation: "NIST Cybersecurity Framework 2.0 (2024) added 'Govern' as a sixth function to the original five, emphasizing cybersecurity governance and risk management strategy."
          }
        ]
      },
      {
        id: "security-policies",
        title: "Security Policies & Governance",
        difficulty: 2,
        timeToRead: "11 min",
        overview: "Security policies are formal documents that define an organization's security requirements, acceptable behaviors, and enforcement mechanisms. They form the foundation of a security program and enable consistent decision-making.",
        pmPerspective: "Policy development and review projects require stakeholder buy-in across the organization. You'll coordinate between legal, HR, IT, and security teams. Understanding policy hierarchy helps you scope governance projects and ensure nothing falls through the cracks.",
        deepDive: [
          "Policy Hierarchy: Policies (high-level, mandatory) → Standards (specific requirements) → Procedures (step-by-step how-to) → Guidelines (recommendations).",
          "Key Policies: Acceptable Use Policy (AUP), Information Security Policy, Access Control Policy, Incident Response Policy, Data Classification Policy, BYOD Policy.",
          "Policy Lifecycle: Draft → Review → Approve → Publish → Train → Enforce → Review (annual cycle).",
          "Data Classification: Public, Internal, Confidential, Restricted/Secret. Each level has handling requirements.",
          "Security Awareness Training: Required by most frameworks. Annual training + phishing simulations. Measure click rates and reporting rates.",
          "Board/Executive Reporting: Translate technical metrics into business risk language. Use dashboards, risk heat maps, trend analysis."
        ],
        keyTerms: ["Policy", "Standard", "Procedure", "Guideline", "AUP", "Data Classification", "Governance", "RACI", "Stakeholder"],
        relatedTopics: ["compliance-frameworks", "risk-frameworks", "security-metrics"],
        quiz: [
          {
            question: "In the policy hierarchy, what is the correct order from highest to lowest level?",
            options: ["Guidelines → Standards → Policies → Procedures", "Policies → Standards → Procedures → Guidelines", "Standards → Policies → Guidelines → Procedures", "Procedures → Standards → Policies → Guidelines"],
            correct: 1,
            explanation: "Policies (mandatory, high-level) → Standards (specific requirements) → Procedures (step-by-step instructions) → Guidelines (optional recommendations)."
          }
        ]
      }
    ]
  },
  {
    id: "cloud-security",
    title: "Cloud Security",
    icon: "Cloud",
    color: "#0ea5e9",
    description: "Cloud models, shared responsibility, IAM, and cloud-native security",
    topics: [
      {
        id: "cloud-models",
        title: "Cloud Service & Deployment Models",
        difficulty: 1,
        timeToRead: "10 min",
        overview: "Cloud computing delivers IT resources over the internet. Service models (IaaS, PaaS, SaaS) define what the provider manages vs. what you manage. Deployment models (public, private, hybrid) define where infrastructure lives.",
        pmPerspective: "Cloud migration and cloud security projects require understanding the shared responsibility model. The service model determines your security obligations. IaaS = you secure almost everything. SaaS = provider handles most. This directly impacts project scope and team responsibilities.",
        deepDive: [
          "IaaS (Infrastructure as a Service): Provider gives VMs, storage, networking. You manage OS, apps, data. Examples: AWS EC2, Azure VMs, GCP Compute.",
          "PaaS (Platform as a Service): Provider manages OS and runtime. You manage applications and data. Examples: AWS Elastic Beanstalk, Azure App Service, Heroku.",
          "SaaS (Software as a Service): Provider manages everything. You manage data and user access. Examples: Microsoft 365, Salesforce, Google Workspace.",
          "Public Cloud: Shared infrastructure, multi-tenant. Cost-effective, scalable. AWS, Azure, GCP.",
          "Private Cloud: Dedicated infrastructure for one organization. More control, higher cost. On-premises or hosted.",
          "Hybrid Cloud: Mix of public and private. Sensitive data on-prem, scalable workloads in public cloud. Most enterprises use hybrid."
        ],
        keyTerms: ["IaaS", "PaaS", "SaaS", "Public Cloud", "Private Cloud", "Hybrid", "Multi-tenant", "Shared Responsibility"],
        relatedTopics: ["cloud-iam", "cloud-security-arch", "virtualization"],
        quiz: [
          {
            question: "In the IaaS model, who is responsible for patching the operating system?",
            options: ["The cloud provider", "The customer", "Both equally", "Neither — it's automated"],
            correct: 1,
            explanation: "In IaaS, the customer is responsible for everything from the OS up — including patching, application security, and data protection. The provider manages the physical infrastructure."
          }
        ]
      },
      {
        id: "cloud-iam",
        title: "Cloud IAM & Security Controls",
        difficulty: 2,
        timeToRead: "13 min",
        overview: "Cloud Identity and Access Management controls who can access cloud resources and what they can do. Cloud-native security controls include encryption, network security groups, logging, and configuration management.",
        pmPerspective: "IAM misconfigurations are the #1 cause of cloud breaches. Cloud security projects often start with IAM hardening. Understanding cloud IAM helps you assess risks in cloud migration projects and ensure proper access governance is implemented.",
        deepDive: [
          "IAM Principals: Users, groups, roles, service accounts. Follow least privilege — grant minimum permissions needed.",
          "IAM Policies: JSON documents defining allowed/denied actions on resources. AWS IAM policies, Azure RBAC, GCP IAM.",
          "MFA for Cloud: Enforce MFA for all human users, especially admins. Use hardware keys for root/break-glass accounts.",
          "Service Accounts: Non-human identities for applications. Rotate keys, use short-lived tokens, avoid long-lived credentials.",
          "Security Groups / NSGs: Virtual firewalls controlling inbound/outbound traffic to cloud resources.",
          "Cloud Security Posture Management (CSPM): Continuously monitors cloud configurations for misconfigurations and compliance violations."
        ],
        keyTerms: ["IAM", "Policy", "Role", "Service Account", "Security Group", "CSPM", "Least Privilege", "Root Account"],
        relatedTopics: ["access-control", "cloud-models", "compliance-frameworks"],
        quiz: [
          {
            question: "What is the #1 cause of cloud security breaches?",
            options: ["Zero-day exploits", "DDoS attacks", "IAM misconfigurations", "Physical theft"],
            correct: 2,
            explanation: "IAM misconfigurations (overly permissive policies, exposed credentials, lack of MFA) are consistently the leading cause of cloud breaches."
          }
        ]
      },
      {
        id: "cloud-security-arch",
        title: "Cloud Security Architecture",
        difficulty: 3,
        timeToRead: "14 min",
        overview: "Cloud security architecture encompasses the design patterns, controls, and best practices for building secure cloud environments. It includes network design, data protection, workload security, and governance at scale.",
        pmPerspective: "Cloud architecture projects are complex, multi-team efforts. Understanding cloud security architecture helps you coordinate between cloud engineers, security teams, and compliance — ensuring security is built in from the start rather than bolted on after.",
        deepDive: [
          "Landing Zone: Pre-configured, secure cloud environment with networking, IAM, logging, and guardrails. Foundation for all workloads.",
          "Network Architecture: VPCs/VNets, subnets (public/private), NAT gateways, transit gateways, peering, PrivateLink.",
          "Data Protection: Encryption at rest (KMS managed keys), encryption in transit (TLS), key rotation, data residency requirements.",
          "Workload Protection: Container security, serverless security, VM hardening, runtime protection, image scanning.",
          "Logging & Monitoring: CloudTrail/Activity Log, VPC Flow Logs, GuardDuty/Defender, centralized logging to SIEM.",
          "Infrastructure as Code (IaC) Security: Scan Terraform/CloudFormation for misconfigurations before deployment. Checkov, tfsec, Bridgecrew."
        ],
        keyTerms: ["Landing Zone", "VPC", "KMS", "IaC", "GuardDuty", "CloudTrail", "CWPP", "CNAPP"],
        relatedTopics: ["cloud-iam", "cloud-models", "secure-sdlc"],
        quiz: [
          {
            question: "What is a 'Landing Zone' in cloud architecture?",
            options: ["A backup data center", "A pre-configured secure foundation environment with guardrails", "A type of load balancer", "A DNS configuration"],
            correct: 1,
            explanation: "A Landing Zone is a pre-built, secure cloud environment with networking, IAM, logging, and governance guardrails — providing a consistent, secure foundation for deploying workloads."
          }
        ]
      }
    ]
  },
  {
    id: "scripting",
    title: "Scripting & Automation",
    icon: "Terminal",
    color: "#84cc16",
    description: "Python, PowerShell, Bash scripting for security automation and operations",
    topics: [
      {
        id: "python-security",
        title: "Python for Security",
        difficulty: 2,
        timeToRead: "12 min",
        overview: "Python is the most popular language in cybersecurity due to its readability, extensive libraries, and versatility. It's used for automation, tool development, data analysis, and scripting across all security domains.",
        pmPerspective: "When your team says they're 'scripting a solution,' they're likely using Python. Understanding its capabilities helps you assess automation proposals, estimate development effort, and recognize when custom tooling vs. commercial products makes sense.",
        deepDive: [
          "Security Libraries: Scapy (packet manipulation), Requests (HTTP), Beautiful Soup (web scraping), Paramiko (SSH), Cryptography (encryption).",
          "Automation Use Cases: Log parsing, IoC extraction, API integration, report generation, vulnerability scanning automation.",
          "Network Security: Port scanning, packet analysis, DNS enumeration, network mapping, traffic generation for testing.",
          "Forensics: File analysis, metadata extraction, timeline generation, memory dump analysis, hash calculation.",
          "SIEM Integration: Pull/push data via APIs, automate alert enrichment, create custom dashboards.",
          "Malware Analysis: Static analysis (string extraction, PE parsing), sandbox automation, YARA rule testing."
        ],
        keyTerms: ["Python", "Script", "Library", "API", "Automation", "Parsing", "Module", "Virtual Environment"],
        relatedTopics: ["powershell-security", "bash-scripting", "soc-operations"],
        quiz: [
          {
            question: "Which Python library is commonly used for network packet manipulation and analysis?",
            options: ["Requests", "Scapy", "Flask", "Pandas"],
            correct: 1,
            explanation: "Scapy is a powerful Python library for crafting, sending, sniffing, and analyzing network packets — widely used in penetration testing and network security research."
          }
        ]
      },
      {
        id: "powershell-security",
        title: "PowerShell for Security",
        difficulty: 2,
        timeToRead: "11 min",
        overview: "PowerShell is Microsoft's task automation framework built into Windows. It's essential for managing Windows environments, Active Directory, and Microsoft 365. It's also heavily used by attackers, making PowerShell knowledge critical for both offense and defense.",
        pmPerspective: "PowerShell scripts automate Windows administration tasks your infrastructure team handles daily. Understanding PowerShell's dual nature (admin tool AND attack tool) helps you appreciate why PowerShell logging and restrictions are important security controls in your projects.",
        deepDive: [
          "AD Management: Create/modify users, query group memberships, audit permissions, enforce policies at scale.",
          "Security Auditing: Check configurations, find stale accounts, identify excessive permissions, compliance reporting.",
          "Incident Response: Collect forensic artifacts, check running processes, review event logs, isolate machines.",
          "Offensive Use: Attackers use PowerShell for fileless malware, credential theft (Mimikatz), lateral movement. 'Living off the land.'",
          "Defense: Enable Script Block Logging, Module Logging, Transcription. Constrained Language Mode. AMSI (Anti-Malware Scan Interface).",
          "Microsoft 365 Administration: Manage Exchange Online, SharePoint, Teams, Azure AD via PowerShell modules."
        ],
        keyTerms: ["PowerShell", "Cmdlet", "Module", "Pipeline", "Script Block Logging", "AMSI", "Execution Policy", "Remoting"],
        relatedTopics: ["python-security", "active-directory", "incident-response"],
        quiz: [
          {
            question: "Why is PowerShell logging critical for security?",
            options: ["It speeds up scripts", "Attackers frequently use PowerShell for fileless attacks, and logs capture their commands", "It's required by Microsoft", "It reduces memory usage"],
            correct: 1,
            explanation: "Attackers abuse PowerShell for 'living off the land' attacks. Script Block Logging captures the actual code executed, providing crucial forensic evidence even for obfuscated commands."
          }
        ]
      },
      {
        id: "bash-scripting",
        title: "Bash & Linux Security",
        difficulty: 2,
        timeToRead: "10 min",
        overview: "Bash is the default shell on most Linux systems. Since Linux runs the majority of servers, cloud infrastructure, and security tools, Bash scripting is essential for system administration, automation, and security operations.",
        pmPerspective: "Your infrastructure and security teams use Bash daily for server management, log analysis, and tool automation. Understanding basic Bash concepts helps you follow technical discussions about Linux server issues, deployment scripts, and security hardening.",
        deepDive: [
          "File Permissions: chmod, chown. Read/Write/Execute for Owner/Group/Others. Misconfigured permissions = security vulnerability.",
          "User Management: useradd, passwd, sudo configuration. Root access control. /etc/passwd, /etc/shadow.",
          "Log Analysis: grep, awk, sed for parsing logs. /var/log/ directory. journalctl for systemd logs.",
          "Network Commands: netstat/ss (connections), tcpdump (packet capture), nmap (scanning), curl (HTTP requests), dig (DNS).",
          "Automation: Cron jobs for scheduled tasks. Bash scripts for backup, monitoring, alerting, report generation.",
          "Security Tools: Most security tools run on Linux — Wireshark, Nmap, Metasploit, Burp Suite, OSSEC, Snort."
        ],
        keyTerms: ["Bash", "Shell", "chmod", "grep", "awk", "cron", "sudo", "root", "pipe", "redirect"],
        relatedTopics: ["python-security", "operating-systems", "server-hardening"],
        quiz: [
          {
            question: "What does the command 'chmod 700 file.sh' do?",
            options: ["Deletes the file", "Gives full permissions to owner only, none to group/others", "Makes the file read-only", "Shares the file with everyone"],
            correct: 1,
            explanation: "chmod 700 sets rwx (read/write/execute) for the owner and no permissions (---) for group and others, restricting access to the file owner only."
          }
        ]
      }
    ]
  }
];

// Port & Protocol Cheat Sheet
export const portCheatSheet = [
  { port: 20, protocol: "FTP Data", tcp: true, description: "File Transfer Protocol - data transfer" },
  { port: 21, protocol: "FTP Control", tcp: true, description: "File Transfer Protocol - commands" },
  { port: 22, protocol: "SSH/SFTP", tcp: true, description: "Secure Shell / Secure File Transfer" },
  { port: 23, protocol: "Telnet", tcp: true, description: "Unencrypted remote access (INSECURE)" },
  { port: 25, protocol: "SMTP", tcp: true, description: "Simple Mail Transfer Protocol" },
  { port: 53, protocol: "DNS", tcp: true, description: "Domain Name System (TCP & UDP)" },
  { port: 67, protocol: "DHCP Server", tcp: false, description: "Dynamic Host Configuration (server)" },
  { port: 68, protocol: "DHCP Client", tcp: false, description: "Dynamic Host Configuration (client)" },
  { port: 80, protocol: "HTTP", tcp: true, description: "Hypertext Transfer Protocol (unencrypted)" },
  { port: 110, protocol: "POP3", tcp: true, description: "Post Office Protocol v3" },
  { port: 143, protocol: "IMAP", tcp: true, description: "Internet Message Access Protocol" },
  { port: 161, protocol: "SNMP", tcp: false, description: "Simple Network Management Protocol" },
  { port: 389, protocol: "LDAP", tcp: true, description: "Lightweight Directory Access Protocol" },
  { port: 443, protocol: "HTTPS", tcp: true, description: "HTTP Secure (TLS encrypted)" },
  { port: 445, protocol: "SMB", tcp: true, description: "Server Message Block (file sharing)" },
  { port: 587, protocol: "SMTP (TLS)", tcp: true, description: "SMTP with STARTTLS encryption" },
  { port: 636, protocol: "LDAPS", tcp: true, description: "LDAP over SSL/TLS" },
  { port: 993, protocol: "IMAPS", tcp: true, description: "IMAP over SSL/TLS" },
  { port: 995, protocol: "POP3S", tcp: true, description: "POP3 over SSL/TLS" },
  { port: 1433, protocol: "MSSQL", tcp: true, description: "Microsoft SQL Server" },
  { port: 1521, protocol: "Oracle DB", tcp: true, description: "Oracle Database" },
  { port: 3306, protocol: "MySQL", tcp: true, description: "MySQL Database" },
  { port: 3389, protocol: "RDP", tcp: true, description: "Remote Desktop Protocol" },
  { port: 5432, protocol: "PostgreSQL", tcp: true, description: "PostgreSQL Database" },
  { port: 5900, protocol: "VNC", tcp: true, description: "Virtual Network Computing" },
  { port: 8080, protocol: "HTTP Alt", tcp: true, description: "Alternative HTTP / Proxy" },
  { port: 8443, protocol: "HTTPS Alt", tcp: true, description: "Alternative HTTPS" }
];

// Framework Comparison
export const frameworkComparison = [
  { framework: "NIST CSF 2.0", scope: "All organizations", approach: "Risk-based, voluntary", structure: "6 Functions, Categories, Subcategories", bestFor: "Flexible cybersecurity program structure" },
  { framework: "ISO 27001", scope: "International", approach: "Certification-based ISMS", structure: "93 controls in 4 themes", bestFor: "International recognition, customer trust" },
  { framework: "CIS Controls", scope: "All organizations", approach: "Prioritized, prescriptive", structure: "18 controls, 3 Implementation Groups", bestFor: "Practical, actionable starting point" },
  { framework: "NIST 800-53", scope: "US Federal / regulated", approach: "Comprehensive control catalog", structure: "1000+ controls in 20 families", bestFor: "Government compliance, thorough coverage" },
  { framework: "SOC 2", scope: "Service providers", approach: "Trust Service Criteria audit", structure: "5 Trust Principles", bestFor: "SaaS/cloud vendor assurance" },
  { framework: "PCI DSS", scope: "Payment card handlers", approach: "Mandatory compliance", structure: "12 requirements, 300+ sub-requirements", bestFor: "Credit card data protection" },
  { framework: "COBIT", scope: "Enterprise IT governance", approach: "Governance & management", structure: "40 governance/management objectives", bestFor: "IT governance alignment with business" }
];

// Security Metrics for PM Dashboard
export const securityMetrics = [
  { metric: "MTTD", fullName: "Mean Time to Detect", description: "Average time from threat occurrence to detection", target: "< 24 hours", category: "Detection" },
  { metric: "MTTR", fullName: "Mean Time to Respond", description: "Average time from detection to containment", target: "< 4 hours (critical)", category: "Response" },
  { metric: "Patch Compliance", fullName: "Patch Compliance Rate", description: "Percentage of systems with current patches", target: "> 95%", category: "Prevention" },
  { metric: "Vuln Remediation", fullName: "Vulnerability Remediation Time", description: "Average time to fix identified vulnerabilities", target: "Critical: 7 days, High: 30 days", category: "Prevention" },
  { metric: "Phishing Click Rate", fullName: "Phishing Simulation Click Rate", description: "Percentage of users clicking simulated phishing", target: "< 5%", category: "Awareness" },
  { metric: "MFA Adoption", fullName: "MFA Coverage", description: "Percentage of accounts with MFA enabled", target: "100% for privileged, > 95% all", category: "Access Control" },
  { metric: "False Positive Rate", fullName: "Alert False Positive Rate", description: "Percentage of alerts that are not real threats", target: "< 30%", category: "Detection" },
  { metric: "Incidents Closed", fullName: "Monthly Incidents Resolved", description: "Number of security incidents fully resolved", target: "Track trend (decreasing)", category: "Response" }
];

// Glossary of key terms
export const glossary: Record<string, string> = {
  "APT": "Advanced Persistent Threat — A prolonged, targeted cyberattack by well-funded threat actors (often nation-states)",
  "CIA Triad": "Confidentiality, Integrity, Availability — The three core principles of information security",
  "CSPM": "Cloud Security Posture Management — Continuous monitoring of cloud configurations for misconfigurations",
  "CVE": "Common Vulnerabilities and Exposures — Standardized identifier for known security vulnerabilities",
  "DDoS": "Distributed Denial of Service — Attack overwhelming a target with traffic from multiple sources",
  "DLP": "Data Loss Prevention — Technology preventing sensitive data from leaving the organization",
  "DMZ": "Demilitarized Zone — Network segment between internal network and internet, hosting public-facing services",
  "EDR": "Endpoint Detection and Response — Advanced endpoint security with behavioral analysis and automated response",
  "IAM": "Identity and Access Management — Framework for managing digital identities and their access to resources",
  "IDS/IPS": "Intrusion Detection/Prevention System — Monitors network traffic for malicious activity",
  "IoC": "Indicator of Compromise — Evidence that a security breach has occurred (IP addresses, file hashes, domains)",
  "ISMS": "Information Security Management System — Systematic approach to managing sensitive information (ISO 27001)",
  "Lateral Movement": "Technique where attackers move through a network after initial compromise to reach valuable targets",
  "MFA": "Multi-Factor Authentication — Requiring two or more verification factors to access a resource",
  "MITRE ATT&CK": "Knowledge base of adversary tactics and techniques based on real-world observations",
  "MSSP": "Managed Security Service Provider — Third-party company providing outsourced security monitoring",
  "NGFW": "Next-Generation Firewall — Firewall with application awareness, IPS, and deep packet inspection",
  "NIST": "National Institute of Standards and Technology — US agency publishing cybersecurity frameworks and standards",
  "OSINT": "Open Source Intelligence — Intelligence gathered from publicly available sources",
  "OWASP": "Open Web Application Security Project — Community producing tools and guides for application security",
  "PAM": "Privileged Access Management — Controls and monitoring for high-privilege accounts",
  "Pentest": "Penetration Testing — Authorized simulated attack to identify security weaknesses",
  "RBAC": "Role-Based Access Control — Access permissions assigned based on organizational roles",
  "SIEM": "Security Information and Event Management — Platform collecting and correlating security logs for threat detection",
  "SOAR": "Security Orchestration, Automation, and Response — Automates security operations workflows",
  "SOC": "Security Operations Center — Team monitoring and responding to security threats 24/7",
  "SSO": "Single Sign-On — Authentication allowing one login to access multiple applications",
  "TLS": "Transport Layer Security — Cryptographic protocol securing data in transit (successor to SSL)",
  "TTP": "Tactics, Techniques, and Procedures — Describes how threat actors operate",
  "VPN": "Virtual Private Network — Encrypted tunnel over public networks for secure remote access",
  "WAF": "Web Application Firewall — Protects web applications by filtering HTTP traffic",
  "XDR": "Extended Detection and Response — Unified security across endpoints, network, and cloud",
  "Zero Trust": "Security model assuming no implicit trust — verify every access request regardless of location",
  "Zero-day": "Vulnerability unknown to the vendor with no available patch — highest risk"
};

// Vendor & Tool Landscape
export const toolLandscape = [
  { category: "SIEM", tools: ["Splunk", "Microsoft Sentinel", "IBM QRadar", "Elastic SIEM", "Google Chronicle"] },
  { category: "EDR/XDR", tools: ["CrowdStrike Falcon", "SentinelOne", "Microsoft Defender", "Carbon Black", "Cortex XDR"] },
  { category: "Firewall/NGFW", tools: ["Palo Alto Networks", "Fortinet FortiGate", "Cisco Firepower", "Check Point", "Sophos"] },
  { category: "Vulnerability Scanner", tools: ["Tenable Nessus", "Qualys", "Rapid7 InsightVM", "OpenVAS", "Burp Suite"] },
  { category: "IAM/PAM", tools: ["CyberArk", "BeyondTrust", "Okta", "Microsoft Entra ID", "Ping Identity"] },
  { category: "Cloud Security", tools: ["Wiz", "Prisma Cloud", "AWS Security Hub", "Azure Defender", "Lacework"] },
  { category: "Email Security", tools: ["Proofpoint", "Mimecast", "Microsoft Defender for Office", "Abnormal Security", "Barracuda"] },
  { category: "Network Security", tools: ["Wireshark", "Snort/Suricata", "Zeek", "Darktrace", "ExtraHop"] },
  { category: "GRC Platform", tools: ["ServiceNow GRC", "Archer", "LogicGate", "Drata", "Vanta"] },
  { category: "Threat Intelligence", tools: ["Recorded Future", "Mandiant", "CrowdStrike Intel", "VirusTotal", "AlienVault OTX"] }
];
