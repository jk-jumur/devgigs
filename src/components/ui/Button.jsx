export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed";
 const variants = {
  // Primary = Midnight Color
  primary: "bg-brand text-white bg-brand-hover shadow-lg shadow-brand/30",
  
  // Accent = Amber Color (For main action buttons)
  accent: "bg-accent text-brand font-bold bg-accent-hover shadow-lg shadow-accent/30",
  
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "border-2 border-gray-200 text-brand hover:border-brand transition-colors",
  danger: "bg-red-600 text-white hover:bg-red-700",
};
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}