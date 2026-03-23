import { motion } from "framer-motion";

interface BonusIntroProps {
  onStart: () => void;
}

const BonusIntro = ({ onStart }: BonusIntroProps) => {
  return (
    <div className="text-center max-w-lg mx-auto">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-7xl mb-6"
      >
        🔥
      </motion.div>

      <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-bonus mb-3">
        BONUS ROUND
      </h2>
      <p className="font-display text-xl text-bonus-gold mb-2">Cash Prize Challenge!</p>
      <p className="text-muted-foreground font-body mb-8">
        Harder movies • 15 seconds • +20 points each
      </p>

      <div className="bg-card border-glow-bonus rounded-xl p-6 mb-8 text-left space-y-2 text-sm text-muted-foreground font-body">
        <p>⚡ Only <span className="text-bonus-gold">15 seconds</span> per question</p>
        <p>💰 <span className="text-bonus-gold">+20 points</span> per correct answer</p>
        <p>📏 Hints: letter count & word count only</p>
        <p>🚫 No other clues!</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-gradient-bonus text-primary-foreground font-display text-xl px-10 py-4 rounded-xl glow-bonus transition-all"
      >
        LET'S GO! 🔥
      </motion.button>
    </div>
  );
};

export default BonusIntro;
