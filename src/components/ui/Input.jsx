import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, error, className = "", ...props }, ref) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        ref={ref}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
});

export default Input;