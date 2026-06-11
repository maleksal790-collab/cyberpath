import { Link } from "wouter";
import { domains } from "@/data/roadmapData";
import { useProgress } from "@/hooks/useProgress";
import {
  Monitor, Network, Shield, Server, Code, Eye, Scale, Cloud, Terminal,
  Trophy, BookOpen, Clock, ArrowRight, Bookmark, Award, Target, TrendingUp
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={24} />,
  Network: <Network size={24} />,
  Shield: <Shield size={24} />,
  Server: <Server size={24} />,
  Code: <Code size={24} />,
  Eye: <Eye size={24} />,
  Scale: <Scale size={24} />,
  Cloud: <Cloud size={24} />,
  Terminal: <Terminal size={24} />,
};

const smallIconMap: Record<string, React.ReactNode> = {
  Monitor: <Monitor size={14} />,
  Network: <Network size={14} />,
  Shield: <Shield size={14} />,
  Server: <Server size={14} />,
  Code: <Code size={14} />,
  Eye: <Eye size={14} />,
  Scale: <Scale size={14} />,
  Cloud: <Cloud size={14} />,
  Terminal: <Terminal size={14} />,
};

export default function Home() {
  const { getProgress, getTotalProgress, getTotalQuizStats, bookmarkedTopics, completedTopics, isCompleted } = useProgress();
  const totalProgress = getTotalProgress();
  const totalTopics = domains.reduce((sum, d) => sum + d.topics.length, 0);
  const quizStats = getTotalQuizStats();

  // Get bookmarked topics with their domain info
  const bookmarkedItems = bookmarkedTopics.map((topicId) => {
    for (const d of domains) {
      const t = d.topics.find((tp) => tp.id === topicId);
      if (t) return { topic: t, domain: d };
    }
    return null;
  }).filter(Boolean).slice(0, 5);

  // Get suggested next topic (first incomplete topic in order)
  const getNextTopic = () => {
    for (const domain of domains) {
      for (const topic of domain.topics) {
        if (!isCompleted(topic.id)) {
          return { topic, domain };
        }
      }
    }
    return null;
  };
  const nextTopic = getNextTopic();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663431512593/QubqmRKKKxrA7PZmZsYkZq/hero-banner-EaRbXqZkF4ChZKAKRYBPxd.webp"
          alt="CyberPath Hero"
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 to-[#0f172a]/40 flex items-center">
          <div className="px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              IT, Networking & Cybersecurity
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-lg">
              Your complete learning roadmap — from fundamentals to advanced. Built for a Cybersecurity Project Manager who needs to understand every layer.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-5 card-hover">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Trophy size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Overall Progress</p>
              <p className="text-xl font-bold">{totalProgress}%</p>
            </div>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-full transition-all duration-600"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <BookOpen size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Topics Completed</p>
              <p className="text-xl font-bold">{completedTopics.length}<span className="text-sm font-normal text-muted-foreground">/{totalTopics}</span></p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Award size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Quiz Score</p>
              <p className="text-xl font-bold">{quizStats.percentage}%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{quizStats.attempted} quizzes attempted</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Target size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Domains</p>
              <p className="text-xl font-bold">{domains.length}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Beginner to Advanced</p>
        </div>
      </div>

      {/* Continue Learning + Bookmarks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Continue Learning */}
        {nextTopic && (
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-primary" />
              <h3 className="font-semibold text-sm">Continue Learning</h3>
            </div>
            <Link href={`/domain/${nextTopic.domain.id}/topic/${nextTopic.topic.id}`}>
              <div className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-smooth border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: nextTopic.domain.color + "20" }}>
                    <span style={{ color: nextTopic.domain.color }}>{smallIconMap[nextTopic.domain.icon]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{nextTopic.topic.title}</p>
                    <p className="text-xs text-muted-foreground">{nextTopic.domain.title} — {nextTopic.topic.timeToRead}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Bookmarks */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bookmark size={16} className="text-amber-500" />
              <h3 className="font-semibold text-sm">Bookmarked Topics</h3>
            </div>
            {bookmarkedItems.length > 0 && (
              <span className="text-xs text-muted-foreground">{bookmarkedTopics.length} total</span>
            )}
          </div>
          {bookmarkedItems.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">No bookmarks yet. Bookmark topics to save them here.</p>
          ) : (
            <div className="space-y-2">
              {bookmarkedItems.map((item) => {
                if (!item) return null;
                return (
                  <Link key={item.topic.id} href={`/domain/${item.domain.id}/topic/${item.topic.id}`}>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-smooth">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.domain.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.topic.title}</p>
                        <p className="text-[10px] text-muted-foreground">{item.domain.title}</p>
                      </div>
                      <ArrowRight size={12} className="text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Domain Cards Grid */}
      <h2 className="text-lg font-bold mb-4">Learning Domains</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {domains.map((domain) => {
          const progress = getProgress(domain.id);
          return (
            <Link key={domain.id} href={`/domain/${domain.id}`}>
              <div className="bg-card rounded-xl border border-border p-5 card-hover border-l-4 h-full" style={{ borderLeftColor: domain.color }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span style={{ color: domain.color }}>{iconMap[domain.icon]}</span>
                    <h3 className="font-semibold text-sm">{domain.title}</h3>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{domain.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{domain.topics.length} topics</span>
                  <span className="font-medium" style={{ color: domain.color }}>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full rounded-full transition-all duration-600"
                    style={{ width: `${progress}%`, backgroundColor: domain.color }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Start Recommendations */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <h2 className="text-lg font-bold mb-1">Recommended Learning Path</h2>
        <p className="text-sm text-muted-foreground mb-4">Follow this sequence for the most effective learning journey</p>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain, i) => (
            <Link key={domain.id} href={`/domain/${domain.id}`}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-smooth text-sm">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: domain.color }}>
                  {i + 1}
                </span>
                <span className="font-medium">{domain.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
