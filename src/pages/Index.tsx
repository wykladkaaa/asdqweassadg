import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginPanel from "@/components/LoginPanel";
import CheckerPanel from "@/components/CheckerPanel";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-grid relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-2xl" />
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <LoginPanel key="login" onLogin={(nick) => { setUsername(nick); setIsLoggedIn(true); }} />
        ) : (
          <CheckerPanel key="checker" username={username} onLogout={() => setIsLoggedIn(false)} />
        )}
      </AnimatePresence>

      {/* Version badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-6 right-6 px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground font-mono"
      >
        v2.0.0
      </motion.div>
    </div>
  );
};

export default Index;
