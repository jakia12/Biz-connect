/**
 * Card Component
 * Reusable card container with header, body, footer sections
 * Usage: <Card><Card.Body>Content</Card.Body></Card>
 */

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`card-header ${className}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`card-body ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`card-footer ${className}`}>{children}</div>;
};
