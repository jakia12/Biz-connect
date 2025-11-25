/**
 * Input Component
 * Reusable text input with label, helper text, error states
 * Usage: <Input label="Email" placeholder="Enter email" error="Invalid email" />
 */

export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  helper, 
  required = false,
  disabled = false,
  className = '',
  ...props 
}) {
  return (
    <div className="input-group">
      {label && (
        <label className={`input-label ${required ? 'input-label--required' : ''}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`input ${error ? 'input--error' : ''} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {helper && !error && <span className="input-helper">{helper}</span>}
      {error && <span className="input-error">{error}</span>}
    </div>
  );
}
