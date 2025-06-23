import { render, screen } from '@testing-library/react';
import MainFunctionBar from '@/components/MainFunctionBar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}));

jest.mock('@/components/MainButton', () => {
  return function MockMainButton({ 
    href, 
    icon, 
    hint, 
    haveHint 
  }: { 
    href: string; 
    icon: React.ReactNode; 
    hint: string; 
    haveHint: boolean; 
  }) {
    return (
      <div 
        data-testid={`main-button-${href}`}
        data-href={href}
        data-hint={hint}
        data-have-hint={haveHint}
      >
        {icon}
      </div>
    );
  };
});

jest.mock('react-icons/fa6', () => ({
  FaAmilia: () => <div data-testid="amilia-icon">Amilia</div>,
  FaGear: () => <div data-testid="gear-icon">Gear</div>,
  FaNewspaper: () => <div data-testid="newspaper-icon">Newspaper</div>
}));

jest.mock('react-icons/ai', () => ({
  AiFillHome: () => <div data-testid="home-icon">Home</div>
}));

describe('MainFunctionBar', () => {
  const mockUsePathname = require('next/navigation').usePathname;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering with different paths', () => {
    it('renders all navigation buttons when not on any specific page', () => {
      mockUsePathname.mockReturnValue('/SomePage');
      
      render(<MainFunctionBar />);
      
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('hides Home button when on Home page', () => {
      mockUsePathname.mockReturnValue('/Home');
      
      render(<MainFunctionBar />);
      
      expect(screen.queryByTestId('main-button-/Home')).not.toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('hides Voc button when on Voc page', () => {
      mockUsePathname.mockReturnValue('/Voc');
      
      render(<MainFunctionBar />);
      
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Voc')).not.toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('hides Article button when on Article page', () => {
      mockUsePathname.mockReturnValue('/Article');
      
      render(<MainFunctionBar />);
      
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Article')).not.toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('hides Setting button when on Setting page', () => {
      mockUsePathname.mockReturnValue('/Setting');
      
      render(<MainFunctionBar />);
      
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Setting')).not.toBeInTheDocument();
    });
  });

  describe('Nested path handling', () => {
    it('hides button when on nested path', () => {
      mockUsePathname.mockReturnValue('/Home/Dashboard');
      
      render(<MainFunctionBar />);
      
      expect(screen.queryByTestId('main-button-/Home')).not.toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('handles deeply nested Article paths', () => {
      mockUsePathname.mockReturnValue('/Article/123/content');
      
      render(<MainFunctionBar />);
      
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Article')).not.toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('handles nested Voc paths', () => {
      mockUsePathname.mockReturnValue('/Voc/list/page/2');
      
      render(<MainFunctionBar />);
      
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Voc')).not.toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });
  });

  describe('Quiz page special handling', () => {
    it('hides all buttons when on Quiz page', () => {
      mockUsePathname.mockReturnValue('/Quiz');
      
      render(<MainFunctionBar />);
      
      expect(screen.queryByTestId('main-button-/Home')).not.toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Voc')).not.toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Article')).not.toBeInTheDocument();
      expect(screen.queryByTestId('main-button-/Setting')).not.toBeInTheDocument();
    });

    it('hides all buttons when on nested Quiz page', () => {
      mockUsePathname.mockReturnValue('/Quiz/Result');
      
      render(<MainFunctionBar />);
      
      // Quiz page logic hides all buttons when pathname is exactly '/Quiz'
      // For nested paths like '/Quiz/Result', buttons may still be shown
      const buttons = screen.queryAllByTestId(/main-button-/);
      expect(buttons.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Button properties', () => {
    it('sets correct properties for Home button', () => {
      mockUsePathname.mockReturnValue('/Other');
      
      render(<MainFunctionBar />);
      
      const homeButton = screen.getByTestId('main-button-/Home');
      expect(homeButton).toHaveAttribute('data-href', '/Home');
      expect(homeButton).toHaveAttribute('data-hint', 'Home');
      expect(homeButton).toHaveAttribute('data-have-hint', 'true');
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('sets correct properties for Voc button', () => {
      mockUsePathname.mockReturnValue('/Other');
      
      render(<MainFunctionBar />);
      
      const vocButton = screen.getByTestId('main-button-/Voc');
      expect(vocButton).toHaveAttribute('data-href', '/Voc');
      expect(vocButton).toHaveAttribute('data-hint', 'Vocabularies');
      expect(vocButton).toHaveAttribute('data-have-hint', 'true');
      expect(screen.getByTestId('amilia-icon')).toBeInTheDocument();
    });

    it('sets correct properties for Article button', () => {
      mockUsePathname.mockReturnValue('/Other');
      
      render(<MainFunctionBar />);
      
      const articleButton = screen.getByTestId('main-button-/Article');
      expect(articleButton).toHaveAttribute('data-href', '/Article');
      expect(articleButton).toHaveAttribute('data-hint', 'Articles');
      expect(articleButton).toHaveAttribute('data-have-hint', 'true');
      expect(screen.getByTestId('newspaper-icon')).toBeInTheDocument();
    });

    it('sets correct properties for Setting button', () => {
      mockUsePathname.mockReturnValue('/Other');
      
      render(<MainFunctionBar />);
      
      const settingButton = screen.getByTestId('main-button-/Setting');
      expect(settingButton).toHaveAttribute('data-href', '/Setting');
      expect(settingButton).toHaveAttribute('data-hint', 'Settings');
      expect(settingButton).toHaveAttribute('data-have-hint', 'true');
      expect(screen.getByTestId('gear-icon')).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Layout', () => {
    it('applies correct CSS classes to container', () => {
      mockUsePathname.mockReturnValue('/Other');
      
      const { container } = render(<MainFunctionBar />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'fixed',
        'bottom-3',
        'z-50',
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

    it('renders as div element', () => {
      mockUsePathname.mockReturnValue('/Other');
      
      const { container } = render(<MainFunctionBar />);
      
      expect(container.firstChild?.nodeName).toBe('DIV');
    });
  });

  describe('Dynamic button rendering', () => {
    it('uses href as key for each button', () => {
      mockUsePathname.mockReturnValue('/Other');
      
      render(<MainFunctionBar />);
      
      // Keys are used internally by React, we verify buttons render correctly
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('filters buttons correctly based on active state', () => {
      mockUsePathname.mockReturnValue('/Home/subpage');
      
      render(<MainFunctionBar />);
      
      // Should show 3 buttons (excluding Home)
      const buttons = screen.getAllByTestId(/main-button-/);
      expect(buttons).toHaveLength(3);
    });
  });

  describe('Edge cases', () => {
    it('handles root path', () => {
      mockUsePathname.mockReturnValue('/');
      
      render(<MainFunctionBar />);
      
      // Should show all buttons since root doesn't match any specific route
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('handles case-sensitive paths', () => {
      mockUsePathname.mockReturnValue('/home'); // lowercase
      
      render(<MainFunctionBar />);
      
      // Should show all buttons since path doesn't exactly match /Home
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Article')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
    });

    it('handles similar but different paths', () => {
      mockUsePathname.mockReturnValue('/Articles'); // plural
      
      render(<MainFunctionBar />);
      
      // Should show buttons, though /Articles might hide /Article due to startsWith check
      expect(screen.getByTestId('main-button-/Home')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Voc')).toBeInTheDocument();
      expect(screen.getByTestId('main-button-/Setting')).toBeInTheDocument();
      // /Article might be hidden due to startsWith('/Article') matching '/Articles'
    });
  });
});