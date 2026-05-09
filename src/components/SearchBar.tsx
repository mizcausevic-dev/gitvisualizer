import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight, X } from 'lucide-react';

interface SearchBarProps {
  initialValue: string;
  onSearch: (username: string) => void;
}

export function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => { setValue(initialValue); }, [initialValue]);

  const submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = value.trim().replace(/^@/, '');
    if (trimmed && trimmed !== initialValue) onSearch(trimmed);
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-md"
    >
      <div className="flex items-center gap-2 bg-surface border border-border-subtle rounded-full pl-5 pr-2 py-2 transition-colors focus-within:border-accent">
        <Search className="w-4 h-4 text-text-mute shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="github username..."
          className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-text placeholder:text-text-mute"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
        />
        {value && value !== initialValue && (
          <button
            type="button"
            onClick={() => setValue(initialValue)}
            aria-label="Clear"
            className="text-text-mute hover:text-text transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Search"
          disabled={!value.trim() || value.trim() === initialValue}
          className="bg-accent text-bg rounded-full p-2 hover:bg-accent-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </motion.form>
  );
}
