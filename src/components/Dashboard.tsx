import React, { useMemo } from 'react';
import { BarChart3, Calendar, CheckCircle2, Target } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { PracticeSession, UserStats } from '../types/user';

export function Dashboard() {
  const { practiceHistory } = useAuth();

  const stats: UserStats = useMemo(() => {
    if (!practiceHistory.length) {
      return {
        totalSessions: 0,
        averageAccuracy: 0,
        totalQuestions: 0,
        bestTense: '-',
        worstTense: '-',
      };
    }

    const tenseStats = practiceHistory.reduce((acc, session) => {
      if (!acc[session.tense]) {
        acc[session.tense] = { total: 0, correct: 0 };
      }
      acc[session.tense].total += session.totalQuestions;
      acc[session.tense].correct += session.correctAnswers;
      return acc;
    }, {} as Record<string, { total: number; correct: number }>);

    const tenseAccuracies = Object.entries(tenseStats).map(([tense, stats]) => ({
      tense,
      accuracy: (stats.correct / stats.total) * 100,
    }));

    return {
      totalSessions: practiceHistory.length,
      averageAccuracy:
        practiceHistory.reduce((acc, session) => acc + session.accuracy, 0) /
        practiceHistory.length,
      totalQuestions: practiceHistory.reduce(
        (acc, session) => acc + session.totalQuestions,
        0
      ),
      bestTense: tenseAccuracies.sort((a, b) => b.accuracy - a.accuracy)[0]?.tense || '-',
      worstTense:
        tenseAccuracies.sort((a, b) => a.accuracy - b.accuracy)[0]?.tense || '-',
    };
  }, [practiceHistory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar className="w-6 h-6 text-indigo-600" />}
          label="Total Sessions"
          value={stats.totalSessions.toString()}
        />
        <StatCard
          icon={<Target className="w-6 h-6 text-green-600" />}
          label="Average Accuracy"
          value={`${Math.round(stats.averageAccuracy)}%`}
        />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6 text-blue-600" />}
          label="Best Tense"
          value={stats.bestTense}
        />
        <StatCard
          icon={<BarChart3 className="w-6 h-6 text-purple-600" />}
          label="Total Questions"
          value={stats.totalQuestions.toString()}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
        <div className="space-y-4">
          {practiceHistory.slice(-5).reverse().map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{session.tense}</p>
                <p className="text-sm text-gray-500">{formatDate(session.date)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-indigo-600">{session.accuracy}%</p>
                <p className="text-sm text-gray-500">
                  {session.correctAnswers} / {session.totalQuestions} correct
                </p>
              </div>
            </div>
          ))}
          {practiceHistory.length === 0 && (
            <p className="text-gray-500 text-center py-4">No practice sessions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-2">{icon}</div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}