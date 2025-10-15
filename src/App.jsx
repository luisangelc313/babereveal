// src/App.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  const [step, setStep] = useState("start"); // start | countdown | reveal
  const [count, setCount] = useState(3);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const handleStart = () => setStep("countdown");

  useEffect(() => {
    if (step === "countdown" && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === "countdown" && count === 0) {
      setTimeout(() => setStep("reveal"), 500);
    }
  }, [step, count]);

  useEffect(() => {
    if (step === "reveal") {
      launchConfetti();
      playSound();
    }
  }, [step]);

  const launchConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#007BFF", "#FFFFFF"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#007BFF", "#FFFFFF"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const playSound = () => {
    if (audioPlayed) return;
    const audio = new Audio("/celebration.wav");
    audio.play();
    setAudioPlayed(true);
  };

  return (
    <div className="flex flex-col items-center bg-red-500 justify-center min-h-screen w-full bg-gradient-to-b from-sky-100 to-sky-300 text-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 30px #303030ff" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              padding={16}
              className="bg-gradient-to-r from-pink-400 via-sky-400 to-blue-500 text-white font-extrabold py-7 px-16 rounded-full shadow-2xl text-3xl border-4 border-white drop-shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-blue-400 focus:outline-none focus:ring-4 focus:ring-pink-300 flex items-center gap-5 p-10"
            >
              <span className="text-4xl animate-bounce">🎁</span>
              <span>Descubre el sexo del bebé</span>
              <span className="text-4xl animate-bounce">👶</span>
            </motion.button>
          </motion.div>
        )}
        {step === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sky-700 font-bold text-8xl flex items-center justify-center w-full"
          >
            {count}
          </motion.div>
        )}
        {step === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <h1 className="text-6xl font-bold text-sky-700 mb-6">¡Es niño! 💙</h1>
            <motion.img
              src="/baby-boy.png"
              alt="Bebé"
              width={260}
              height={260}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-32 h-32"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
