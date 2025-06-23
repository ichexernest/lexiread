import { render, screen } from '@testing-library/react';
import FinishLine from '@/components/FinishLine';

describe('FinishLine', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<FinishLine />);
      
      expect(screen.getByText('Lexiread')).toBeInTheDocument();
    });

    it('applies default CSS classes', () => {
      const { container } = render(<FinishLine />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement).toHaveClass(
        'flex',
        'justify-center',
        'items-center'
      );
    });

    it('renders text with correct styling', () => {
      render(<FinishLine />);
      
      const textElement = screen.getByText('Lexiread');
      expect(textElement).toHaveClass('text-sm', 'font-bold');
      expect(textElement.tagName).toBe('P');
    });
  });

  describe('Custom className', () => {
    it('applies custom className when provided', () => {
      const customClass = 'my-custom-class';
      const { container } = render(<FinishLine className={customClass} />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement).toHaveClass(customClass);
    });

    it('combines default and custom classes', () => {
      const customClass = 'bg-blue-500 p-4';
      const { container } = render(<FinishLine className={customClass} />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement).toHaveClass(
        'flex',
        'justify-center',
        'items-center',
        'bg-blue-500',
        'p-4'
      );
    });

    it('handles empty string className', () => {
      const { container } = render(<FinishLine className="" />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement).toHaveClass(
        'flex',
        'justify-center',
        'items-center'
      );
    });

    it('handles multiple custom classes', () => {
      const customClasses = 'bg-red-500 border-2 border-black rounded-lg shadow-lg';
      const { container } = render(<FinishLine className={customClasses} />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement).toHaveClass(
        'flex',
        'justify-center',
        'items-center',
        'bg-red-500',
        'border-2',
        'border-black',
        'rounded-lg',
        'shadow-lg'
      );
    });
  });

  describe('Component Structure', () => {
    it('renders as a div element', () => {
      const { container } = render(<FinishLine />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement.tagName).toBe('DIV');
    });

    it('contains a paragraph element with text', () => {
      render(<FinishLine />);
      
      const textElement = screen.getByText('Lexiread');
      expect(textElement.tagName).toBe('P');
    });

    it('has exactly one child element', () => {
      const { container } = render(<FinishLine />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement.children).toHaveLength(1);
    });
  });

  describe('Brand Display', () => {
    it('displays the brand name "Lexiread"', () => {
      render(<FinishLine />);
      
      expect(screen.getByText('Lexiread')).toBeInTheDocument();
    });

    it('displays brand name exactly once', () => {
      render(<FinishLine />);
      
      const brandElements = screen.getAllByText('Lexiread');
      expect(brandElements).toHaveLength(1);
    });
  });

  describe('Layout and Styling', () => {
    it('centers content with flexbox', () => {
      const { container } = render(<FinishLine />);
      
      const finishLineElement = container.firstChild as HTMLElement;
      expect(finishLineElement).toHaveClass(
        'flex',
        'justify-center',
        'items-center'
      );
    });

    it('applies consistent text styling', () => {
      render(<FinishLine />);
      
      const textElement = screen.getByText('Lexiread');
      expect(textElement).toHaveClass('text-sm', 'font-bold');
    });
  });
});