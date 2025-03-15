import React from 'react';
import { TradeMessage } from '../../../types/websocketTypes';
import './TradeInfo.scss';

interface TradeInfoProps {
  data: TradeMessage[];
  alertedTrades: number[];
}

export const TradeInfo: React.FC<TradeInfoProps> = ({ data, alertedTrades }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatQuantity = (quantity: number): string => {
    if (quantity < 0.001) return quantity.toFixed(8);
    if (quantity < 1) return quantity.toFixed(6);
    return quantity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  };

  const formatTotalValue = (price: number, quantity: number): string => {
    const totalValue = price * quantity;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(totalValue);
  };

  const formatTime = (nanoseconds: number): string => {
    const timestamp = new Date(Math.floor(nanoseconds / 1_000_000));
    return timestamp.toLocaleTimeString('en-US', { hour12: false });
  };

  const formatDelay = (nanoseconds: number): string => {
    return (nanoseconds / 1_000_000).toFixed(2) + 'ms';
  };

  return (
    <div className="trade-info-container">
      <div className="trades-count">
        Number of trades: {data.length} 
        {alertedTrades.length > 0 && ` (Alerts: ${alertedTrades.length})`}
      </div>
      <table className="trade-info-table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Time</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((trade, index) => {
              const isAlerted = alertedTrades.includes(index);
              
              return (
                <tr 
                  key={index} 
                  className={isAlerted ? 'alert' : (trade.SIDE === 1 ? 'buy' : 'sell')}
                >
                  <td className="price">{formatPrice(trade.P)}</td>
                  <td className="quantity">{formatQuantity(trade.Q)}</td>
                  <td>{trade.SIDE === 1 ? 'Buy' : 'Sell'}</td>
                  <td className="time">{formatTime(trade.REPORTEDNS)} ({formatDelay(trade.DELAYNS)})</td>
                  <td>{formatTotalValue(trade.P, trade.Q)}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="no-trades-row">No trades to display</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}; 