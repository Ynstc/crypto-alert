import React, { useState, useEffect } from 'react';
import { TradeInfo } from '../TradeInfo/TradeInfo';
import { TradeMessage } from '../../../types/websocketTypes';
import { 
  CHEAP_ORDER_THRESHOLD, 
  SOLID_ORDER_THRESHOLD, 
  BIG_BIZNIS_THRESHOLD 
} from '../../../config/alertConfig';
import './TradesSection.scss';

interface TradesSectionProps {
  trades: TradeMessage[];
  title: string;
}

export const TradesSection: React.FC<TradesSectionProps> = ({
  trades,
  title
}) => {
  const [alertedTrades, setAlertedTrades] = useState<number[]>([]);

  useEffect(() => {
    if (trades.length > 0) {
      const alertedTradesIndexes = trades
        .map((trade, index) => ({
          index,
          price: trade.P, 
          quantity: trade.Q, 
          totalValue: trade.P * trade.Q 
        }))
        .filter(item => 
          item.totalValue > BIG_BIZNIS_THRESHOLD ||
          item.quantity > SOLID_ORDER_THRESHOLD ||
          item.price < CHEAP_ORDER_THRESHOLD
        )
        .map(item => item.index);
      
      setAlertedTrades(alertedTradesIndexes);
    }
  }, [trades]);

  return (
    <section className="trades-section">
      <div className="trades-header">
        <h2>{title}</h2>
      </div>
      <TradeInfo 
        data={trades} 
        alertedTrades={alertedTrades} 
      />
    </section>
  );
}; 