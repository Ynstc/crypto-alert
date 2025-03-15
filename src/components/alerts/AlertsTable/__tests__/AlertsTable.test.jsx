import { render, screen } from '@testing-library/react';
import { AlertsTable } from '../AlertsTable';

describe('AlertsTable', () => {
  const mockAlerts = [
    {
      message: 'Test alert 1',
      timestamp: new Date().toISOString(),
      price: 100.50,
      quantity: 1.5,
      totalValue: 150.75
    },
    {
      message: 'Test alert 2', 
      timestamp: new Date().toISOString(),
      price: 0.005,
      quantity: 0.0005,
      totalValue: 0.0025
    }
  ];

  it('renders table with correct data formatting', () => {
    render(<AlertsTable alerts={mockAlerts} emptyMessage="No alerts" />);

    expect(screen.getByText('Test alert 1')).toBeInTheDocument();
    expect(screen.getByText('$100.50')).toBeInTheDocument();
    expect(screen.getByText('1.50')).toBeInTheDocument();
    expect(screen.getByText('$150.75')).toBeInTheDocument();
  });

  it('formats small numbers correctly', () => {
    render(<AlertsTable alerts={mockAlerts} emptyMessage="No alerts" />);

    expect(screen.getByText('$0.00500000')).toBeInTheDocument();
    expect(screen.getByText('0.00050000')).toBeInTheDocument();
    expect(screen.getByText('$0.00250000')).toBeInTheDocument();
  });

  it('displays empty message when no alerts', () => {
    render(<AlertsTable alerts={[]} emptyMessage="No alerts found" />);
    
    expect(screen.getByText('No alerts found')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders all table headers', () => {
    render(<AlertsTable alerts={mockAlerts} emptyMessage="No alerts" />);

    expect(screen.getByText('Alert')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('BTC Amount')).toBeInTheDocument();
    expect(screen.getByText('Total Value')).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    render(<AlertsTable alerts={mockAlerts} emptyMessage="No alerts" />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});
