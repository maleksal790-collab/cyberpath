import { useState, useCallback } from "react";
import { domains } from "@/data/roadmapData";

const STORAGE_KEY = "cyberpath-progress";

interface QuizScore {
  topicId: string;
  score: number; // correct answers
  total: number; // total questions
  timestamp: number;
}

interface ProgressState {
  completed: string[]; // topic IDs
  bookmarked: string[]; // topic IDs
  status: Record<string, "known" | "in-progress" | "to-learn">; // topic ID -> status
  quizScores: QuizScore[];
}

function loadProgress(): ProgressState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure quizScores exists for backward compatibility
      if (!parsed.quizScores) parsed.quizScores = [];
      return parsed;
    }
  } catch {}
  return { completed: [], bookmarked: [], status: {}, quizScores: [] };
}

function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(loadProgress);

  const toggleComplete = useCallback((topicId: string) => {
    setState((prev) => {
      const next = { ...prev };
      if (prev.completed.includes(topicId)) {
        next.completed = prev.completed.filter((id) => id !== topicId);
      } else {
        next.completed = [...prev.completed, topicId];
      }
      saveProgress(next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((topicId: string) => {
    setState((prev) => {
      const next = { ...prev };
      if (prev.bookmarked.includes(topicId)) {
        next.bookmarked = prev.bookmarked.filter((id) => id !== topicId);
      } else {
        next.bookmarked = [...prev.bookmarked, topicId];
      }
      saveProgress(next);
      return next;
    });
  }, []);

  const setTopicStatus = useCallback((topicId: string, status: "known" | "in-progress" | "to-learn") => {
    setState((prev) => {
      const next = { ...prev, status: { ...prev.status, [topicId]: status } };
      saveProgress(next);
      return next;
    });
  }, []);

  const saveQuizScore = useCallback((topicId: string, score: number, total: number) => {
    setState((prev) => {
      // Replace existing score for this topic or add new one
      const filtered = prev.quizScores.filter((qs) => qs.topicId !== topicId);
      const next = {
        ...prev,
        quizScores: [...filtered, { topicId, score, total, timestamp: Date.now() }],
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const getQuizScore = useCallback((topicId: string): QuizScore | undefined => {
    return state.quizScores.find((qs) => qs.topicId === topicId);
  }, [state.quizScores]);

  const getAllQuizScores = useCallback(() => {
    return state.quizScores;
  }, [state.quizScores]);

  const getTotalQuizStats = useCallback(() => {
    const scores = state.quizScores;
    if (scores.length === 0) return { attempted: 0, totalCorrect: 0, totalQuestions: 0, percentage: 0 };
    const totalCorrect = scores.reduce((sum, qs) => sum + qs.score, 0);
    const totalQuestions = scores.reduce((sum, qs) => sum + qs.total, 0);
    return {
      attempted: scores.length,
      totalCorrect,
      totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
    };
  }, [state.quizScores]);

  const isCompleted = useCallback((topicId: string) => state.completed.includes(topicId), [state.completed]);
  const isBookmarked = useCallback((topicId: string) => state.bookmarked.includes(topicId), [state.bookmarked]);
  const getTopicStatus = useCallback((topicId: string) => state.status[topicId] || "to-learn", [state.status]);

  const getProgress = useCallback((domainId: string) => {
    const domain = domains.find((d) => d.id === domainId);
    if (!domain) return 0;
    const completed = domain.topics.filter((t) => state.completed.includes(t.id)).length;
    return Math.round((completed / domain.topics.length) * 100);
  }, [state.completed]);

  const getTotalProgress = useCallback(() => {
    const totalTopics = domains.reduce((sum, d) => sum + d.topics.length, 0);
    if (totalTopics === 0) return 0;
    return Math.round((state.completed.length / totalTopics) * 100);
  }, [state.completed]);

  const isDomainComplete = useCallback((domainId: string) => {
    const domain = domains.find((d) => d.id === domainId);
    if (!domain) return false;
    return domain.topics.every((t) => state.completed.includes(t.id));
  }, [state.completed]);

  return {
    toggleComplete,
    toggleBookmark,
    setTopicStatus,
    saveQuizScore,
    getQuizScore,
    getAllQuizScores,
    getTotalQuizStats,
    isCompleted,
    isBookmarked,
    getTopicStatus,
    getProgress,
    getTotalProgress,
    isDomainComplete,
    completedTopics: state.completed,
    bookmarkedTopics: state.bookmarked,
    quizScores: state.quizScores,
  };
}
