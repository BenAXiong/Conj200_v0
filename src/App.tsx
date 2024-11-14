import React, { useState } from 'react';
import { Book, LayoutDashboard, LogOut } from 'lucide-react';
import { verbs } from './data/verbs';
import { ConjugationCard } from './components/ConjugationCard';
import { TenseSelector } from './components/TenseSelector';
import { SessionConfig } from './components/SessionConfig';
import { SessionResults } from './components/SessionResults';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { useRandomPronoun } from './hooks/useRandomPronoun';
import { useAuth } from './hooks/useAuth';
import type { Tense } from './types/verb';

type AppState = 'auth' | 'config' | 'practice' | 'results' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [questionCount, setQuestionCount] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [selectedTense, setSelectedTense] = useState<Tense>('present');
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { currentPronoun, getNextPronoun } = useRandomPronoun();
  const { user, logout, savePracticeSession } = useAuth();

  const handleStartSession = () => {
    setAppState('practice');
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setCurrentVerbIndex(Math.floor(Math.random() * verbs.length));
    setUserAnswer('');
    setShowResult(false);
  };

  const handleCheck = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === verbs[currentVerbIndex].conjugations[selectedTense][currentPronoun];
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion >= questionCount) {
      const sessionResults = {
        tense: selectedTense,
        totalQuestions: questionCount,
        correctAnswers,
        accuracy: Math.round((correctAnswers / questionCount) * 100),
      };
      savePracticeSession(sessionResults);
      setAppState('results');
      return;
    }

    setCurrentQuestion(nextQuestion);
    setCurrentVerbIndex(Math.floor(Math.random() * verbs.length));
    setUserAnswer('');
    setShowResult(false);
    getNextPronoun();
  };

  const renderContent = () => {
    if (!user) {
      return (
        <AuthForm
          mode="login"
          onSuccess={() => setAppState('config')}
        />
      );
    }

    switch (appState) {
      case 'config':
        return (
          <SessionConfig
            questionCount={questionCount}
            onQuestionCountChange={setQuestionCount}
            onStartSession={handleStartSession}
          />
        );
      case 'practice':
        return (
          <>
            <TenseSelector selectedTense={selectedTense} onTenseChange={setSelectedTense} />
            <div className="mt-8 text-sm text-gray-500 text-center">
              Question {currentQuestion + 1} of {questionCount}
            </div>
            <ConjugationCard
              verb={verbs[currentVerbIndex]}
              tense={selectedTense}
              pronoun={currentPronoun}
              userAnswer={userAnswer}
              onAnswerChange={setUserAnswer}
              showResult={showResult}
            />
            <div className="flex gap-4 justify-center mt-6">
              {!showResult ? (
                <button
                  onClick={handleCheck}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                           transition-colors font-medium"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                           transition-colors font-medium"
                >
                  Next Question
                </button>
              )}
            </div>
          </>
        );
      case 'results':
        return (
          <SessionResults
            results={{
              totalQuestions: questionCount,
              correctAnswers,
              incorrectAnswers: questionCount - correctAnswers,
              accuracy: Math.round((correctAnswers / questionCount) * 100),
            }}
            onStartNewSession={() => setAppState('config')}
          />
        );
      case 'dashboard':
        return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Book className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">French Verb Practice</h1>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Master French verb conjugations through practice. Choose your session length and test your knowledge.
          </p>
          {user && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setAppState('dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 
                         transition-colors font-medium"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => setAppState('config')}
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 
                         transition-colors font-medium"
              >
                Practice
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 
                         transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </header>

        <div className="flex flex-col items-center gap-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;