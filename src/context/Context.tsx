import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCryptoWebSocket } from '../hooks/useCryptoWebSocket';
import { useAlerts } from '../hooks/useAlerts';
import { useMessageProcessing } from '../hooks/useMessageProcessing';
import { MessageType, WebSocketMessage } from '../types/websocketTypes';
import { CryptoContextType } from '../types/alertTypes';

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

interface GlobalContextProps {
  children: ReactNode;
}

export const GlobalContext: React.FC<GlobalContextProps> = ({ children }) => {
  const {
    alertsState,
    checkAlerts,
    addCheapOrderAlert,
    addSolidOrderAlert,
    addBigBiznisAlert,
    resetAllAlerts
  } = useAlerts();

  const {
    trades,
    isProcessingPaused,
    addTradeToBuffer,
    pauseProcessing,
    resumeProcessing,
    cleanup: cleanupMessageProcessing
  } = useMessageProcessing();

  // WebSocket related states
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isReceivingMessages, setIsReceivingMessages] = useState(false);

  const handleMessage = (message: WebSocketMessage) => {
    if (message.TYPE === MessageType.WELCOME) {
      setServerInfo(message);
      setError(null);
    } else if (message.TYPE === MessageType.TRADE) {
      setIsReceivingMessages(true);
      if (!isProcessingPaused) {
        // Add to buffer (monitor page)
        addTradeToBuffer(message);
        // Check for alerts (alert page)
        checkAlerts(message);
      }
    } else if (message.TYPE === MessageType.ERROR) {
      setError(message.error);
      if (message.error.includes('Too many connections')) {
        setIsConnected(true);
      }
    }
  };

  const { toggleConnection: wsToggleConnection } = useCryptoWebSocket(handleMessage);

  const toggleConnection = () => {
    const newConnectionState = wsToggleConnection();
    setIsConnected(newConnectionState);
    if (!newConnectionState) {
      setServerInfo(null);
      setError(null);
      setIsReceivingMessages(false);
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      pauseProcessing();
      
      const resumeProcessingTimeout = setTimeout(() => {
        resumeProcessing();
      }, 300);
      
      return resumeProcessingTimeout;
    };
    
    const timeout = handleLocationChange();
    
    return () => {
      clearTimeout(timeout);
    };
  }, [pauseProcessing, resumeProcessing]);

  useEffect(() => {
    return () => {
      cleanupMessageProcessing();
    };
  }, [cleanupMessageProcessing]);

  const value: CryptoContextType = {
    trades,
    serverInfo,
    error,
    isConnected,
    isReceivingMessages,
    toggleConnection,
    ...alertsState,
    addCheapOrderAlert,
    addSolidOrderAlert,
    addBigBiznisAlert,
    resetAllAlerts,
    pauseProcessing,
    resumeProcessing
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useGlobalContext = (): CryptoContextType => {
  const context = useContext(CryptoContext);
  if (context === undefined) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
}; 