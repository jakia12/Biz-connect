/**
 * FormField Component
 * Reusable form field with label, input, and error display
 * Integrates with React Hook Form
 */

import FormError from './FormError';

export default function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  required = false,
  className = '',
  rows,
  options, // For select fields
  ...props
}) {
  const baseInputClasses = `w-full px-4 py-3 rounded-lg border transition-all outline-none ${
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
      : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
  }`;

  const renderInput = () => {
    // Textarea
    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          rows={rows || 4}
          placeholder={placeholder}
          className={`${baseInputClasses} resize-none ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name)}
          {...props}
        />
      );
    }

    // Select
    if (type === 'select') {
      return (
        <select
          id={name}
          className={`${baseInputClasses} bg-white ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name)}
          {...props}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    // Regular input
    return (
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${baseInputClasses} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name)}
        {...props}
      />
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <div id={`${name}-error`} role="alert">
          <FormError message={error.message} />
        </div>
      )}
    </div>
  );
}
