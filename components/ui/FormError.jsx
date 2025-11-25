/**
 * FormError Component
 * Displays validation error messages with consistent styling
 */

import { AlertCircle } from 'lucide-react';

export default function FormError({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-1.5 mt-1.5 text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
