export default function Badge({ children, color = "indigo" }) {
  const colors = {
    
    brand: "bg-brand text-white",
    accent: "bg-accent text-brand font-bold",
   
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-slate-100 text-slate-600",
  };
  return <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${colors[color]}`}>{children}</span>;
}