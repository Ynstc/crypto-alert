import React from 'react';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message">
      <strong>Error:</strong> {message}
    </div>
  );
}; 