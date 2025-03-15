import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div data-testid="loader" className="loader">
      <div className="loader__spinner" />
    </div>
  );
}; 