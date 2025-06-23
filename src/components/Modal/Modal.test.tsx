import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '@/components/Modal';

jest.mock('@/components/PrimaryButton', () => {
  return function MockPrimaryButton({ 
    onClick, 
    children 
  }: { 
    onClick?: () => void; 
    children: React.ReactNode; 
  }) {
    return (
      <button data-testid="primary-button" onClick={onClick}>
        {children}
      </button>
    );
  };
});

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<Modal isOpen={true} onClose={mockOnClose} title="Test Modal" />);
      
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<Modal isOpen={false} onClose={mockOnClose} title="Hidden Modal" />);
      
      expect(screen.queryByText('Hidden Modal')).not.toBeInTheDocument();
    });

    it('renders title correctly', () => {
      render(<Modal isOpen={true} onClose={mockOnClose} title="Custom Title" />);
      
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders children in default mode', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="With Children">
          <p>Custom content</p>
        </Modal>
      );
      
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });
  });

  describe('Default Type Modal', () => {
    it('renders children when type is default', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Default Modal" type="default">
          <div>Default content</div>
        </Modal>
      );
      
      expect(screen.getByText('Default content')).toBeInTheDocument();
    });

    it('uses default type when type is not specified', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="No Type">
          <span>Content without type</span>
        </Modal>
      );
      
      expect(screen.getByText('Content without type')).toBeInTheDocument();
    });
  });

  describe('Confirm Type Modal', () => {
    it('renders confirm dialog when type is confirm', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Confirmation" 
          type="confirm"
          message="Are you sure?"
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('uses custom confirm and cancel text', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Custom Buttons" 
          type="confirm"
          message="Delete item?"
          onConfirm={mockOnConfirm}
          confirmText="Delete"
          cancelText="Keep"
        />
      );
      
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Keep')).toBeInTheDocument();
    });

    it('uses default confirm and cancel text when not provided', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Default Buttons" 
          type="confirm"
          message="Proceed?"
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  describe('Button Interactions', () => {
    it('calls onClose when cancel button is clicked', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Cancel Test" 
          type="confirm"
          message="Test message"
          onConfirm={mockOnConfirm}
        />
      );
      
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm when confirm button is clicked', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Confirm Test" 
          type="confirm"
          message="Test message"
          onConfirm={mockOnConfirm}
        />
      );
      
      const confirmButton = screen.getByTestId('primary-button');
      fireEvent.click(confirmButton);
      
      expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    });

    it('does not call onConfirm when onConfirm is not provided', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="No Confirm Handler" 
          type="confirm"
          message="Test message"
        />
      );
      
      const confirmButton = screen.getByTestId('primary-button');
      // Should not throw error
      expect(() => fireEvent.click(confirmButton)).not.toThrow();
    });
  });

  describe('CSS Classes and Styling', () => {
    it('applies correct backdrop classes', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Styling Test" />
      );
      
      const backdrop = container.firstChild as HTMLElement;
      expect(backdrop).toHaveClass(
        'fixed',
        'inset-0',
        'bg-black/5',
        'bg-opacity-50',
        'flex',
        'items-center',
        'justify-center',
        'z-50'
      );
    });

    it('applies correct modal content classes', () => {
      render(<Modal isOpen={true} onClose={mockOnClose} title="Content Styling" />);
      
      const modalContent = screen.getByText('Content Styling').closest('div')?.parentElement;
      expect(modalContent).toHaveClass(
        'bg-white/70',
        'backdrop-blur-lg',
        'rounded-xl',
        'p-6',
        'w-full',
        'max-w-md',
        'mx-4',
        'shadow-lg'
      );
    });

    it('applies correct title classes', () => {
      render(<Modal isOpen={true} onClose={mockOnClose} title="Title Styling" />);
      
      const title = screen.getByText('Title Styling');
      expect(title).toHaveClass('text-lg', 'font-semibold');
      expect(title.tagName).toBe('H3');
    });

    it('applies correct button spacing classes', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Button Spacing" 
          type="confirm"
          message="Test"
          onConfirm={mockOnConfirm}
        />
      );
      
      const buttonContainer = screen.getByText('Cancel').closest('div');
      expect(buttonContainer).toHaveClass('flex', 'space-x-3', 'justify-end');
    });
  });

  describe('Accessibility', () => {
    it('uses semantic h3 element for title', () => {
      render(<Modal isOpen={true} onClose={mockOnClose} title="Accessible Title" />);
      
      const title = screen.getByText('Accessible Title');
      expect(title.tagName).toBe('H3');
    });

    it('applies z-index for proper layering', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Z-Index Test" />
      );
      
      const backdrop = container.firstChild as HTMLElement;
      expect(backdrop).toHaveClass('z-50');
    });

    it('could benefit from ARIA attributes', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="ARIA Test" />
      );
      
      const backdrop = container.firstChild as HTMLElement;
      // This test documents that the component doesn't currently have ARIA attributes
      expect(backdrop).not.toHaveAttribute('role');
      expect(backdrop).not.toHaveAttribute('aria-modal');
      expect(backdrop).not.toHaveAttribute('aria-labelledby');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty title gracefully', () => {
      render(<Modal isOpen={true} onClose={mockOnClose} title="" />);
      
      const titleElement = screen.getByRole('heading', { level: 3 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.textContent).toBe('');
    });

    it('handles empty message in confirm mode', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="Empty Message" 
          type="confirm"
          message=""
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('handles missing message in confirm mode', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={mockOnClose} 
          title="No Message" 
          type="confirm"
          onConfirm={mockOnConfirm}
        />
      );
      
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });
});