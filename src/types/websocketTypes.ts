export enum MessageType {
  WELCOME = '20',
  SUBSCRIBE_COMPLETE = '16',
  LOAD_COMPLETE = '3',
  TRADE = '8',
  ERROR = 'ERROR'
}

export interface WelcomeMessage {
  TYPE: MessageType.WELCOME;
  MESSAGE: 'STREAMERWELCOME';
  SERVER_NAME: string;
  SERVER_TIME_MS: number;
  CLIENT_ID: number;
  SOCKET_ID: string;
  SOCKETS_ACTIVE: number;
  SOCKETS_REMAINING: number;
  RATELIMIT_MAX_SECOND: number;
  RATELIMIT_MAX_MINUTE: number;
  RATELIMIT_MAX_HOUR: number;
  RATELIMIT_MAX_DAY: number;
  RATELIMIT_MAX_MONTH: number;
  RATELIMIT_REMAINING_SECOND: number;
  RATELIMIT_REMAINING_MINUTE: number;
  RATELIMIT_REMAINING_HOUR: number;
  RATELIMIT_REMAINING_DAY: number;
  RATELIMIT_REMAINING_MONTH: number;
}

export interface SubscribeCompleteMessage {
  TYPE: MessageType.SUBSCRIBE_COMPLETE;
  MESSAGE: 'SUBSCRIBECOMPLETE';
  SUB: string;
}

export interface LoadCompleteMessage {
  TYPE: MessageType.LOAD_COMPLETE;
  MESSAGE: 'LOADCOMPLETE';
  INFO: string;
}

export interface TradeMessage {
  TYPE: MessageType.TRADE;
  M: string;          // Market (e.g. "Binance")
  FSYM: string;       // From Symbol (e.g. "BTC")
  TSYM: string;       // To Symbol (e.g. "USDT")
  SIDE: number;       // Trade side (0 = sell, 1 = buy)
  ACTION: number;     // Action type
  P: number;          // Price
  Q: number;          // Quantity
  CCSEQ: number;      // Sequence ID
  SEQ: number;        // Trade sequence
  REPORTEDNS: number; // Timestamp in nanoseconds
  DELAYNS: number;    // Delay in nanoseconds
}

export interface ErrorMessage {
  TYPE: MessageType.ERROR;
  error: string;
}

export type WebSocketMessage = 
  | WelcomeMessage 
  | SubscribeCompleteMessage 
  | LoadCompleteMessage 
  | TradeMessage
  | ErrorMessage; 