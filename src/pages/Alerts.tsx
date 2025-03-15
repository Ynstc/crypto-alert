import React from 'react';
import { useGlobalContext } from '../context/Context';
import { AlertsSection } from '../components/alerts/AlertsSection/AlertsSection';
import './Alerts.scss';
import { ErrorMessage } from '../components/monitor/ErrorMessage/ErrorMessage';

const Alerts: React.FC = () => {
  const { 
    trades, 
    cheapOrderAlerts,
    solidOrderAlerts,
    bigBiznisAlerts,
    cheapOrderCount,
    solidOrderCount,
    bigBiznisCount,
    error
  } = useGlobalContext();

  const getCurrentPrice = () => {
    if (trades.length > 0) {
      const price = trades[0].P;
      if (price === 0) return '$0.00';
      if (price < 0.01) return `$${price.toFixed(8)}`;
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return null;
  };

  return (
    <div className="alerts-page">
      <div className="page-content">
        <h1>Price Alerts</h1>
        <ErrorMessage message={error} />
        <div className="current-price">
          <h2>Current price: {getCurrentPrice() || 'Waiting for data...'}</h2>
        </div>
        
        <div className="alerts-containers">
          <AlertsSection
            title="Cheap Order Alerts"
            description="Alert when price is below $50,000"
            alerts={cheapOrderAlerts}
            alertCount={cheapOrderCount}
            emptyMessage="No Cheap Order alerts in the last minute"
          />
          
          <AlertsSection
            title="Solid Order Alerts"
            description="Alert when order contains more than 10 BTC"
            alerts={solidOrderAlerts}
            alertCount={solidOrderCount}
            emptyMessage="No Solid Order alerts in the last minute"
          />
          
          <AlertsSection
            title="Big Biznis Alerts"
            description="Alert when order value exceeds $1,000,000"
            alerts={bigBiznisAlerts}
            alertCount={bigBiznisCount}
            emptyMessage="No Big Biznis alerts in the last minute"
          />
        </div>
      </div>
    </div>
  );
};

export default Alerts; 