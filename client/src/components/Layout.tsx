import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { domains } from "@/data/roadmapData";
import {
  Monitor, Network, Shield, Server, Code, Eye, Scale, Cloud, Terminal,
  BookOpen, Wrench, Table2, GitCompare, ChevronLeft, ChevronRight,
  Home, Menu, X, Map, Crosshair, BarChart3, HelpCircle
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={18} />,
  Network: <Network size={18} />,
  Shield: <Shield size={18} />,
  Server: <Server size={18} />,
  Code: <Code size={18} />,
  Eye: <Eye size={18} />,
  Scale: <Scale size={18} />,
  Cloud: <Cloud size={18} />,
  Terminal: <Terminal size={18} />,
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 h-full
          bg-sidebar text-sidebar-foreground
          flex flex-col
          transition-all duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${collapsed ? "w-[64px]" : "w-[280px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo area */}
        <div className={`flex items-center h-16 px-4 border-b border-sidebar-border ${collapsed ? "justify-center" : "gap-3"}`}>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
              <span className="font-bold text-base text-sidebar-foreground">CyberPath</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
                <Shield size={16} className="text-white" />
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll py-4">
          {/* Dashboard */}
          <div className="px-3 mb-2">
            <Link href="/">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/") && location === "/" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <Home size={18} />
                {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
              </div>
            </Link>
          </div>

          {/* Learning Domains section */}
          {!collapsed && (
            <div className="px-6 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">Learning Domains</span>
            </div>
          )}
          {collapsed && <div className="border-b border-sidebar-border mx-3 my-2" />}

          <div className="px-3 space-y-0.5">
            {domains.map((domain) => (
              <Link key={domain.id} href={`/domain/${domain.id}`}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive(`/domain/${domain.id}`) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                  <span style={{ color: domain.color }}>{iconMap[domain.icon]}</span>
                  {!collapsed && <span className="text-sm font-medium truncate">{domain.title}</span>}
                </div>
              </Link>
            ))}
          </div>

          {/* Tools section */}
          {!collapsed && (
            <div className="px-6 py-2 mt-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">Reference Tools</span>
            </div>
          )}
          {collapsed && <div className="border-b border-sidebar-border mx-3 my-2 mt-4" />}

          <div className="px-3 space-y-0.5">
            <Link href="/glossary">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/glossary") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <BookOpen size={18} />
                {!collapsed && <span className="text-sm font-medium">Glossary</span>}
              </div>
            </Link>
            <Link href="/tools">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/tools") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <Wrench size={18} />
                {!collapsed && <span className="text-sm font-medium">Tool Landscape</span>}
              </div>
            </Link>
            <Link href="/quizzes">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/quizzes") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <HelpCircle size={18} />
                {!collapsed && <span className="text-sm font-medium">Quizzes</span>}
              </div>
            </Link>
            <Link href="/cheatsheet">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/cheatsheet") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <Table2 size={18} />
                {!collapsed && <span className="text-sm font-medium">Port Cheat Sheet</span>}
              </div>
            </Link>
            <Link href="/frameworks">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/frameworks") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <GitCompare size={18} />
                {!collapsed && <span className="text-sm font-medium">Framework Comparison</span>}
              </div>
            </Link>
            <Link href="/attack-chain">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/attack-chain") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <Crosshair size={18} />
                {!collapsed && <span className="text-sm font-medium">Attack Chain</span>}
              </div>
            </Link>
            <Link href="/metrics">
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth ${isActive("/metrics") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"}`}>
                <BarChart3 size={18} />
                {!collapsed && <span className="text-sm font-medium">PM Command Center</span>}
              </div>
            </Link>
          </div>
        </nav>

        {/* Collapse toggle */}
        <div className="hidden lg:flex items-center justify-center h-12 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground/50 hover:text-sidebar-foreground transition-smooth"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto dot-texture">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center h-14 px-4 bg-background border-b border-border sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg hover:bg-accent"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 ml-3">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
              <Shield size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm">CyberPath</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Quick Nav FAB */}
      <QuickNavFAB />
    </div>
  );
}

function QuickNavFAB() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}>
          <div
            className="absolute bottom-20 right-6 w-64 bg-white rounded-xl shadow-xl border border-border p-4 animate-in fade-in slide-in-from-bottom-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-sm font-semibold mb-3 text-foreground">Quick Navigation</h4>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              <Link href="/" onClick={() => setOpen(false)}>
                <div className="text-sm px-2 py-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-smooth">
                  Dashboard
                </div>
              </Link>
              {domains.map((d) => (
                <Link key={d.id} href={`/domain/${d.id}`} onClick={() => setOpen(false)}>
                  <div className="text-sm px-2 py-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.title}
                  </div>
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              <Link href="/glossary" onClick={() => setOpen(false)}>
                <div className="text-sm px-2 py-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-smooth">
                  Glossary
                </div>
              </Link>
              <Link href="/cheatsheet" onClick={() => setOpen(false)}>
                <div className="text-sm px-2 py-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-smooth">
                  Port Cheat Sheet
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] text-white shadow-lg hover:shadow-xl transition-smooth flex items-center justify-center"
        title="Quick Navigation"
      >
        <Map size={20} />
      </button>
    </>
  );
}
