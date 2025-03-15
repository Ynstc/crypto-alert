import { useState, useRef, useCallback } from 'react';
import { TradeMessage } from '../types/websocketTypes';
import { debounce } from './helper/debounce';

/**
 * Custom hook for handling message processing for monitor page
 */
export const useMessageProcessing = (): {
  trades: TradeMessage[];
  isProcessingPaused: boolean;
  addTradeToBuffer: (trade: TradeMessage) => void;
  pauseProcessing: () => void;
  resumeProcessing: () => void;
  cleanup: () => void;
} => {
  const [trades, setTrades] = useState<TradeMessage[]>([]);
  const [isProcessingPaused, setIsProcessingPaused] = useState(false);
  const tradesBuffer = useRef<TradeMessage[]>([]);

  // Debounced setTrades function to prevent too many renders
  const debouncedSetTrades = useRef(
    debounce((newTrades: TradeMessage[]) => {
      if (!isProcessingPaused) {
        setTrades(newTrades);
      }
    }, 0)
  ).current;

  const pauseProcessing = useCallback(() => {
    console.log('Pausing message processing');
    setIsProcessingPaused(true);
  }, []);

  const resumeProcessing = useCallback(() => {
    console.log('Resuming message processing');
    setIsProcessingPaused(false);
  }, []);

  // Buffer for trade messages (without alert checking)
  const addTradeToBuffer = useCallback((trade: TradeMessage) => {
    if (!isProcessingPaused) {
      tradesBuffer.current = [trade, ...tradesBuffer.current].slice(0, 500);
      debouncedSetTrades(tradesBuffer.current);
    }
  }, [isProcessingPaused, debouncedSetTrades]);

  const cleanup = useCallback(() => {
    debouncedSetTrades.cancel();
  }, [debouncedSetTrades]);

  return {
    trades,
    isProcessingPaused,
    addTradeToBuffer,
    pauseProcessing,
    resumeProcessing,
    cleanup
  };
}; 