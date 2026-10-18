export default function Spinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-slate-200 border-t-accent rounded-full animate-spin`}
      ></div>
    </div>
  );
}