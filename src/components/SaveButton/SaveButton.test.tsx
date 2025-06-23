import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SaveButton from '@/components/SaveButton';

// Mock the toggleSaveItem action
jest.mock('@/actions/saveItems', () => ({
  toggleSaveItem: jest.fn()
}));

jest.mock('@/components/MainButton', () => {
  return function MockMainButton({ 
    size, 
    icon, 
    hint, 
    haveHint, 
    onClick 
  }: { 
    size?: string; 
    icon: React.ReactNode; 
    hint: string; 
    haveHint: boolean; 
    onClick?: () => void; 
  }) {
    return (
      <button 
        data-testid="main-button" 
        data-size={size}
        data-hint={hint}
        data-have-hint={haveHint}
        onClick={onClick}
      >
        {icon}
      </button>
    );
  };
});

jest.mock('react-icons/fa', () => ({
  FaBookmark: ({ className }: { className?: string }) => (
    <div data-testid="bookmark-icon" className={className}>Bookmark</div>
  )
}));

describe('SaveButton', () => {
  const { toggleSaveItem } = require('@/actions/saveItems');

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset implementation for each test
    toggleSaveItem.mockResolvedValue({ success: true });
  });

  describe('Rendering', () => {
    it('renders save button when not saved', () => {
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-hint', 'Save');
    });

    it('renders unsave button when saved', () => {
      render(<SaveButton isSaved={true} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-hint', 'Unsave');
    });

    it('uses small size by default', () => {
      render(<SaveButton isSaved={false} saveType="voc" saveId="456" />);
      
      const button = screen.getByTestId('main-button');
      expect(button).toHaveAttribute('data-size', 'sm');
    });

    it('enables hint by default', () => {
      render(<SaveButton isSaved={false} saveType="voc" saveId="789" />);
      
      const button = screen.getByTestId('main-button');
      expect(button).toHaveAttribute('data-have-hint', 'true');
    });
  });

  describe('Icon Styling', () => {
    it('shows secondary color icon when saved', () => {
      render(<SaveButton isSaved={true} saveType="article" saveId="123" />);
      
      const icon = screen.getByTestId('bookmark-icon');
      expect(icon).toHaveClass('text-secondary');
    });

    it('shows gray icon when not saved', () => {
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const icon = screen.getByTestId('bookmark-icon');
      expect(icon).toHaveClass('text-gray-300');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when processing', async () => {
      // Make toggleSaveItem hang to test loading state
      toggleSaveItem.mockImplementation(() => new Promise(() => {}));
      
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
      });
    });

    it('shows spinner with correct styling during loading', async () => {
      toggleSaveItem.mockImplementation(() => new Promise(() => {}));
      
      render(<SaveButton isSaved={false} saveType="voc" saveId="456" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toHaveClass(
          'animate-spin',
          'rounded-full',
          'w-[40px]',
          'h-[40px]',
          'border-b-2',
          'border-white'
        );
      });
    });

    it('hides main button during loading', async () => {
      toggleSaveItem.mockImplementation(() => new Promise(() => {}));
      
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.queryByTestId('main-button')).not.toBeInTheDocument();
      });
    });
  });

  describe('Save/Unsave Functionality', () => {
    it('calls toggleSaveItem with save action when not saved', async () => {
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(toggleSaveItem).toHaveBeenCalledWith('article', '123', 'save');
      });
    });

    it('calls toggleSaveItem with unsave action when saved', async () => {
      render(<SaveButton isSaved={true} saveType="voc" saveId="456" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(toggleSaveItem).toHaveBeenCalledWith('voc', '456', 'unsave');
      });
    });

    it('updates saved state on successful save', async () => {
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByTestId('main-button')).toHaveAttribute('data-hint', 'Unsave');
      });
    });

    it('updates saved state on successful unsave', async () => {
      render(<SaveButton isSaved={true} saveType="voc" saveId="456" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByTestId('main-button')).toHaveAttribute('data-hint', 'Save');
      });
    });
  });

  describe('Error Handling', () => {
    it('shows alert and maintains state on API failure', async () => {
      toggleSaveItem.mockResolvedValue({ success: false, message: 'Network error' });
      
      // Mock window.alert
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Network error');
      });
      
      // State should remain unchanged
      expect(screen.getByTestId('main-button')).toHaveAttribute('data-hint', 'Save');
      
      alertSpy.mockRestore();
    });

    it('shows default error message when none provided', async () => {
      toggleSaveItem.mockResolvedValue({ success: false });
      
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<SaveButton isSaved={true} saveType="voc" saveId="789" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('操作失敗');
      });
      
      alertSpy.mockRestore();
    });

    it('handles API exceptions gracefully', async () => {
      toggleSaveItem.mockRejectedValue(new Error('API Error'));
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to toggle save item:', expect.any(Error));
      });
      
      consoleSpy.mockRestore();
    });
  });

  describe('Multiple Clicks Prevention', () => {
    it('prevents multiple clicks during loading', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });
      toggleSaveItem.mockReturnValue(promise);
      
      render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      // Wait for the first click to start processing
      await waitFor(() => {
        const spinner = document.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
      });
      
      // Resolve the promise
      resolvePromise!({ success: true });
      
      await waitFor(() => {
        expect(toggleSaveItem).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Different Save Types', () => {
    it('handles article save type', async () => {
      render(<SaveButton isSaved={false} saveType="article" saveId="article-123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(toggleSaveItem).toHaveBeenCalledWith('article', 'article-123', 'save');
      });
    });

    it('handles vocabulary save type', async () => {
      render(<SaveButton isSaved={false} saveType="voc" saveId="vocab-456" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(toggleSaveItem).toHaveBeenCalledWith('voc', 'vocab-456', 'save');
      });
    });

    it('handles custom save types', async () => {
      render(<SaveButton isSaved={false} saveType="custom" saveId="custom-789" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(toggleSaveItem).toHaveBeenCalledWith('custom', 'custom-789', 'save');
      });
    });
  });

  describe('State Management', () => {
    it('maintains internal state independent of props', async () => {
      const { rerender } = render(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByTestId('main-button')).toHaveAttribute('data-hint', 'Unsave');
      });
      
      // Re-render with same props - internal state should be maintained
      rerender(<SaveButton isSaved={false} saveType="article" saveId="123" />);
      
      expect(screen.getByTestId('main-button')).toHaveAttribute('data-hint', 'Unsave');
    });

    it('initializes state from isSaved prop', () => {
      render(<SaveButton isSaved={true} saveType="voc" saveId="456" />);
      
      expect(screen.getByTestId('main-button')).toHaveAttribute('data-hint', 'Unsave');
      expect(screen.getByTestId('bookmark-icon')).toHaveClass('text-secondary');
    });
  });
});