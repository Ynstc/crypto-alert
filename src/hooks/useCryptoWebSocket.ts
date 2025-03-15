import { useEffect, useRef, useCallback } from 'react';
import { config } from '../config/config';
import { WebSocketMessage, MessageType } from '../types/websocketTypes';

type MessageHandler = (message: WebSocketMessage) => void;

export const useCryptoWebSocket = (onMessage: MessageHandler) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const isConnected = useRef<boolean>(false);
  const isReconnecting = useRef<boolean>(false);

  const disconnect = useCallback(() => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      const unsubscribeMsg = {
        action: 'SubRemove',
        subs: [config.subscriptionId]
      };
      ws.current.send(JSON.stringify(unsubscribeMsg));
      ws.current.close();
    }
    isConnected.current = false;
    isReconnecting.current = false;
  }, []);

  const connect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }

    const wsUrl = `${config.wsEndpoint}?api_key=${config.cryptoCompareApiKey}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      isConnected.current = true;
      isReconnecting.current = false;
      
      const subscribeMsg = {
        action: 'SubAdd',
        subs: [config.subscriptionId]
      };
      ws.current?.send(JSON.stringify(subscribeMsg));
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.TYPE === '429') {
          console.log('Too many connections, attempting to reconnect in 5 seconds...');
          isConnected.current = false;
          isReconnecting.current = true;
          
          onMessage({ 
            TYPE: MessageType.ERROR,
            error: 'Too many connections, attempting to reconnect...'
          });
          
          if (ws.current) {
            ws.current.close();
            ws.current = null;
          }
          
          if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
          }
          
          reconnectTimeout.current = setTimeout(() => {
            if (isReconnecting.current) {
              connect();
            }
          }, 5000);
          return;
        }

        onMessage(message);
      } catch (error) {
        console.error('Data parsing error:', error);
        onMessage({ 
          TYPE: MessageType.ERROR,
          error: 'Data parsing error'
        });
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      isConnected.current = false;
      onMessage({ 
        TYPE: MessageType.ERROR,
        error: 'Connection error occurred'
      });
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      isConnected.current = false;
    };
  }, [onMessage]);

  const toggleConnection = useCallback(() => {
    if (isConnected.current || isReconnecting.current) {
      disconnect();
      return false;
    } else {
      connect();
      return true;
    }
  }, [connect, disconnect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected: () => isConnected.current || isReconnecting.current,
    toggleConnection
  };
}; 