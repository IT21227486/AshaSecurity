import { useTheme } from "../theme/ThemeContext.jsx";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function ThemeToggle({ className = "", label = "Dark Mode" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={cx("inline-flex items-center gap-3", className)}>
      {label ? (
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {label}
        </span>
      ) : null}

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cx(
          "relative inline-flex h-7 w-14 items-center rounded-full transition",
          "ring-1 ring-black/10 bg-zinc-200 hover:bg-zinc-300",
          "dark:ring-white/15 dark:bg-zinc-800 dark:hover:bg-zinc-700",
          isDark ? "bg-teal-500 hover:bg-teal-500" : ""
        )}
      >
        <span
          className={cx(
            "inline-block h-6 w-6 transform rounded-full bg-white shadow transition",
            isDark ? "translate-x-7" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
