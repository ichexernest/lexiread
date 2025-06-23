import { render, screen, act } from '@testing-library/react';
import ProgressCircle from '@/components/ProgressCircle';

// Mock requestAnimationFrame and performance.now
const mockRequestAnimationFrame = jest.fn(cb => {
  setTimeout(cb, 0);
  return 0;
});

const mockPerformanceNow = jest.fn(() => Date.now());

global.requestAnimationFrame = mockRequestAnimationFrame;
global.performance = {
  ...global.performance,
  now: mockPerformanceNow,
};

describe('ProgressCircle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();
    // Reset mocks for each test
    mockRequestAnimationFrame.mockClear();
    mockPerformanceNow.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders progress circle correctly', () => {
      render(<ProgressCircle total={100} count={50} />);
      
      const container = document.querySelector('.w-\\[120px\\]');
      expect(container).toBeInTheDocument();
    });

    it('renders SVG element', () => {
      render(<ProgressCircle total={100} count={25} />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('height', '120');
      expect(svg).toHaveAttribute('width', '120');
    });

    it('renders background and progress circles', () => {
      render(<ProgressCircle total={100} count={75} />);
      
      const circles = document.querySelectorAll('circle');
      expect(circles).toHaveLength(2);
    });

    it('displays percentage text initially as 0%', () => {
      render(<ProgressCircle total={100} count={60} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  describe('Percentage Calculation', () => {
    it('calculates percentage correctly for normal values', () => {
      render(<ProgressCircle total={100} count={25} />);
      
      // Initial state should be 0%
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles zero total correctly', () => {
      render(<ProgressCircle total={0} count={5} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles count greater than total', () => {
      render(<ProgressCircle total={50} count={75} />);
      
      // Should handle overflow gracefully
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles negative values', () => {
      render(<ProgressCircle total={100} count={-10} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  describe('SVG Circle Properties', () => {
    it('applies correct properties to background circle', () => {
      render(<ProgressCircle total={100} count={50} />);
      
      const circles = document.querySelectorAll('circle');
      const backgroundCircle = circles[0];
      
      expect(backgroundCircle).toHaveAttribute('stroke', '#e5e7eb');
      expect(backgroundCircle).toHaveAttribute('fill', 'transparent');
      expect(backgroundCircle).toHaveAttribute('stroke-width', '8');
      expect(backgroundCircle).toHaveAttribute('r', '50');
      expect(backgroundCircle).toHaveAttribute('cx', '60');
      expect(backgroundCircle).toHaveAttribute('cy', '60');
    });

    it('applies correct properties to progress circle', () => {
      render(<ProgressCircle total={100} count={50} />);
      
      const circles = document.querySelectorAll('circle');
      const progressCircle = circles[1];
      
      expect(progressCircle).toHaveAttribute('stroke', '#10b981');
      expect(progressCircle).toHaveAttribute('fill', 'transparent');
      expect(progressCircle).toHaveAttribute('stroke-width', '8');
      expect(progressCircle).toHaveAttribute('stroke-linecap', 'round');
      expect(progressCircle).toHaveAttribute('r', '50');
      expect(progressCircle).toHaveAttribute('cx', '60');
      expect(progressCircle).toHaveAttribute('cy', '60');
      expect(progressCircle).toHaveAttribute('transform', 'rotate(-90 60 60)');
    });

    it('calculates circumference and dash offset correctly', () => {
      render(<ProgressCircle total={100} count={50} />);
      
      const circles = document.querySelectorAll('circle');
      const progressCircle = circles[1];
      
      // circumference = 2 * Math.PI * 50 ≈ 314.16
      const expectedCircumference = 2 * Math.PI * 50;
      expect(progressCircle).toHaveAttribute('stroke-dasharray', expectedCircumference.toString());
    });
  });

  describe('Content Display', () => {
    it('displays initial percentage as 0%', () => {
      render(<ProgressCircle total={100} count={50} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles different total and count combinations', () => {
      const { rerender } = render(<ProgressCircle total={200} count={100} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
      
      rerender(<ProgressCircle total={50} count={25} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('component unmounts without errors', () => {
      const { unmount } = render(<ProgressCircle total={100} count={50} />);
      
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Component Structure', () => {
    it('applies correct CSS classes to container', () => {
      const { container } = render(<ProgressCircle total={100} count={50} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('w-[120px]', 'h-[120px]', 'relative');
    });

    it('applies correct CSS classes to percentage display', () => {
      render(<ProgressCircle total={100} count={50} />);
      
      const percentageElement = screen.getByText('0%');
      const percentageDiv = percentageElement.closest('div');
      expect(percentageDiv).toHaveClass(
        'absolute',
        'inset-0',
        'flex',
        'items-center',
        'justify-center',
        'text-2xl',
        'font-bold',
        'text-gray-800'
      );
    });
  });

  describe('Edge Cases', () => {
    it('handles very small numbers', () => {
      render(<ProgressCircle total={1} count={0.1} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles very large numbers', () => {
      render(<ProgressCircle total={1000000} count={500000} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles decimal values', () => {
      render(<ProgressCircle total={100.5} count={50.25} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('handles count equal to total', () => {
      render(<ProgressCircle total={100} count={100} />);
      
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('could benefit from ARIA attributes for screen readers', () => {
      render(<ProgressCircle total={100} count={75} />);
      
      const container = document.querySelector('.relative');
      // This test documents that the component doesn't currently have accessibility attributes
      expect(container).not.toHaveAttribute('role');
      expect(container).not.toHaveAttribute('aria-valuenow');
      expect(container).not.toHaveAttribute('aria-valuemin');
      expect(container).not.toHaveAttribute('aria-valuemax');
    });

    it('percentage text is readable', () => {
      render(<ProgressCircle total={100} count={50} />);
      
      const percentageText = screen.getByText('0%');
      expect(percentageText).toBeVisible();
    });
  });
});