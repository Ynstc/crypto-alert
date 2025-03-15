import React from 'react';
import { Alert } from '../../../types/alertTypes';
import { AlertsTable } from '../AlertsTable/AlertsTable';
import './AlertsSection.scss';

interface AlertsSectionProps {
  title: string;
  description: string;
  alerts: Alert[];
  alertCount: number;
  emptyMessage: string;
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({
  title,
  description,
  alerts,
  alertCount,
  emptyMessage
}) => {
  return (
    <section className="alerts-section">
      <div className="alert-header">
        <h3>{title}</h3>
        <div className="alert-count">Number of alerts in the last 60 seconds: {alertCount}</div>
      </div>
      <p className="alert-description">{description}</p>
      <AlertsTable
        alerts={alerts}
        emptyMessage={emptyMessage}
      />
    </section>
  );
}; 