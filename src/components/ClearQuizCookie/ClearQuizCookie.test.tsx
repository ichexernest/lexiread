import { render } from '@testing-library/react';
import ClearQuizCookie from '@/components/ClearQuizCookie';

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

describe('ClearQuizCookie', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  describe('Cookie Management', () => {
    it('renders without crashing', () => {
      const { container } = render(<ClearQuizCookie />);
      expect(container.firstChild).toBeNull();
    });

    it('clears quizComplete cookie on mount', () => {
      // Set initial cookie
      document.cookie = 'quizComplete=true; path=/';
      
      render(<ClearQuizCookie />);
      
      // Verify cookie was cleared
      expect(document.cookie).toContain('quizComplete=; Max-Age=0; path=/');
    });

    it('returns null (no DOM elements)', () => {
      const { container } = render(<ClearQuizCookie />);
      expect(container.firstChild).toBeNull();
    });
  });

});