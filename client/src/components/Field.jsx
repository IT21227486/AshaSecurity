export function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-3">
        <div className="text-xs text-zinc-700 dark:text-zinc-300">{label}</div>
        {hint ? <div className="text-xs text-zinc-500 dark:text-zinc-500">{hint}</div> : null}
      </div>
      <div className="mt-1">{children}</div>
      {error ? <div className="mt-2 text-xs text-red-600 dark:text-red-300">{error}</div> : null}
    </label>
  );
}
