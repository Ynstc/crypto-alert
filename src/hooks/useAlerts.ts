import { useState, useEffect, useCallback } from 'react';
import { Alert, AlertsState } from '../types/alertTypes';
import { TradeMessage } from '../types/websocketTypes';
import { 
  CHEAP_ORDER_THRESHOLD, 
  SOLID_ORDER_THRESHOLD, 
  BIG_BIZNIS_THRESHOLD, 
  ALERT_TIMEFRAME, 
  CLEANUP_INTERVAL 
} from '../config/alertConfig';

/**
 * Custom hook for managing crypto alerts
 */
export const useAlerts = (): {
  alertsState: AlertsState;
  checkAlerts: (trade: TradeMessage) => void;
  addCheapOrderAlert: (message: string, price: number, quantity: number, totalValue: number) => void;
  addSolidOrderAlert: (message: string, price: number, quantity: number, totalValue: number) => void;
  addBigBiznisAlert: (message: string, price: number, quantity: number, totalValue: number) => void;
  resetAllAlerts: () => void;
} => {
  // States for alert history
  const [cheapOrderAlerts, setCheapOrderAlerts] = useState<Alert[]>([]);
  const [solidOrderAlerts, setSolidOrderAlerts] = useState<Alert[]>([]);
  const [bigBiznisAlerts, setBigBiznisAlerts] = useState<Alert[]>([]);
  
  // Counters for alert types
  const [cheapOrderCount, setCheapOrderCount] = useState<number>(0);
  const [solidOrderCount, setSolidOrderCount] = useState<number>(0);
  const [bigBiznisCount, setBigBiznisCount] = useState<number>(0);

  const addCheapOrderAlert = useCallback((message: string, price: number, quantity: number, totalValue: number) => {
    const now = Date.now();
    const newAlert: Alert = {
      timestamp: now,
      message,
      price,
      quantity,
      totalValue
    };
    
    setCheapOrderAlerts(prev => {
      // Filter old alerts and add new one
      const filteredAlerts = prev.filter(alert => now - alert.timestamp < ALERT_TIMEFRAME);
      const updatedAlerts = [newAlert, ...filteredAlerts].slice(0, 1000);
      
      // Update counter immediately
      setCheapOrderCount(updatedAlerts.length);
      
      return updatedAlerts;
    });
  }, []);

  const addSolidOrderAlert = useCallback((message: string, price: number, quantity: number, totalValue: number) => {
    const now = Date.now();
    const newAlert: Alert = {
      timestamp: now,
      message,
      price,
      quantity,
      totalValue
    };
    
    setSolidOrderAlerts(prev => {
      // Filter old alerts and add new one
      const filteredAlerts = prev.filter(alert => now - alert.timestamp < ALERT_TIMEFRAME);
      const updatedAlerts = [newAlert, ...filteredAlerts].slice(0, 1000);
      
      // Update counter immediately
      setSolidOrderCount(updatedAlerts.length);
      
      return updatedAlerts;
    });
  }, []);

  const addBigBiznisAlert = useCallback((message: string, price: number, quantity: number, totalValue: number) => {
    const now = Date.now();
    const newAlert: Alert = {
      timestamp: now,
      message,
      price,
      quantity,
      totalValue
    };
    
    setBigBiznisAlerts(prev => {
      // Filter old alerts and add new one
      const filteredAlerts = prev.filter(alert => now - alert.timestamp < ALERT_TIMEFRAME);
      const updatedAlerts = [newAlert, ...filteredAlerts].slice(0, 1000);
      
      // Update counter immediately
      setBigBiznisCount(updatedAlerts.length);
      
      return updatedAlerts;
    });
  }, []);

  // Checking alert conditions based on received data
  const checkAlerts = useCallback((trade: TradeMessage) => {
    const currentPrice = trade.P;
    const currentQuantity = trade.Q || 0;
    const totalValue = currentPrice * currentQuantity;

    // Checking new types of alerts
    // 1. Cheap order
    if (currentPrice < CHEAP_ORDER_THRESHOLD) {
      const alertMessage = `Price below $${CHEAP_ORDER_THRESHOLD}`;
      addCheapOrderAlert(alertMessage, currentPrice, currentQuantity, totalValue);
    }

    // 2. Solid order
    if (currentQuantity > SOLID_ORDER_THRESHOLD) {
      const alertMessage = `Order contains more than ${SOLID_ORDER_THRESHOLD} BTC`;
      addSolidOrderAlert(alertMessage, currentPrice, currentQuantity, totalValue);
    }

    // 3. Big biznis here
    if (totalValue > BIG_BIZNIS_THRESHOLD) {
      const alertMessage = `Total order value exceeds $${BIG_BIZNIS_THRESHOLD}`;
      addBigBiznisAlert(alertMessage, currentPrice, currentQuantity, totalValue);
    }
  }, [addCheapOrderAlert, addSolidOrderAlert, addBigBiznisAlert]);
  
  // Function to reset all alerts
  const resetAllAlerts = useCallback(() => {
    setCheapOrderAlerts([]);
    setSolidOrderAlerts([]);
    setBigBiznisAlerts([]);
    setCheapOrderCount(0);
    setSolidOrderCount(0);
    setBigBiznisCount(0);
  }, []);

  // Setting interval for cleaning old alerts
  useEffect(() => {
    // Function to clean old alerts
    const cleanupAlerts = () => {
      const now = Date.now();
      
      setCheapOrderAlerts(prev => {
        const filtered = prev.filter(alert => now - alert.timestamp < ALERT_TIMEFRAME);
        setCheapOrderCount(filtered.length);
        return filtered;
      });
      
      setSolidOrderAlerts(prev => {
        const filtered = prev.filter(alert => now - alert.timestamp < ALERT_TIMEFRAME);
        setSolidOrderCount(filtered.length);
        return filtered;
      });
      
      setBigBiznisAlerts(prev => {
        const filtered = prev.filter(alert => now - alert.timestamp < ALERT_TIMEFRAME);
        setBigBiznisCount(filtered.length);
        return filtered;
      });
    };
    
    // Setting interval every 1 second
    const cleanupInterval = setInterval(cleanupAlerts, CLEANUP_INTERVAL);
    
    // Cleaning interval
    return () => clearInterval(cleanupInterval);
  }, []);

  // Aggregated state for alerts
  const alertsState: AlertsState = {
    cheapOrderAlerts,
    solidOrderAlerts,
    bigBiznisAlerts,
    cheapOrderCount,
    solidOrderCount,
    bigBiznisCount
  };

  return {
    alertsState,
    checkAlerts,
    addCheapOrderAlert,
    addSolidOrderAlert,
    addBigBiznisAlert,
    resetAllAlerts
  };
}; 