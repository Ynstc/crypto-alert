import React from 'react';
import { Alert } from '../../../types/alertTypes';
import './AlertsTable.scss';

interface AlertsTableProps {
  alerts: Alert[];
  emptyMessage: string;
}

export const AlertsTable: React.FC<AlertsTableProps> = ({ alerts, emptyMessage }) => {
  if (alerts.length === 0) {
    return <div className="empty-message">{emptyMessage}</div>;
  }

  const formatPrice = (price: number): string => {
    if (price === 0) return '$0.00';
    if (price < 0.01) return `$${price.toFixed(8)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatQuantity = (quantity: number): string => {
    if (quantity === 0) return '0';
    if (quantity < 0.001) return quantity.toFixed(8);
    if (quantity < 1) return quantity.toFixed(6);
    return quantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
  };

  const formatTotalValue = (value: number): string => {
    if (value === 0) return '$0.00';
    if (value < 0.01) return `$${value.toFixed(8)}`;
    if (value < 1) return `$${value.toFixed(4)}`;
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  return (
    <div className="alerts-table-container">
      <table className="alerts-table">
        <thead>
          <tr>
            <th>Alert</th>
            <th>Price</th>
            <th>BTC Amount</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert, index) => (
            <tr key={`${alert.timestamp}-${alert.totalValue}`}>
              <td>{alert.message}</td>
              <td>{formatPrice(alert.price)}</td>
              <td>{formatQuantity(alert.quantity)}</td>
              <td>{formatTotalValue(alert.totalValue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

