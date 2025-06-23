import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '@/components/BackButton';

const mockPush = jest.fn();
const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

jest.mock('@/components/MainButton', () => {
  return function MockMainButton({ 
    icon, 
    hint, 
    haveHint, 
    onClick 
  }: { 
    icon: React.ReactNode; 
    hint: string; 
    haveHint: boolean; 
    onClick: () => void; 
  }) {
    return (
      <button 
        data-testid="main-button" 
        data-hint={hint}
        data-have-hint={haveHint}
        onClick={onClick}
      >
        {icon}
      </button>
    );
  };
});

describe('BackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders back button correctly', () => {
      render(<BackButton />);
      
      const button = screen.getByTestId('main-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-hint', 'Back');
      expect(button).toHaveAttribute('data-have-hint', 'true');
    });

    it('applies correct CSS classes to container', () => {
      const { container } = render(<BackButton />);
      
      const containerDiv = container.firstChild as HTMLElement;
      expect(containerDiv).toHaveClass(
        'fixed',
        'top-3',
        'left-0',
        'right-0',
        'flex',
        'justify-center',
        'items-center',
        'gap-4',
        'p-4',
        'md:left-0',
        'md:flex-col',
        'md:right-auto'
      );
    });
  });

  describe('Navigation', () => {
    it('calls router.back when button is clicked', () => {
      render(<BackButton />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      expect(mockBack).toHaveBeenCalledTimes(1);
    });

    it('does not call router.push when back button is clicked', () => {
      render(<BackButton />);
      
      const button = screen.getByTestId('main-button');
      fireEvent.click(button);
      
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('MainButton Props', () => {
    it('passes correct props to MainButton', () => {
      render(<BackButton />);
      
      const button = screen.getByTestId('main-button');
      expect(button).toHaveAttribute('data-hint', 'Back');
      expect(button).toHaveAttribute('data-have-hint', 'true');
    });
  });
});