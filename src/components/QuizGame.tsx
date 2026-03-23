import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainRoundMovies, bonusRoundMovies, Movie } from "@/data/quizData";
import StartScreen from "./StartScreen";
import QuestionCard from "./QuestionCard";
import RevealCard from "./RevealCard";
import BonusIntro from "./BonusIntro";
import FinalScreen from "./FinalScreen";

type GamePhase = "start" | "main" | "main-reveal" | "bonus-intro" | "bonus" | "bonus-reveal" | "final";

const QuizGame = () => {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusCorrect, setBonusCorrect] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const isBonus = phase === "bonus" || phase === "bonus-reveal";
  const movies = isBonus ? bonusRoundMovies : mainRoundMovies;
  const currentMovie = movies[currentIndex];
  const maxTime = isBonus ? 15 : 30;
  const totalQuestions = mainRoundMovies.length + bonusRoundMovies.length;
  const currentOverall = isBonus ? mainRoundMovies.length + currentIndex : currentIndex;

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startTimer = useCallback((seconds: number) => {
    stopTimer();
    setTimeLeft(seconds);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  // Handle timeout
  useEffect(() => {
    if (timeLeft === 0 && (phase === "main" || phase === "bonus")) {
      handleSubmit("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const handleSubmit = (answer: string) => {
    stopTimer();
    const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "");
    const correct = normalize(answer) === normalize(currentMovie.name);
    setLastCorrect(correct);
    setUserAnswer(answer);
    if (correct) {
      setScore((s) => s + (isBonus ? 20 : 10));
      if (isBonus) setBonusCorrect((c) => c + 1);
    }
    setPhase(isBonus ? "bonus-reveal" : "main-reveal");
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (phase === "main-reveal") {
      if (nextIndex < mainRoundMovies.length) {
        setCurrentIndex(nextIndex);
        setLastCorrect(null);
        setPhase("main");
        startTimer(30);
      } else {
        setCurrentIndex(0);
        setLastCorrect(null);
        setPhase("bonus-intro");
      }
    } else if (phase === "bonus-reveal") {
      if (nextIndex < bonusRoundMovies.length) {
        setCurrentIndex(nextIndex);
        setLastCorrect(null);
        setPhase("bonus");
        startTimer(15);
      } else {
        setPhase("final");
      }
    }
  };

  const handleStart = () => {
    setScore(0);
    setBonusCorrect(0);
    setCurrentIndex(0);
    setLastCorrect(null);
    setPhase("main");
    startTimer(30);
  };

  const handleBonusStart = () => {
    setCurrentIndex(0);
    setLastCorrect(null);
    setPhase("bonus");
    startTimer(15);
  };

  const handleRestart = () => {
    setScore(0);
    setBonusCorrect(0);
    setCurrentIndex(0);
    setLastCorrect(null);
    setPhase("start");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      {phase !== "start" && phase !== "final" && phase !== "bonus-intro" && (
        <div className="w-full px-4 pt-4 pb-2">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={isBonus ? "h-full bg-gradient-bonus rounded-full" : "h-full bg-gradient-neon rounded-full"}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentOverall + 1) / totalQuestions) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-body">
                {currentOverall + 1} / {totalQuestions}
              </p>
            </div>
            <div className={`font-display text-lg font-bold ${isBonus ? "text-bonus-gold" : "text-neon-purple"}`}>
              Score: {score}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {phase === "start" && (
            <motion.div key="start" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}

          {(phase === "main" || phase === "bonus") && (
            <motion.div key={`q-${phase}-${currentIndex}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
              <QuestionCard
                movie={currentMovie}
                isBonus={isBonus}
                timeLeft={timeLeft}
                maxTime={maxTime}
                onSubmit={handleSubmit}
                questionNumber={currentIndex + 1}
              />
            </motion.div>
          )}

          {(phase === "main-reveal" || phase === "bonus-reveal") && (
            <motion.div key={`r-${phase}-${currentIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <RevealCard movie={currentMovie} correct={lastCorrect!} userAnswer={userAnswer} isBonus={isBonus} onNext={handleNext} />
            </motion.div>
          )}

          {phase === "bonus-intro" && (
            <motion.div key="bonus-intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
              <BonusIntro onStart={handleBonusStart} />
            </motion.div>
          )}

          {phase === "final" && (
            <motion.div key="final" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <FinalScreen score={score} maxScore={mainRoundMovies.length * 10 + bonusRoundMovies.length * 20} bonusCorrect={bonusCorrect} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizGame;
