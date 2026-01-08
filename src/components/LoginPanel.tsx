import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle, Zap } from "lucide-react";
import { accounts } from "@/config/accounts";

interface LoginPanelProps {
  onLogin: (username: string) => void;
}

const LoginPanel = ({ onLogin }: LoginPanelProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Sprawdź czy konto istnieje w pliku accounts.ts
    const validAccount = accounts.find(
      (acc) => acc.login === username && acc.password === password
    );

    if (validAccount) {
      onLogin(username);
    } else {
      setError("Nieprawidłowe dane logowania");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel rounded-2xl p-8 w-full max-w-md relative overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center neon-border"
          >
            <Zap className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text font-mono">GAYPAL CHECKER</h1>
          <p className="text-muted-foreground text-sm mt-2">Zaloguj się aby kontynuować</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Nazwa użytkownika
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary input-glow transition-all duration-300 font-mono"
                placeholder="admin"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Hasło
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary input-glow transition-all duration-300 font-mono"
                placeholder="••••••"
              />
            </div>
          </motion.div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-3"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-semibold text-primary-foreground bg-primary btn-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono tracking-wide"
          >
            {isLoading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                Logowanie...
              </motion.span>
            ) : (
              "ZALOGUJ SIĘ"
            )}
          </motion.button>
        </form>

      </div>
    </motion.div>
  );
};

export default LoginPanel;
