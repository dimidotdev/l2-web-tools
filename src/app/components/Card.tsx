interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-white rounded-lg shadow-sm
      border border-primary-200
      p-6 hover:shadow-md transition-shadow duration-200
      ${className}
    `}>
      {children}
    </div>
  );
};