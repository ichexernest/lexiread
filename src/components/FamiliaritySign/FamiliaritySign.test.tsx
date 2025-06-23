import { render, screen } from '@testing-library/react';
import FamiliaritySign from '@/components/FamiliaritySign';

describe('FamiliaritySign', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const { container } = render(<FamiliaritySign familiarity={0} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toBeInTheDocument();
      expect(signElement).toHaveClass('p-2', 'w-[8px]', 'h-[8px]', 'rounded-full');
    });

    it('applies correct base CSS classes', () => {
      const { container } = render(<FamiliaritySign familiarity={2} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toHaveClass(
        'p-2',
        'w-[8px]',
        'h-[8px]',
        'rounded-full'
      );
    });
  });

  describe('Familiarity Colors', () => {
    it('displays red color for familiarity level 0', () => {
      const { container } = render(<FamiliaritySign familiarity={0} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toHaveClass('bg-red-300');
    });

    it('displays yellow color for familiarity level 1', () => {
      const { container } = render(<FamiliaritySign familiarity={1} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toHaveClass('bg-yellow-500');
    });

    it('displays yellow color for familiarity level 2', () => {
      const { container } = render(<FamiliaritySign familiarity={2} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toHaveClass('bg-yellow-500');
    });

    it('displays green color for familiarity level 3', () => {
      const { container } = render(<FamiliaritySign familiarity={3} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toHaveClass('bg-green-500');
    });

    it('displays blue color for familiarity level 4', () => {
      const { container } = render(<FamiliaritySign familiarity={4} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toHaveClass('bg-blue-400');
    });
  });

  describe('Edge Cases', () => {
    it('handles negative familiarity values gracefully', () => {
      const { container } = render(<FamiliaritySign familiarity={-1} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toBeInTheDocument();
      // Should not have any background color class for undefined familiarity
      expect(signElement).not.toHaveClass('bg-red-300', 'bg-yellow-500', 'bg-green-500', 'bg-blue-400');
    });

    it('handles familiarity values above 4 gracefully', () => {
      const { container } = render(<FamiliaritySign familiarity={5} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toBeInTheDocument();
      // Should not have any background color class for undefined familiarity
      expect(signElement).not.toHaveClass('bg-red-300', 'bg-yellow-500', 'bg-green-500', 'bg-blue-400');
    });

    it('handles decimal familiarity values', () => {
      const { container } = render(<FamiliaritySign familiarity={2.5} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement).toBeInTheDocument();
      // Decimal values won't match exact keys, so no background class
      expect(signElement).not.toHaveClass('bg-red-300', 'bg-yellow-500', 'bg-green-500', 'bg-blue-400');
    });
  });

  describe('Component Structure', () => {
    it('renders as a div element', () => {
      const { container } = render(<FamiliaritySign familiarity={1} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement.tagName).toBe('DIV');
    });

    it('is empty (no text content)', () => {
      const { container } = render(<FamiliaritySign familiarity={3} />);
      
      const signElement = container.firstChild as HTMLElement;
      expect(signElement.textContent).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('could benefit from aria-label for screen readers', () => {
      const { container } = render(<FamiliaritySign familiarity={4} />);
      
      const signElement = container.firstChild as HTMLElement;
      // This test documents that the component doesn't currently have accessibility attributes
      expect(signElement).not.toHaveAttribute('aria-label');
      expect(signElement).not.toHaveAttribute('role');
    });
  });
});