/**
 * Configuration constants for crypto alerts
 */

// Alert thresholds
export const CHEAP_ORDER_THRESHOLD = 50000; // below $50000
export const SOLID_ORDER_THRESHOLD = 10; // above 10 BTC
export const BIG_BIZNIS_THRESHOLD = 1000000; // above $1m

// Time settings
export const ALERT_TIMEFRAME = 60000; // 60 seconds (1 minute) in milliseconds
export const CLEANUP_INTERVAL = 1000; // How often to refresh alert list in ms (1 second) 