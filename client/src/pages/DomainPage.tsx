import { Link, useParams } from "wouter";
import { domains } from "@/data/roadmapData";
import { useProgress } from "@/hooks/useProgress";
import { ArrowLeft, CheckCircle2, Clock, ArrowRight, Trophy } from "lucide-react";

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="difficulty-dot"
          style={{ backgroundColor: i <= level ? "#0ea5e9" : "#e2e8f0" }}
        />
      ))}
      <span className="text-[10px] text-muted-foreground ml-1">
        {level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced"}
      </span>
    </div>
  );
}

export default function DomainPage() {
  const params = useParams<{ domainId: string }>();
  const domain = domains.find((d) => d.id === params.domainId);
  const { isCompleted, getProgress, isDomainComplete } = useProgress();

  if (!domain) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-muted-foreground">Domain not found</p>
        <Link href="/" className="text-primary text-sm mt-2 inline-block">Back to Dashboard</Link>
      </div>
    );
  }

  const progress = getProgress(domain.id);
  const completedCount = domain.topics.filter((t) => isCompleted(t.id)).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6">
        <ArrowLeft size={14} />
        Back to Dashboard
      </Link>

      {/* Domain Header */}
      <div className="bg-card rounded-xl border border-border border-l-4 p-6 mb-6" style={{ borderLeftColor: domain.color }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">{domain.title}</h1>
            <p className="text-sm text-muted-foreground">{domain.description}</p>
          </div>
          {isDomainComplete(domain.id) && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
              <Trophy size={12} />
              Complete
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">{completedCount} of {domain.topics.length} topics completed</span>
              <span className="font-medium" style={{ color: domain.color }}>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-600"
                style={{ width: `${progress}%`, backgroundColor: domain.color }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {domain.topics.map((topic, index) => {
          const completed = isCompleted(topic.id);
          return (
            <Link key={topic.id} href={`/domain/${domain.id}/topic/${topic.id}`}>
              <div className={`bg-card rounded-xl border p-5 card-hover flex items-center gap-4 ${completed ? "border-green-200 bg-green-50/30" : "border-border"}`}>
                {/* Number/Check */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${completed ? "bg-green-100" : "bg-muted"}`}>
                  {completed ? (
                    <CheckCircle2 size={18} className="text-green-600" />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground">{index + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1">{topic.title}</h3>
                  <div className="flex items-center gap-4">
                    <DifficultyDots level={topic.difficulty} />
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {topic.timeToRead}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight size={16} className="text-muted-foreground flex-shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Related Domains */}
      <div className="mt-8 bg-card rounded-xl border border-border p-6">
        <h3 className="font-semibold text-sm mb-3">Continue Learning</h3>
        <div className="flex flex-wrap gap-2">
          {domains.filter((d) => d.id !== domain.id).slice(0, 4).map((d) => (
            <Link key={d.id} href={`/domain/${d.id}`}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-smooth text-xs font-medium">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
