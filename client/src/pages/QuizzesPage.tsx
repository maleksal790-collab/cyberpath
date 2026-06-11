import { useState, useMemo } from "react";
import { Link } from "wouter";
import { domains } from "@/data/roadmapData";
import { useProgress } from "@/hooks/useProgress";
import {
  HelpCircle, Award, CheckCircle2, ArrowRight, Filter, BarChart3
} from "lucide-react";

type DifficultyFilter = "all" | 1 | 2 | 3;
type StatusFilter = "all" | "completed" | "not-attempted";

export default function QuizzesPage() {
  const { getQuizScore, getTotalQuizStats } = useProgress();
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const quizStats = getTotalQuizStats();

  // Aggregate all topics with quizzes
  const allQuizTopics = useMemo(() => {
    const topics: { topic: typeof domains[0]["topics"][0]; domain: typeof domains[0] }[] = [];
    for (const domain of domains) {
      for (const topic of domain.topics) {
        if (topic.quiz.length > 0) {
          topics.push({ topic, domain });
        }
      }
    }
    return topics;
  }, []);

  const filteredTopics = useMemo(() => {
    let items = allQuizTopics;
    if (domainFilter !== "all") {
      items = items.filter((item) => item.domain.id === domainFilter);
    }
    if (difficultyFilter !== "all") {
      items = items.filter((item) => item.topic.difficulty === difficultyFilter);
    }
    if (statusFilter === "completed") {
      items = items.filter((item) => getQuizScore(item.topic.id) !== undefined);
    } else if (statusFilter === "not-attempted") {
      items = items.filter((item) => getQuizScore(item.topic.id) === undefined);
    }
    return items;
  }, [allQuizTopics, domainFilter, difficultyFilter, statusFilter, getQuizScore]);

  const totalQuizzes = allQuizTopics.length;
  const completedQuizzes = allQuizTopics.filter((item) => getQuizScore(item.topic.id) !== undefined).length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
          <HelpCircle size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Quiz Center</h1>
          <p className="text-sm text-muted-foreground">Test your knowledge across all {totalQuizzes} topic quizzes</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Quizzes Attempted</span>
          </div>
          <p className="text-xl font-bold">{quizStats.attempted}<span className="text-sm font-normal text-muted-foreground">/{totalQuizzes}</span></p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={14} className="text-green-600" />
            <span className="text-xs text-muted-foreground">Questions Correct</span>
          </div>
          <p className="text-xl font-bold">{quizStats.totalCorrect}<span className="text-sm font-normal text-muted-foreground">/{quizStats.totalQuestions}</span></p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1">
            <Award size={14} className="text-amber-600" />
            <span className="text-xs text-muted-foreground">Overall Score</span>
          </div>
          <p className="text-xl font-bold">{quizStats.percentage}%</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle size={14} className="text-purple-600" />
            <span className="text-xs text-muted-foreground">Remaining</span>
          </div>
          <p className="text-xl font-bold">{totalQuizzes - completedQuizzes}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground">Quiz Completion Progress</span>
          <span className="font-medium text-primary">{Math.round((completedQuizzes / totalQuizzes) * 100)}%</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] rounded-full transition-all duration-600"
            style={{ width: `${(completedQuizzes / totalQuizzes) * 100}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Filters:</span>
        </div>
        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Domains</option>
          {domains.map((d) => (
            <option key={d.id} value={d.id}>{d.title}</option>
          ))}
        </select>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value === "all" ? "all" : Number(e.target.value) as 1 | 2 | 3)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Difficulties</option>
          <option value="1">Beginner</option>
          <option value="2">Intermediate</option>
          <option value="3">Advanced</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Status</option>
          <option value="completed">Attempted</option>
          <option value="not-attempted">Not Attempted</option>
        </select>
      </div>

      {/* Quiz List */}
      <div className="space-y-3">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No quizzes match your filters</p>
          </div>
        ) : (
          filteredTopics.map(({ topic, domain }) => {
            const score = getQuizScore(topic.id);
            const scorePercentage = score ? Math.round((score.score / score.total) * 100) : null;
            return (
              <Link key={topic.id} href={`/domain/${domain.id}/topic/${topic.id}`}>
                <div className="bg-card rounded-xl border border-border p-4 card-hover flex items-center gap-4">
                  {/* Domain Color Indicator */}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: domain.color + "15" }}>
                    <HelpCircle size={18} style={{ color: domain.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-0.5">{topic.title}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{domain.title}</span>
                      <span className="text-[10px] text-muted-foreground">{topic.quiz.length} question{topic.quiz.length > 1 ? "s" : ""}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map((i) => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i <= topic.difficulty ? domain.color : "#e2e8f0" }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Score / Status */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {score ? (
                      <div className="text-right">
                        <div className={`text-sm font-bold ${scorePercentage! >= 80 ? "text-green-600" : scorePercentage! >= 50 ? "text-amber-600" : "text-red-500"}`}>
                          {score.score}/{score.total}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{scorePercentage}%</div>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not attempted</span>
                    )}
                    <ArrowRight size={14} className="text-muted-foreground" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">{filteredTopics.length} quizzes shown</p>
    </div>
  );
}
