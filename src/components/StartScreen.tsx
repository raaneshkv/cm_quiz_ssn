import { motion } from "framer-motion";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="text-center max-w-lg mx-auto">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl mb-6"
      >
        🎬
      </motion.div>
      <h1 className="font-display text-3xl md:text-5xl font-bold text-gradient-neon mb-4">
        GUESS THE MOVIE
      </h1>
      <p className="font-display text-lg md:text-xl text-neon-glow mb-2">WITHOUT VOWELS</p>
      <p className="text-muted-foreground font-body text-lg mb-8">
        Tamil Cinema Edition
      </p>

      <div className="bg-card border-glow rounded-xl p-6 mb-8 text-left space-y-3">
        <p className="text-foreground font-body text-base">
          <span className="text-neon-purple font-semibold">How to play:</span> We remove all vowels from a Tamil movie title. You guess the movie!
        </p>
        <div className="space-y-1 text-muted-foreground text-sm font-body">
          <p>Example: <span className="text-neon-glow font-display tracking-widest">MSTR</span> → Master</p>
          <p>Example: <span className="text-neon-glow font-display tracking-widest">SVJ</span> → Sivaji</p>
        </div>
        <div className="pt-2 border-t border-border space-y-1 text-sm text-muted-foreground">
          <p>⏱️ 30s per question in Main Round</p>
          <p>🔥 15s per question in Bonus Round</p>
          <p>✏️ Type your answer — no multiple choice!</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-gradient-neon text-primary-foreground font-display text-xl px-10 py-4 rounded-xl glow-neon transition-all"
      >
        START GAME
      </motion.button>
    </div>
  );
};

export default StartScreen;
