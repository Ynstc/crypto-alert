import { render, screen } from '@testing-library/react';
import { AlertsSection } from '../AlertsSection';

describe('AlertsSection', () => {
  const mockProps = {
    title: 'Market Alerts',
    description: 'Real-time cryptocurrency market alerts',
    alerts: [
        {
            message: 'Test alert 1 mock',
            timestamp: new Date().toISOString(),
            price: 100.50,
            quantity: 1.5,
            totalValue: 150.75
          },
    ],
    alertCount: 1,
    emptyMessage: 'No alerts found'
  };

  it('renders section title and description correctly', () => {
    render(<AlertsSection {...mockProps} />);

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Market Alerts');
    expect(screen.getByText('Real-time cryptocurrency market alerts')).toBeInTheDocument();
  });

  it('displays empty message when alerts list is empty', () => {
    const propsWithoutAlerts = {
      ...mockProps,
      alerts: [],
      alertCount: 0
    };

    render(<AlertsSection {...propsWithoutAlerts} />);
    expect(screen.getByText('No alerts found')).toBeInTheDocument();
  });
});
