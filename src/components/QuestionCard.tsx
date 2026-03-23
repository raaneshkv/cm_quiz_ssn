import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Movie } from "@/data/quizData";

interface QuestionCardProps {
  movie: Movie;
  isBonus: boolean;
  timeLeft: number;
  maxTime: number;
  onSubmit: (answer: string) => void;
  questionNumber: number;
}

const QuestionCard = ({ movie, isBonus, timeLeft, maxTime, onSubmit, questionNumber }: QuestionCardProps) => {
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) onSubmit(answer);
  };

  const wordCount = movie.name.split(" ").length;
  const letterCount = movie.name.replace(/\s/g, "").length;
  const timerPercent = (timeLeft / maxTime) * 100;
  const timerUrgent = timeLeft <= 5;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Round label */}
      <div className="text-center mb-3">
        <span className={`font-display text-xs tracking-[0.3em] uppercase ${isBonus ? "text-bonus-gold" : "text-neon-purple"}`}>
          {isBonus ? "🔥 Bonus Round" : `Question ${questionNumber}`}
        </span>
      </div>

      {/* Timer */}
      <div className="mb-4">
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${timerUrgent ? "bg-wrong" : isBonus ? "bg-gradient-bonus" : "bg-gradient-neon"}`}
            initial={{ width: "100%" }}
            animate={{ width: `${timerPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className={`text-center font-display text-sm mt-1 ${timerUrgent ? "text-wrong animate-pulse" : "text-muted-foreground"}`}>
          {timeLeft}s
        </p>
      </div>

      {/* Card */}
      <div className={`bg-card rounded-2xl p-8 ${isBonus ? "border-glow-bonus glow-bonus" : "border-glow glow-neon"}`}>
        {/* Consonant display */}
        <div className="text-center mb-6">
          <motion.p
            className={`font-display text-4xl md:text-5xl font-bold tracking-[0.3em] ${isBonus ? "text-bonus-gold" : "text-neon-glow"}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {movie.consonants}
          </motion.p>
        </div>

        {/* Hints */}
        <div className="text-center mb-6 space-y-1">
          <p className="text-muted-foreground text-sm font-body">
            📏 Number of letters: <span className="text-foreground font-semibold">{letterCount}</span>
          </p>
          {isBonus && (
            <>
              <p className="text-muted-foreground text-sm font-body">
                📝 Number of words: <span className="text-foreground font-semibold">{wordCount}</span>
              </p>
            </>
          )}
          {!isBonus && !showHint && (
            <button onClick={() => setShowHint(true)} className="text-xs text-neon-purple hover:text-neon-glow underline font-body mt-1">
              Show word count hint
            </button>
          )}
          {!isBonus && showHint && (
            <p className="text-muted-foreground text-sm font-body">
              📝 Number of words: <span className="text-foreground font-semibold">{wordCount}</span>
            </p>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type the movie name..."
            className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground font-body text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-center"
            autoComplete="off"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={!answer.trim()}
            className={`w-full font-display text-lg py-3 rounded-lg transition-all disabled:opacity-40 ${
              isBonus
                ? "bg-gradient-bonus text-primary-foreground"
                : "bg-gradient-neon text-primary-foreground"
            }`}
          >
            SUBMIT
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default QuestionCard;
