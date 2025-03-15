import React from 'react';
import { ErrorMessage } from '../components/monitor/ErrorMessage/ErrorMessage';
import { TradesSection } from '../components/monitor/TradesSection/TradesSection';
import { useGlobalContext } from '../context/Context';
import './Monitor.scss';

const Monitor: React.FC = () => {
  const { trades, error } = useGlobalContext();

  return (
    <div className="monitor-page">
      <div className="page-content">
        <h1>BTC/USDT Monitor</h1>
        <ErrorMessage message={error} />
        <TradesSection 
          trades={trades} 
          title="Recent Trades"
        />
      </div>
    </div>
  );
};

export default Monitor; 