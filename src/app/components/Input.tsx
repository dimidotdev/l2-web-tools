interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-accent-700">
          {label}
        </label>
      )}
      <input
        className={`
          block w-full rounded-md border-primary-300 shadow-sm
          focus:border-accent-500 focus:ring-accent-500
          disabled:bg-primary-100 disabled:text-primary-500
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};