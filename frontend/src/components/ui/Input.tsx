import type React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = "",
    ...props
}) => {
    const inputClasses = `
    block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
    ${
        error
            ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 text-gray-900"
    }
    ${className}
  `;

    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input className={inputClasses} {...props} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helperText && !error && (
                <p className="text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};
