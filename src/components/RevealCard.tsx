import { motion } from "framer-motion";
import { Movie } from "@/data/quizData";

interface RevealCardProps {
  movie: Movie;
  correct: boolean;
  userAnswer: string;
  isBonus: boolean;
  onNext: () => void;
}

const RevealCard = ({ movie, correct, userAnswer, isBonus, onNext }: RevealCardProps) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Result badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="text-center mb-4"
      >
        <span className={`inline-block font-display text-2xl px-6 py-2 rounded-full ${
          correct ? "bg-correct/20 text-correct glow-correct" : "bg-wrong/20 text-wrong glow-wrong"
        }`}>
          {correct ? "✅ CORRECT!" : "❌ WRONG!"}
        </span>
      </motion.div>

      {/* Card */}
      <div className={`bg-card rounded-2xl p-6 ${correct ? "glow-correct border border-correct/30" : "glow-wrong border border-wrong/30"}`}>
        {/* Movie title */}
        <h2 className={`font-display text-2xl md:text-3xl font-bold text-center mb-1 ${isBonus ? "text-bonus-gold" : "text-neon-glow"}`}>
          {movie.name}
        </h2>
        <motion.p 
          className="text-center text-foreground font-display text-lg mb-4 bg-muted/50 inline-block px-4 py-1 rounded-full border border-border/50 mx-auto block w-fit"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Directed by <span className={isBonus ? "text-bonus-gold font-bold" : "text-neon-purple font-bold"}>{movie.director}</span>
        </motion.p>

        {!correct && userAnswer && (
          <p className="text-center text-wrong/80 text-sm mb-4 font-body">
            Your answer: <span className="italic">{userAnswer}</span>
          </p>
        )}

        {/* Poster */}
        {movie.poster && (
          <div className="flex justify-center mb-4">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              src={`${import.meta.env.BASE_URL || '/'}${movie.poster.startsWith('/') ? movie.poster.slice(1) : movie.poster}`}
              alt={`${movie.name} poster`}
              className="w-40 h-56 object-cover rounded-lg border-2 border-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.3)]"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes('placeholder.svg')) {
                  img.src = `${import.meta.env.BASE_URL || '/'}placeholder.svg`;
                }
              }}
            />
          </div>
        )}

        {/* Plot */}
        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
          {movie.plot}
        </p>

        {/* Points earned */}
        {correct && (
          <p className={`text-center font-display text-lg mb-4 ${isBonus ? "text-bonus-gold" : "text-neon-purple"}`}>
            +{isBonus ? 20 : 10} points!
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className={`w-full font-display text-lg py-3 rounded-lg ${
            isBonus ? "bg-gradient-bonus text-primary-foreground" : "bg-gradient-neon text-primary-foreground"
          }`}
        >
          NEXT →
        </motion.button>
      </div>
    </div>
  );
};

export default RevealCard;
