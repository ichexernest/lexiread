import { render, screen } from '@testing-library/react';
import LoadingAnimation from '@/components/LoadingAnimation';

// Mock animejs
jest.mock('animejs', () => ({
  animate: jest.fn(),
  createScope: jest.fn(() => ({
    add: jest.fn(() => ({
      revert: jest.fn()
    })),
    revert: jest.fn()
  }))
}));

describe('LoadingAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders loading text correctly', () => {
      render(<LoadingAnimation />);
      
      expect(screen.getByText('L')).toBeInTheDocument();
      expect(screen.getByText('O')).toBeInTheDocument();
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('D')).toBeInTheDocument();
      expect(screen.getByText('I')).toBeInTheDocument();
      expect(screen.getByText('N')).toBeInTheDocument();
      expect(screen.getByText('G')).toBeInTheDocument();
    });

    it('renders three dots after LOADING', () => {
      render(<LoadingAnimation />);
      
      const dots = screen.getAllByText('.');
      expect(dots).toHaveLength(3);
    });

    it('applies correct CSS classes to container', () => {
      const { container } = render(<LoadingAnimation />);
      
      const loadingElement = container.firstChild as HTMLElement;
      expect(loadingElement).toHaveClass(
        'flex',
        'gap-1',
        'text-4xl',
        'font-bold',
        'text-gray-800'
      );
    });

    it('renders as h2 element', () => {
      const { container } = render(<LoadingAnimation />);
      
      const loadingElement = container.firstChild as HTMLElement;
      expect(loadingElement.tagName).toBe('H2');
    });
  });

  describe('Text Structure', () => {
    it('renders each character in separate span elements', () => {
      render(<LoadingAnimation />);
      
      const spans = screen.getAllByText(/[LOADING.]/);
      expect(spans).toHaveLength(10); // 7 letters + 3 dots
      
      spans.forEach(span => {
        expect(span.tagName).toBe('SPAN');
      });
    });

    it('renders characters in correct order', () => {
      const { container } = render(<LoadingAnimation />);
      
      const spans = container.querySelectorAll('span');
      const expectedChars = ['L', 'O', 'A', 'D', 'I', 'N', 'G', '.', '.', '.'];
      
      spans.forEach((span, index) => {
        expect(span.textContent).toBe(expectedChars[index]);
      });
    });
  });

  describe('Animation Setup', () => {
    it('initializes animation scope on mount', () => {
      const { createScope } = require('animejs');
      
      render(<LoadingAnimation />);
      
      expect(createScope).toHaveBeenCalledWith({ root: expect.any(HTMLElement) });
    });

    it('calls animate function for spans', () => {
      const mockAnimate = jest.fn();
      const mockScope = {
        add: jest.fn((callback) => {
          callback(); // Execute the callback which calls animate
          return { revert: jest.fn() };
        }),
        revert: jest.fn()
      };
      
      const { createScope } = require('animejs');
      createScope.mockReturnValue(mockScope);
      
      // Mock animate to be available in the callback
      require('animejs').animate = mockAnimate;
      
      render(<LoadingAnimation />);
      
      expect(mockAnimate).toHaveBeenCalledWith('span', expect.objectContaining({
        y: expect.any(Array),
        rotate: expect.any(Object),
        delay: expect.any(Function),
        ease: 'inOutCirc',
        loopDelay: 1000,
        loop: true
      }));
    });

    it('sets up proper animation parameters', () => {
      const mockAnimate = jest.fn();
      const mockScope = {
        add: jest.fn((callback) => {
          callback(); // Execute the callback which calls animate
          return { revert: jest.fn() };
        }),
        revert: jest.fn()
      };
      
      const { createScope } = require('animejs');
      createScope.mockReturnValue(mockScope);
      require('animejs').animate = mockAnimate;
      
      render(<LoadingAnimation />);
      
      expect(mockAnimate).toHaveBeenCalledWith('span', expect.objectContaining({
        y: [
          { to: '-2.75rem', ease: 'outExpo', duration: 600 },
          { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        rotate: {
          from: '-1turn',
          delay: 0
        },
        ease: 'inOutCirc',
        loopDelay: 1000,
        loop: true
      }));
    });
  });

  describe('Component Lifecycle', () => {
    it('cleans up animation on unmount', () => {
      const mockRevert = jest.fn();
      const mockScope = {
        add: jest.fn(() => ({ revert: mockRevert })),
        revert: mockRevert
      };
      
      const { createScope } = require('animejs');
      createScope.mockReturnValue(mockScope);
      
      const { unmount } = render(<LoadingAnimation />);
      unmount();
      
      expect(mockRevert).toHaveBeenCalled();
    });

    it('handles case when ref is not available', () => {
      // Mock useRef to return null
      const originalUseRef = require('react').useRef;
      const mockUseRef = jest.fn(() => ({ current: null }));
      require('react').useRef = mockUseRef;
      
      // Should not throw error
      expect(() => render(<LoadingAnimation />)).not.toThrow();
      
      // Restore original useRef
      require('react').useRef = originalUseRef;
    });
  });

  describe('Accessibility', () => {
    it('uses semantic h2 element for screen readers', () => {
      const { container } = render(<LoadingAnimation />);
      
      const loadingElement = container.firstChild as HTMLElement;
      expect(loadingElement.tagName).toBe('H2');
    });

    it('could benefit from aria-label for better accessibility', () => {
      const { container } = render(<LoadingAnimation />);
      
      const loadingElement = container.firstChild as HTMLElement;
      // This test documents that the component doesn't currently have accessibility attributes
      expect(loadingElement).not.toHaveAttribute('aria-label');
    });
  });
});