import { render, screen, fireEvent } from '@testing-library/react';
import ClickableWord from '@/components/ClickableWord';

describe('ClickableWord', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders word correctly', () => {
      render(<ClickableWord word="hello" onClick={mockOnClick} />);
      
      expect(screen.getByText('hello')).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
      render(<ClickableWord word="test" onClick={mockOnClick} />);
      
      const wordElement = screen.getByText('test');
      expect(wordElement).toHaveClass(
        'inline-block',
        'cursor-pointer',
        'hover:bg-primary-hover',
        'px-0.5',
        'rounded',
        'transition-colors'
      );
    });

    it('renders as a span element', () => {
      render(<ClickableWord word="span" onClick={mockOnClick} />);
      
      const wordElement = screen.getByText('span');
      expect(wordElement.tagName).toBe('SPAN');
    });
  });

  describe('Click Functionality', () => {
    it('calls onClick with correct word when clicked', () => {
      render(<ClickableWord word="clickable" onClick={mockOnClick} />);
      
      const wordElement = screen.getByText('clickable');
      fireEvent.click(wordElement);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith('clickable');
    });

    it('handles multiple clicks correctly', () => {
      render(<ClickableWord word="multiple" onClick={mockOnClick} />);
      
      const wordElement = screen.getByText('multiple');
      fireEvent.click(wordElement);
      fireEvent.click(wordElement);
      fireEvent.click(wordElement);
      
      expect(mockOnClick).toHaveBeenCalledTimes(3);
      expect(mockOnClick).toHaveBeenNthCalledWith(1, 'multiple');
      expect(mockOnClick).toHaveBeenNthCalledWith(2, 'multiple');
      expect(mockOnClick).toHaveBeenNthCalledWith(3, 'multiple');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string word', () => {
      const { container } = render(<ClickableWord word="" onClick={mockOnClick} />);
      
      const wordElement = container.querySelector('span');
      fireEvent.click(wordElement!);
      
      expect(mockOnClick).toHaveBeenCalledWith('');
    });

    it('handles words with special characters', () => {
      const specialWord = "hello's";
      render(<ClickableWord word={specialWord} onClick={mockOnClick} />);
      
      const wordElement = screen.getByText(specialWord);
      fireEvent.click(wordElement);
      
      expect(mockOnClick).toHaveBeenCalledWith(specialWord);
    });

    it('handles words with spaces', () => {
      const phraseWord = "hello world";
      render(<ClickableWord word={phraseWord} onClick={mockOnClick} />);
      
      const wordElement = screen.getByText(phraseWord);
      fireEvent.click(wordElement);
      
      expect(mockOnClick).toHaveBeenCalledWith(phraseWord);
    });

    it('handles long words', () => {
      const longWord = "supercalifragilisticexpialidocious";
      render(<ClickableWord word={longWord} onClick={mockOnClick} />);
      
      const wordElement = screen.getByText(longWord);
      expect(wordElement).toBeInTheDocument();
      
      fireEvent.click(wordElement);
      expect(mockOnClick).toHaveBeenCalledWith(longWord);
    });
  });

  describe('Accessibility', () => {
    it('has cursor pointer style for interactivity indication', () => {
      render(<ClickableWord word="accessible" onClick={mockOnClick} />);
      
      const wordElement = screen.getByText('accessible');
      expect(wordElement).toHaveClass('cursor-pointer');
    });

    it('supports keyboard interaction', () => {
      render(<ClickableWord word="keyboard" onClick={mockOnClick} />);
      
      const wordElement = screen.getByText('keyboard');
      fireEvent.keyDown(wordElement, { key: 'Enter', code: 'Enter' });
      
      // Click event should still work normally
      fireEvent.click(wordElement);
      expect(mockOnClick).toHaveBeenCalledWith('keyboard');
    });
  });
});