import { TradeMessage, WelcomeMessage } from './websocketTypes';

/**
 * Interface for alert data
 */
export interface Alert {
  timestamp: number;
  message: string;
  price: number;
  quantity: number;
  totalValue: number;
}

/**
 * Interface for alerts state 
 */
export interface AlertsState {
  cheapOrderAlerts: Alert[];
  solidOrderAlerts: Alert[];
  bigBiznisAlerts: Alert[];
  
  cheapOrderCount: number;
  solidOrderCount: number;
  bigBiznisCount: number;
}

/**
 * Interface for the Crypto context
 */
export interface CryptoContextType {
  // WebSocket related
  trades: TradeMessage[];
  serverInfo: WelcomeMessage | null;
  error: string | null;
  isConnected: boolean;
  isReceivingMessages: boolean;
  toggleConnection: () => void;
  
  // Alert collections
  cheapOrderAlerts: Alert[];
  solidOrderAlerts: Alert[];
  bigBiznisAlerts: Alert[];
  
  // Alert counters
  cheapOrderCount: number;
  solidOrderCount: number;
  bigBiznisCount: number;
  
  // Alert methods
  addCheapOrderAlert: (message: string, price: number, quantity: number, totalValue: number) => void;
  addSolidOrderAlert: (message: string, price: number, quantity: number, totalValue: number) => void;
  addBigBiznisAlert: (message: string, price: number, quantity: number, totalValue: number) => void;
  resetAllAlerts: () => void;
  
  // Processing control
  pauseProcessing: () => void;
  resumeProcessing: () => void;
} 