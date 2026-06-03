export default function Button({
  children,
  type = "button",
  className = "",
  variant = "primary",
  loading = false,
  ...props
}) {
  const base = `
    w-full
    rounded-xl
    py-3
    text-sm
    font-semibold
    transition-all
    duration-300
    relative
    overflow-hidden
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-cyan-500 to-blue-600
      text-white
      hover:from-cyan-400 hover:to-blue-500
      hover:shadow-[0_0_24px_rgba(6,182,212,0.35)]
      active:scale-[0.99]
    `,
    outline: `
      border border-white/10
      bg-white/[0.04]
      text-slate-300
      hover:bg-white/[0.08]
      hover:border-white/20
    `,
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}