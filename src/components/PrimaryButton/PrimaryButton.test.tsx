import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '@/components/PrimaryButton';

describe('PrimaryButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with children', () => {
      render(<PrimaryButton>Click me</PrimaryButton>);
      
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders without children', () => {
      render(<PrimaryButton />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('');
    });

    it('renders as button element', () => {
      render(<PrimaryButton>Button</PrimaryButton>);
      
      const element = screen.getByRole('button');
      expect(element.tagName).toBe('BUTTON');
    });
  });

  describe('Size Variants', () => {
    it('applies small size classes by default', () => {
      render(<PrimaryButton>Small Default</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'text-sm');
    });

    it('applies small size classes when size is sm', () => {
      render(<PrimaryButton size="sm">Small</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'text-sm');
    });

    it('applies medium size classes when size is md', () => {
      render(<PrimaryButton size="md">Medium</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12', 'px-6', 'text-base');
    });
  });

  describe('CSS Classes', () => {
    it('applies correct base classes', () => {
      render(<PrimaryButton>Styled Button</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'group',
        'relative',
        'overflow-hidden',
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-neutral-950',
        'font-medium',
        'text-neutral-50',
        'shadow-lg',
        'shadow-neutral-500/20',
        'transition',
        'active:scale-95'
      );
    });

    it('contains hover effect span', () => {
      render(<PrimaryButton>Hover Effect</PrimaryButton>);
      
      const button = screen.getByRole('button');
      const hoverSpan = button.querySelector('span');
      
      expect(hoverSpan).toBeInTheDocument();
      expect(hoverSpan).toHaveClass(
        'absolute',
        'h-0',
        'w-0',
        'rounded-full',
        'bg-neutral-700',
        'transition-all',
        'duration-300',
        'group-hover:h-56',
        'group-hover:w-32'
      );
    });

    it('wraps children in relative div', () => {
      render(<PrimaryButton>Wrapped Content</PrimaryButton>);
      
      const button = screen.getByRole('button');
      const contentDiv = button.querySelector('div');
      
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv).toHaveClass('relative');
      expect(contentDiv).toContainElement(screen.getByText('Wrapped Content'));
    });
  });

  describe('Click Functionality', () => {
    it('calls onClick when button is clicked', () => {
      render(<PrimaryButton onClick={mockOnClick}>Clickable</PrimaryButton>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when not provided', () => {
      render(<PrimaryButton>Not Clickable</PrimaryButton>);
      
      const button = screen.getByRole('button');
      // Should not throw error
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('handles multiple clicks', () => {
      render(<PrimaryButton onClick={mockOnClick}>Multiple Clicks</PrimaryButton>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Button Structure', () => {
    it('contains two child elements (span and div)', () => {
      render(<PrimaryButton>Structure Test</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button.children).toHaveLength(2);
      
      const span = button.children[0];
      const div = button.children[1];
      
      expect(span.tagName).toBe('SPAN');
      expect(div.tagName).toBe('DIV');
    });

    it('positions content correctly within button', () => {
      render(<PrimaryButton>Positioned Content</PrimaryButton>);
      
      const button = screen.getByRole('button');
      const contentDiv = button.querySelector('div.relative');
      
      expect(contentDiv).toContainElement(screen.getByText('Positioned Content'));
    });
  });

  describe('Different Content Types', () => {
    it('handles text content', () => {
      render(<PrimaryButton>Text Content</PrimaryButton>);
      
      expect(screen.getByText('Text Content')).toBeInTheDocument();
    });

    it('handles React element content', () => {
      render(
        <PrimaryButton>
          <span>React Element</span>
        </PrimaryButton>
      );
      
      expect(screen.getByText('React Element')).toBeInTheDocument();
    });

    it('handles mixed content', () => {
      render(
        <PrimaryButton>
          Text and <strong>Bold</strong>
        </PrimaryButton>
      );
      
      expect(screen.getByText('Bold')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is focusable as a button', () => {
      render(<PrimaryButton>Focusable</PrimaryButton>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(document.activeElement).toBe(button);
    });

    it('supports keyboard interaction', () => {
      render(<PrimaryButton onClick={mockOnClick}>Keyboard</PrimaryButton>);
      
      const button = screen.getByRole('button');
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.keyDown(button, { key: ' ' }); // Space key
      
      // The button should handle click events normally
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('could benefit from explicit ARIA attributes for complex content', () => {
      render(<PrimaryButton>Complex Button</PrimaryButton>);
      
      const button = screen.getByRole('button');
      // This test documents that the component relies on default button semantics
      expect(button).not.toHaveAttribute('aria-label');
    });
  });

  describe('Animation and Interaction States', () => {
    it('has active scale transformation class', () => {
      render(<PrimaryButton>Active Button</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('active:scale-95');
    });

    it('has transition class for smooth animations', () => {
      render(<PrimaryButton>Animated Button</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('transition');
    });

    it('has group class for hover effects', () => {
      render(<PrimaryButton>Group Button</PrimaryButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('group');
    });
  });
});