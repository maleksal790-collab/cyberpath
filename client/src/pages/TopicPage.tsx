import { useState } from "react";
import { Link, useParams } from "wouter";
import { domains } from "@/data/roadmapData";
import { useProgress } from "@/hooks/useProgress";
import {
  ArrowLeft, CheckCircle2, Bookmark, BookmarkCheck, Clock,
  Lightbulb, BookOpen, Briefcase, HelpCircle, ArrowRight, Tag,
  Award, RotateCcw
} from "lucide-react";

type TabId = "overview" | "deep-dive" | "pm-perspective" | "quiz";

export default function TopicPage() {
  const params = useParams<{ domainId: string; topicId: string }>();
  const domain = domains.find((d) => d.id === params.domainId);
  const topic = domain?.topics.find((t) => t.id === params.topicId);
  const { isCompleted, toggleComplete, isBookmarked, toggleBookmark, saveQuizScore, getQuizScore } = useProgress();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!domain || !topic) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-muted-foreground">Topic not found</p>
        <Link href="/" className="text-primary text-sm mt-2 inline-block">Back to Dashboard</Link>
      </div>
    );
  }

  const completed = isCompleted(topic.id);
  const bookmarked = isBookmarked(topic.id);
  const topicIndex = domain.topics.findIndex((t) => t.id === topic.id);
  const nextTopic = domain.topics[topicIndex + 1];
  const prevTopic = domain.topics[topicIndex - 1];
  const previousScore = getQuizScore(topic.id);

  // Find related topics across domains
  const relatedTopics = topic.relatedTopics.map((rtId) => {
    for (const d of domains) {
      const t = d.topics.find((tp) => tp.id === rtId);
      if (t) return { topic: t, domain: d };
    }
    return null;
  }).filter(Boolean);

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BookOpen size={14} /> },
    { id: "deep-dive", label: "Deep Dive", icon: <Lightbulb size={14} /> },
    { id: "pm-perspective", label: "PM Perspective", icon: <Briefcase size={14} /> },
    { id: "quiz", label: "Quiz", icon: <HelpCircle size={14} /> },
  ];

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // Calculate score and save
    const correctCount = topic.quiz.reduce((count, q, qi) => {
      return count + (quizAnswers[qi] === q.correct ? 1 : 0);
    }, 0);
    saveQuizScore(topic.id, correctCount, topic.quiz.length);
  };

  const handleQuizRetry = () => {
    setQuizSubmitted(false);
    setQuizAnswers({});
  };

  const getQuizScoreDisplay = () => {
    if (!quizSubmitted) return null;
    const correctCount = topic.quiz.reduce((count, q, qi) => {
      return count + (quizAnswers[qi] === q.correct ? 1 : 0);
    }, 0);
    const percentage = Math.round((correctCount / topic.quiz.length) * 100);
    return { correctCount, total: topic.quiz.length, percentage };
  };

  const scoreDisplay = getQuizScoreDisplay();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <Link href={`/domain/${domain.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6">
        <ArrowLeft size={14} />
        {domain.title}
      </Link>

      {/* Topic Header */}
      <div className="bg-card rounded-xl border border-border border-l-4 p-6 mb-6" style={{ borderLeftColor: domain.color }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">{topic.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((i) => (
                  <span key={i} className="difficulty-dot" style={{ backgroundColor: i <= topic.difficulty ? domain.color : "#e2e8f0" }} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {topic.difficulty === 1 ? "Beginner" : topic.difficulty === 2 ? "Intermediate" : "Advanced"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {topic.timeToRead}
              </div>
              {previousScore && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Award size={12} />
                  Quiz: {previousScore.score}/{previousScore.total}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`p-2 rounded-lg transition-smooth ${bookmarked ? "bg-amber-50 text-amber-600" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              title={bookmarked ? "Remove bookmark" : "Bookmark this topic"}
            >
              {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
            <button
              onClick={() => toggleComplete(topic.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-smooth flex items-center gap-1.5 ${completed ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              <CheckCircle2 size={14} />
              {completed ? "Completed" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-smooth whitespace-nowrap ${activeTab === tab.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-card rounded-xl border border-border p-6 mb-6">
        {activeTab === "overview" && (
          <div>
            <p className="text-sm leading-relaxed text-foreground/90 mb-6">{topic.overview}</p>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Terms</h4>
            <div className="flex flex-wrap gap-2">
              {topic.keyTerms.map((term) => (
                <Link key={term} href="/glossary">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-smooth">
                    <Tag size={10} />
                    {term}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "deep-dive" && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Detailed Breakdown</h4>
            {topic.deepDive.map((item, i) => {
              // Split on first colon to highlight the term
              const colonIndex = item.indexOf(":");
              const title = colonIndex > -1 ? item.substring(0, colonIndex) : null;
              const body = colonIndex > -1 ? item.substring(colonIndex + 1).trim() : item;
              return (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: domain.color + "20" }}>
                    <span className="text-[10px] font-bold" style={{ color: domain.color }}>{i + 1}</span>
                  </div>
                  <div className="text-sm leading-relaxed text-foreground/90">
                    {title && <span className="font-semibold">{title}:</span>} {body}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "pm-perspective" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] flex items-center justify-center">
                <Briefcase size={14} className="text-white" />
              </div>
              <h3 className="font-semibold text-sm">Why This Matters for Your Role</h3>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm leading-relaxed text-foreground/90">{topic.pmPerspective}</p>
            </div>
          </div>
        )}

        {activeTab === "quiz" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Self-Assessment Quiz</h3>
              {previousScore && !quizSubmitted && (
                <span className="text-xs text-muted-foreground">
                  Previous best: {previousScore.score}/{previousScore.total}
                </span>
              )}
            </div>

            {/* Score Banner */}
            {quizSubmitted && scoreDisplay && (
              <div className={`mb-6 p-4 rounded-lg border ${scoreDisplay.percentage >= 80 ? "bg-green-50 border-green-200" : scoreDisplay.percentage >= 50 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${scoreDisplay.percentage >= 80 ? "bg-green-100" : scoreDisplay.percentage >= 50 ? "bg-amber-100" : "bg-red-100"}`}>
                      <Award size={20} className={scoreDisplay.percentage >= 80 ? "text-green-600" : scoreDisplay.percentage >= 50 ? "text-amber-600" : "text-red-600"} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {scoreDisplay.percentage >= 80 ? "Excellent!" : scoreDisplay.percentage >= 50 ? "Good effort!" : "Keep studying!"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        You got {scoreDisplay.correctCount} out of {scoreDisplay.total} correct ({scoreDisplay.percentage}%)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleQuizRetry}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-border text-xs font-medium hover:bg-muted transition-smooth"
                  >
                    <RotateCcw size={12} />
                    Retry
                  </button>
                </div>
              </div>
            )}

            {topic.quiz.length === 0 ? (
              <p className="text-sm text-muted-foreground">No quiz available for this topic yet.</p>
            ) : (
              <div className="space-y-6">
                {topic.quiz.map((q, qi) => (
                  <div key={qi} className="border border-border rounded-lg p-4">
                    <p className="text-sm font-medium mb-3">
                      <span className="text-muted-foreground mr-2">Q{qi + 1}.</span>
                      {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi;
                        const isCorrect = oi === q.correct;
                        let optClass = "border-border hover:border-primary/30 hover:bg-muted/50";
                        if (quizSubmitted) {
                          if (isCorrect) optClass = "border-green-300 bg-green-50";
                          else if (selected && !isCorrect) optClass = "border-red-300 bg-red-50";
                        } else if (selected) {
                          optClass = "border-primary bg-primary/5";
                        }
                        return (
                          <button
                            key={oi}
                            onClick={() => {
                              if (!quizSubmitted) setQuizAnswers({ ...quizAnswers, [qi]: oi });
                            }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-smooth ${optClass}`}
                          >
                            <span className="text-muted-foreground mr-2">{String.fromCharCode(65 + oi)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && (
                      <div className={`mt-3 p-3 rounded-lg text-xs ${quizAnswers[qi] === q.correct ? "bg-green-50 text-green-800 border border-green-200" : "bg-amber-50 text-amber-800 border border-amber-200"}`}>
                        <span className="font-semibold">{quizAnswers[qi] === q.correct ? "Correct!" : "Incorrect."}</span>{" "}
                        {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
                {!quizSubmitted && (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < topic.quiz.length}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white text-sm font-medium disabled:opacity-50 transition-smooth"
                  >
                    Check Answers
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Topics */}
      {relatedTopics.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="font-semibold text-sm mb-3">Related Topics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedTopics.map((rt) => {
              if (!rt) return null;
              return (
                <Link key={rt.topic.id} href={`/domain/${rt.domain.id}/topic/${rt.topic.id}`}>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: rt.domain.color }} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{rt.topic.title}</p>
                      <p className="text-[10px] text-muted-foreground">{rt.domain.title}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        {prevTopic ? (
          <Link href={`/domain/${domain.id}/topic/${prevTopic.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
            <ArrowLeft size={14} />
            {prevTopic.title}
          </Link>
        ) : <div />}
        {nextTopic ? (
          <Link href={`/domain/${domain.id}/topic/${nextTopic.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth">
            {nextTopic.title}
            <ArrowRight size={14} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
