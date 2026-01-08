import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ClipboardPaste, Search, CheckCircle2, XCircle, LogOut, Sparkles } from "lucide-react";

interface CheckerPanelProps {
  username: string;
  onLogout: () => void;
}

interface CheckResult {
  id: string;
  value: string;
  status: "valid" | "invalid" | "checking";
}

const CheckerPanel = ({ username, onLogout }: CheckerPanelProps) => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<CheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  const handleCheck = async () => {
    if (!inputValue.trim()) return;

    setIsChecking(true);
    const lines = inputValue.split("\n").filter((line) => line.trim());

    // Add items as checking
    const newResults: CheckResult[] = lines.map((line, index) => ({
      id: `${Date.now()}-${index}`,
      value: line.trim(),
      status: "checking" as const,
    }));

    setResults(newResults);

    // Simulate checking each item
    for (let i = 0; i < newResults.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));
      setResults((prev) =>
        prev.map((r, idx) =>
          idx === i ? { ...r, status: Math.random() > 0.5 ? "valid" : "invalid" } : r
        )
      );
    }

    setIsChecking(false);
  };

  const validCount = results.filter((r) => r.status === "valid").length;
  const invalidCount = results.filter((r) => r.status === "invalid").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel rounded-2xl w-full max-w-2xl relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center neon-border">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text font-mono">GAYPAL CHECKER</h1>
              <p className="text-xs text-muted-foreground">Hej, <span className="text-primary font-semibold">{username}</span> 👋</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300 text-sm"
          >
            <LogOut className="w-4 h-4" />
            Wyloguj
          </motion.button>
        </div>

        {/* Main content */}
        <div className="p-6 space-y-6">
          {/* Input area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Wklej dane do sprawdzenia
            </label>
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Wklej tutaj dane (każda linia = jeden wpis)"
                className="w-full h-32 bg-secondary/30 border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary input-glow transition-all duration-300 font-mono text-sm resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePaste}
                className="absolute top-3 right-3 p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <ClipboardPaste className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Check button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheck}
            disabled={isChecking || !inputValue.trim()}
            className="w-full py-4 rounded-xl font-semibold text-primary-foreground bg-primary btn-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono tracking-wide flex items-center justify-center gap-3"
          >
            {isChecking ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                SPRAWDZANIE...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                SPRAWDŹ
              </>
            )}
          </motion.button>

          {/* Results */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Stats */}
              <div className="flex gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1 p-4 rounded-xl bg-success/10 border border-success/30"
                >
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-mono font-bold text-lg">{validCount}</span>
                    <span className="text-sm">Valid</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 p-4 rounded-xl bg-destructive/10 border border-destructive/30"
                >
                  <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="w-5 h-5" />
                    <span className="font-mono font-bold text-lg">{invalidCount}</span>
                    <span className="text-sm">Invalid</span>
                  </div>
                </motion.div>
              </div>

              {/* Results list */}
              <div className="max-h-48 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      result.status === "valid"
                        ? "bg-success/5 border-success/30"
                        : result.status === "invalid"
                        ? "bg-destructive/5 border-destructive/30"
                        : "bg-secondary/30 border-border"
                    }`}
                  >
                    {result.status === "checking" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                      />
                    ) : result.status === "valid" ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <span className="font-mono text-sm truncate flex-1">{result.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="px-6 py-4 border-t border-border/50 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <Sparkles className="w-3 h-3" />
          Powered by Advanced Checking Engine™
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckerPanel;
