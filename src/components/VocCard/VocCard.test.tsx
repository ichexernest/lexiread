import { render, screen, fireEvent } from '@testing-library/react';
import VocCard from '@/components/VocCard';

jest.mock('react-icons/fa', () => ({
  FaTimes: () => <div data-testid="close-icon">×</div>
}));

jest.mock('@/components/VocInfo', () => {
  return function MockVocInfo({ word }: { word: string }) {
    return <div data-testid="voc-info">VocInfo for: {word}</div>;
  };
});

describe('VocCard', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders vocabulary card correctly', () => {
      render(<VocCard word="hello" onClose={mockOnClose} />);
      
      expect(screen.getByTestId('voc-info')).toBeInTheDocument();
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('passes word prop to VocInfo component', () => {
      render(<VocCard word="programming" onClose={mockOnClose} />);
      
      expect(screen.getByText('VocInfo for: programming')).toBeInTheDocument();
    });

    it('renders close button with correct icon', () => {
      render(<VocCard word="test" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toContainElement(screen.getByTestId('close-icon'));
    });
  });

  describe('CSS Classes and Styling', () => {
    it('applies correct classes to outer container', () => {
      const { container } = render(<VocCard word="styling" onClose={mockOnClose} />);
      
      const outerContainer = container.firstChild as HTMLElement;
      expect(outerContainer).toHaveClass(
        'fixed',
        'bottom-0',
        'left-0',
        'right-0',
        'z-40',
        'flex',
        'justify-center'
      );
    });

    it('applies correct classes to content container', () => {
      render(<VocCard word="content" onClose={mockOnClose} />);
      
      const vocInfo = screen.getByTestId('voc-info');
      const contentContainer = vocInfo.parentElement;
      
      expect(contentContainer).toHaveClass(
        'py-6',
        'px-6',
        'shadow-lg',
        'rounded-t-xl',
        'bg-white/70',
        'backdrop-blur-lg',
        'w-full',
        'max-w-3xl',
        'mx-auto',
        'relative'
      );
    });

    it('applies correct classes to close button', () => {
      render(<VocCard word="button" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toHaveClass('absolute', 'top-4', 'right-4');
    });
  });

  describe('Close Functionality', () => {
    it('calls onClose when close button is clicked', () => {
      render(<VocCard word="closable" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when content area is clicked', () => {
      render(<VocCard word="content-click" onClose={mockOnClose} />);
      
      const vocInfo = screen.getByTestId('voc-info');
      fireEvent.click(vocInfo);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('handles multiple clicks on close button', () => {
      render(<VocCard word="multiple" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      fireEvent.click(closeButton);
      fireEvent.click(closeButton);
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(3);
    });
  });

  describe('Button Attributes', () => {
    it('has correct button type attribute', () => {
      render(<VocCard word="type-test" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toHaveAttribute('type', 'button');
    });

    it('has correct aria-label for accessibility', () => {
      render(<VocCard word="accessibility" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toHaveAttribute('aria-label', 'Close vocabulary information');
    });
  });

  describe('Different Words', () => {
    it('handles simple words', () => {
      render(<VocCard word="cat" onClose={mockOnClose} />);
      
      expect(screen.getByText('VocInfo for: cat')).toBeInTheDocument();
    });

    it('handles complex words', () => {
      render(<VocCard word="unprecedented" onClose={mockOnClose} />);
      
      expect(screen.getByText('VocInfo for: unprecedented')).toBeInTheDocument();
    });

    it('handles words with special characters', () => {
      const specialWord = "don't";
      render(<VocCard word={specialWord} onClose={mockOnClose} />);
      
      expect(screen.getByText(`VocInfo for: ${specialWord}`)).toBeInTheDocument();
    });

    it('handles empty string word', () => {
      render(<VocCard word="" onClose={mockOnClose} />);
      
      expect(screen.getByText('VocInfo for:')).toBeInTheDocument();
    });

    it('handles very long words', () => {
      const longWord = 'antidisestablishmentarianism';
      render(<VocCard word={longWord} onClose={mockOnClose} />);
      
      expect(screen.getByText(`VocInfo for: ${longWord}`)).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('contains VocInfo as child component', () => {
      render(<VocCard word="structure" onClose={mockOnClose} />);
      
      expect(screen.getByTestId('voc-info')).toBeInTheDocument();
    });

    it('has correct nesting structure', () => {
      const { container } = render(<VocCard word="nesting" onClose={mockOnClose} />);
      
      const outerContainer = container.firstChild;
      expect(outerContainer?.children).toHaveLength(1);
      
      const innerContainer = outerContainer?.firstChild;
      expect(innerContainer?.children).toHaveLength(2); // button and VocInfo
    });
  });

  describe('Accessibility', () => {
    it('uses semantic button element for close action', () => {
      render(<VocCard word="semantic" onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton.tagName).toBe('BUTTON');
    });

    it('provides descriptive aria-label', () => {
      render(<VocCard word="descriptive" onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText('Close vocabulary information');
      expect(closeButton).toBeInTheDocument();
    });

    it('has appropriate z-index for modal layering', () => {
      const { container } = render(<VocCard word="layering" onClose={mockOnClose} />);
      
      const outerContainer = container.firstChild as HTMLElement;
      expect(outerContainer).toHaveClass('z-40');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined onClose gracefully', () => {
      // This would typically be a TypeScript error, but testing runtime behavior
      render(<VocCard word="undefined" onClose={undefined as any} />);
      
      const closeButton = screen.getByRole('button');
      // Should not throw error when clicked
      expect(() => fireEvent.click(closeButton)).not.toThrow();
    });

    it('maintains functionality when word changes', () => {
      const { rerender } = render(<VocCard word="first" onClose={mockOnClose} />);
      
      expect(screen.getByText('VocInfo for: first')).toBeInTheDocument();
      
      rerender(<VocCard word="second" onClose={mockOnClose} />);
      
      expect(screen.getByText('VocInfo for: second')).toBeInTheDocument();
      expect(screen.queryByText('VocInfo for: first')).not.toBeInTheDocument();
    });
  });
});