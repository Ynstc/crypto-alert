import { render, screen, waitFor } from '@testing-library/react';
import { TradesSection } from '../TradesSection';

describe('TradesSection', () => {
  const mockTrades = [
    {
      P: 50000.50, // normal price
      Q: 1.5,      // normal quantity
      SIDE: 1,
      REPORTEDNS: 1678901234567000000,
      DELAYNS: 150000000
    },
    {
      P: 0.0005,   // cheap price - should trigger alert
      Q: 1.0,
      SIDE: 0,
      REPORTEDNS: 1678901234567000000,
      DELAYNS: 250000000
    },
    {
      P: 45000.00,  // normal price
      Q: 100.0,     // large quantity - should trigger alert
      SIDE: 1,
      REPORTEDNS: 1678901234567000000,
      DELAYNS: 150000000
    },
    {
      P: 50000.00,  // high total value - should trigger alert
      Q: 50.0,
      SIDE: 0,
      REPORTEDNS: 1678901234567000000,
      DELAYNS: 150000000
    }
  ];

  it('renders title correctly', () => {
    render(<TradesSection trades={mockTrades} title="Recent Trades" />);
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Recent Trades');
  });

  it('identifies trades that should be alerted based on cheap price', async () => {
    render(<TradesSection trades={mockTrades} title="Recent Trades" />);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1); 
      expect(rows[1]).toHaveClass('alert'); // Second trade has price below CHEAP_ORDER_THRESHOLD
    });
  });

  it('identifies trades that should be alerted based on large quantity', async () => {
    render(<TradesSection trades={mockTrades} title="Recent Trades" />);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      expect(rows[2]).toHaveClass('alert'); // Third trade has quantity above SOLID_ORDER_THRESHOLD
    });
  });

  it('identifies trades that should be alerted based on total value', async () => {
    render(<TradesSection trades={mockTrades} title="Recent Trades" />);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      expect(rows[3]).toHaveClass('alert'); // Fourth trade has total value above BIG_BIZNIS_THRESHOLD
    });
  });

  it('handles empty trades array', () => {
    render(<TradesSection trades={[]} title="Recent Trades" />);
    
    expect(screen.getByText('No trades to display')).toBeInTheDocument();
  });

  it('updates alerts when trades change', async () => {
    const { rerender } = render(<TradesSection trades={[]} title="Recent Trades" />);
    
    expect(screen.getByText('No trades to display')).toBeInTheDocument();
    
    rerender(<TradesSection trades={mockTrades} title="Recent Trades" />);
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      expect(rows[1]).toHaveClass('alert');
    });

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      expect(rows[2]).toHaveClass('alert');
    });

    await waitFor(() => {
      const rows = screen.getAllByRole('row').slice(1);
      expect(rows[3]).toHaveClass('alert');
    });
  });
});
