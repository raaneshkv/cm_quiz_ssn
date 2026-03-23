import { motion } from "framer-motion";

interface FinalScreenProps {
  score: number;
  maxScore: number;
  bonusCorrect: number;
  onRestart: () => void;
}

const FinalScreen = ({ score, maxScore, bonusCorrect, onRestart }: FinalScreenProps) => {
  const percentage = Math.round((score / maxScore) * 100);
  const isChampion = bonusCorrect >= 3;

  return (
    <div className="text-center max-w-lg mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="text-7xl mb-4"
      >
        {isChampion ? "🏆" : "🎬"}
      </motion.div>

      {isChampion && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl md:text-3xl font-bold text-gradient-bonus mb-2"
        >
          WINNER! CASH PRIZE CHAMPION
        </motion.h2>
      )}

      <h2 className={`font-display text-xl mb-6 ${isChampion ? "text-bonus-gold" : "text-neon-glow"}`}>
        {!isChampion && "Game Over!"}
      </h2>

      <div className="bg-card border-glow rounded-2xl p-8 mb-8 glow-neon">
        <p className="text-muted-foreground font-body text-lg mb-2">Your Score</p>
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="font-display text-5xl md:text-6xl font-bold text-gradient-neon mb-2"
        >
          {score}
        </motion.p>
        <p className="text-muted-foreground font-body">
          out of {maxScore} ({percentage}%)
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="bg-gradient-neon text-primary-foreground font-display text-xl px-10 py-4 rounded-xl glow-neon transition-all"
      >
        PLAY AGAIN
      </motion.button>
    </div>
  );
};

export default FinalScreen;
