import { render, screen } from '@testing-library/react';
import { TradeInfo } from '../TradeInfo';

describe('TradeInfo', () => {
  const mockTrades = [
    {
      P: 50000.50,
      Q: 1.5,
      SIDE: 1, // Buy
      REPORTEDNS: 1678901234567000000, // timestamp
      DELAYNS: 150000000 // 150ms in nanoseconds
    },
    {
      P: 0.00055,
      Q: 0.0005,
      SIDE: 0, // Sell
      REPORTEDNS: 1678901234567000000,
      DELAYNS: 250000000 // 250ms in nanoseconds
    }
  ];

  it('renders trade table with correct formatting', () => {
    render(<TradeInfo data={mockTrades} alertedTrades={[]} />);

    expect(screen.getByText('$50,000.50')).toBeInTheDocument();
    expect(screen.getByText('1.50')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText(/150.00ms/)).toBeInTheDocument();
    expect(screen.getByText('$75,000.75')).toBeInTheDocument();
  });

  it('displays correct trade count and alerts count', () => {
    render(<TradeInfo data={mockTrades} alertedTrades={[0]} />);
    
    expect(screen.getByText('Number of trades: 2 (Alerts: 1)')).toBeInTheDocument();
  });

  it('applies correct CSS classes for buy/sell/alert trades', () => {
    render(<TradeInfo data={mockTrades} alertedTrades={[0]} />);

    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    expect(rows[0]).toHaveClass('alert');
    expect(rows[1]).toHaveClass('sell');
  });

  it('displays no trades message when data is empty', () => {
    render(<TradeInfo data={[]} alertedTrades={[]} />);

    expect(screen.getByText('No trades to display')).toBeInTheDocument();
    expect(screen.getByText('Number of trades: 0')).toBeInTheDocument();
  });

  it('renders all table headers', () => {
    render(<TradeInfo data={mockTrades} alertedTrades={[]} />);

    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Total Value')).toBeInTheDocument();
  });
});
