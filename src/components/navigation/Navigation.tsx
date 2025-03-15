import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';
import { Loader } from '../common/Loader/Loader';
import './Navigation.scss';

export interface NavigationProps {
  isConnected?: boolean;
  onToggleConnection?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isConnected: propIsConnected, onToggleConnection }) => {
  const context = useGlobalContext();
  
  const isConnected = propIsConnected !== undefined ? propIsConnected : context.isConnected;
  
  const handleToggleConnection = () => {
    if (onToggleConnection) {
      onToggleConnection();
    } else {
      context.toggleConnection();
    }
  };

  const renderConnectionStatus = () => {
    if (!isConnected) {
      return 'Disconnected';
    }
    
    if (isConnected && !context.isReceivingMessages) {
      return (
        <>
          <Loader/> Connected 
        </>
      );
    }
    
    return 'Connected';
  };

  return (
    <div className="navigation">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Monitor</Link>
          <Link to="/alerts" className="nav-link">Alerts</Link>
        </div>
        <div className="socket-controls">
          <button 
            onClick={handleToggleConnection}
            className={`connection-toggle ${isConnected ? 'stop' : 'start'}`}
          >
            {isConnected ? 'Stop socket' : 'Start socket'}
          </button>
          <span className="connection-status">
            Status: {renderConnectionStatus()}
          </span>
        </div>
      </div>
    </div>
  );
}; 