export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed";
const variants = {
  primary: "bg-brand text-white bg-brand-hover shadow-lg shadow-brand/30 hover:-translate-y-0.5 transition-all",
  accent: "bg-accent text-brand font-bold bg-accent-hover shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:-translate-y-0.5 transition-all",
  outline: "border-2 border-slate-200 text-brand hover:border-brand transition-colors dark:text-white dark:border-slate-700 dark:hover:border-accent",
  danger: "bg-red-600 text-white hover:bg-red-700",
};
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}