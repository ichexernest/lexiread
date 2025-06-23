import { render, screen, fireEvent } from '@testing-library/react';
import MainButton from '@/components/MainButton';
import { FaHome } from 'react-icons/fa';

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href} data-testid="link">{children}</a>;
  };
});

describe('MainButton', () => {
  const mockOnClick = jest.fn();
  const mockIcon = <FaHome data-testid="icon" />;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with required props', () => {
      render(<MainButton icon={mockIcon} hint="Home" />);
      
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders icon correctly', () => {
      render(<MainButton icon={mockIcon} hint="Test" />);
      
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders hint text when haveHint is true', () => {
      render(<MainButton icon={mockIcon} hint="Test Hint" haveHint={true} />);
      
      expect(screen.getByText('Test Hint')).toBeInTheDocument();
    });

    it('hides hint text when haveHint is false', () => {
      render(<MainButton icon={mockIcon} hint="Hidden Hint" haveHint={false} />);
      
      expect(screen.queryByText('Hidden Hint')).not.toBeInTheDocument();
    });

    it('shows hint by default when haveHint is not specified', () => {
      render(<MainButton icon={mockIcon} hint="Default Hint" />);
      
      expect(screen.getByText('Default Hint')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('applies medium size classes by default', () => {
      render(<MainButton icon={mockIcon} hint="Medium" />);
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      expect(buttonDiv).toHaveClass('w-[60px]', 'h-[60px]', 'text-2xl');
    });

    it('applies small size classes when size is sm', () => {
      render(<MainButton icon={mockIcon} hint="Small" size="sm" />);
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      expect(buttonDiv).toHaveClass('w-[40px]', 'h-[40px]', 'text-lg');
    });

    it('applies medium size classes when size is md', () => {
      render(<MainButton icon={mockIcon} hint="Medium" size="md" />);
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      expect(buttonDiv).toHaveClass('w-[60px]', 'h-[60px]', 'text-2xl');
    });
  });

  describe('CSS Classes', () => {
    it('applies correct base classes to button container', () => {
      render(<MainButton icon={mockIcon} hint="Test" />);
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      expect(buttonDiv).toHaveClass(
        'rounded-full',
        'flex',
        'justify-center',
        'items-center',
        'btn-color'
      );
    });

    it('applies correct classes to group container', () => {
      const { container } = render(<MainButton icon={mockIcon} hint="Test" />);
      
      const groupDiv = container.querySelector('.group');
      expect(groupDiv).toHaveClass(
        'relative',
        'group',
        'flex',
        'items-center',
        'justify-center'
      );
    });

    it('applies correct hint classes when hint is visible', () => {
      render(<MainButton icon={mockIcon} hint="Test Hint" />);
      
      const hintDiv = screen.getByText('Test Hint');
      expect(hintDiv).toHaveClass(
        'absolute',
        'z-10',
        'whitespace-nowrap',
        'text-xs',
        'px-2',
        'py-1',
        'rounded',
        'text-white',
        'bg-black',
        'opacity-0',
        'group-hover:opacity-100',
        'transition-opacity',
        'duration-200',
        'pointer-events-none'
      );
    });
  });

  describe('Click Functionality', () => {
    it('calls onClick when button is clicked', () => {
      render(<MainButton icon={mockIcon} hint="Clickable" onClick={mockOnClick} />);
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      fireEvent.click(buttonDiv!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when not provided', () => {
      render(<MainButton icon={mockIcon} hint="Not Clickable" />);
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      // Should not throw error
      expect(() => fireEvent.click(buttonDiv!)).not.toThrow();
    });
  });

  describe('Link Functionality', () => {
    it('renders as Link when href is provided', () => {
      render(<MainButton icon={mockIcon} hint="Link Button" href="/test" />);
      
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', '/test');
    });

    it('renders as plain div when href is not provided', () => {
      render(<MainButton icon={mockIcon} hint="Plain Button" />);
      
      expect(screen.queryByTestId('link')).not.toBeInTheDocument();
    });

    it('wraps button content in Link when href is provided', () => {
      render(<MainButton icon={mockIcon} hint="Wrapped" href="/wrapped" />);
      
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toContainElement(screen.getByTestId('icon'));
    });
  });

  describe('Combined Props', () => {
    it('handles both onClick and href correctly', () => {
      render(<MainButton icon={mockIcon} hint="Combined" href="/link" onClick={mockOnClick} />);
      
      const linkElement = screen.getByTestId('link');
      expect(linkElement).toHaveAttribute('href', '/link');
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      fireEvent.click(buttonDiv!);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('works with all props combined', () => {
      render(
        <MainButton 
          icon={mockIcon} 
          hint="All Props" 
          size="sm" 
          haveHint={true} 
          href="/all" 
          onClick={mockOnClick} 
        />
      );
      
      expect(screen.getByTestId('link')).toHaveAttribute('href', '/all');
      expect(screen.getByText('All Props')).toBeInTheDocument();
      
      const buttonDiv = screen.getByTestId('icon').closest('div');
      expect(buttonDiv).toHaveClass('w-[40px]', 'h-[40px]', 'text-lg');
    });
  });

  describe('Hint Positioning', () => {
    it('applies responsive positioning classes to hint', () => {
      render(<MainButton icon={mockIcon} hint="Positioned" />);
      
      const hintDiv = screen.getByText('Positioned');
      expect(hintDiv).toHaveClass(
        'top-full',
        'mt-2',
        'left-1/2',
        '-translate-x-1/2',
        'md:top-1/2',
        'md:left-full',
        'md:ml-2',
        'md:mt-0',
        'md:-translate-x-0',
        'md:-translate-y-1/2'
      );
    });
  });
});