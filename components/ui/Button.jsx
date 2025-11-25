/**
 * Button Component
 * Reusable button with multiple variants and sizes
 * Usage: <Button variant="primary" size="md" onClick={handleClick}>Click Me</Button>
 */

'use client';

import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left', 
  className = '', 
  disabled = false,
  type = 'button',
  onClick,
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();
  
  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </motion.button>
  );
}
