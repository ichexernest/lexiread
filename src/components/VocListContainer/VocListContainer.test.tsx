import { render, screen, act } from '@testing-library/react';
import VocListContainer from '@/components/VocListContainer';
import { Vocabulary } from '@/types';

// Mock dependencies
jest.mock('@/hooks/useLazyLoad', () => ({
  useLazyLoad: jest.fn()
}));

jest.mock('@/components/VocList', () => {
  return function MockVocList({ 
    vocs, 
    onItemClick 
  }: { 
    vocs: Vocabulary[]; 
    onItemClick: (word: string) => void; 
  }) {
    return (
      <div data-testid="voc-list">
        {vocs.map(voc => (
          <div 
            key={voc.publicVocabularyId}
            data-testid={`voc-item-${voc.publicVocabularyId}`}
            onClick={() => onItemClick(voc.word)}
          >
            {voc.word}
          </div>
        ))}
      </div>
    );
  };
});

jest.mock('@/components/VocCard', () => {
  return function MockVocCard({ 
    word, 
    onClose 
  }: { 
    word: string; 
    onClose: () => void; 
  }) {
    return (
      <div data-testid="voc-card" data-word={word}>
        VocCard for {word}
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('@/components/LoadingAnimation', () => {
  return function MockLoadingAnimation() {
    return <div data-testid="loading-animation">Loading...</div>;
  };
});

jest.mock('@/components/FinishLine', () => {
  return function MockFinishLine({ className }: { className?: string }) {
    return <div data-testid="finish-line" className={className}>Finish Line</div>;
  };
});

describe('VocListContainer', () => {
  const mockUseLazyLoad = require('@/hooks/useLazyLoad').useLazyLoad;

  const mockInitialVocs: Vocabulary[] = [
    {
      publicVocabularyId: 'vocab-1',
      word: 'hello',
      phonetic: '/həˈloʊ/',
      pronunciation: 'huh-LOH',
      definitions: []
    },
    {
      publicVocabularyId: 'vocab-2',
      word: 'world',
      phonetic: '/wɜːrld/',
      pronunciation: 'wurld',
      definitions: []
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Normal State', () => {
    beforeEach(() => {
      mockUseLazyLoad.mockReturnValue({
        data: mockInitialVocs,
        loading: false,
        error: null,
        hasMore: true,
        observerRef: { current: null },
        refresh: jest.fn()
      });
    });

    it('renders VocList with initial vocabularies', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      expect(screen.getByTestId('voc-list')).toBeInTheDocument();
      expect(screen.getByTestId('voc-item-vocab-1')).toBeInTheDocument();
      expect(screen.getByTestId('voc-item-vocab-2')).toBeInTheDocument();
    });

    it('shows observer element when hasMore is true', () => {
      const { container } = render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      const observerElement = container.querySelector('.h-12');
      expect(observerElement).toBeInTheDocument();
    });

    it('does not show loading animation when not loading', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      expect(screen.queryByTestId('loading-animation')).not.toBeInTheDocument();
    });

    it('does not show finish line when hasMore is true', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      expect(screen.queryByTestId('finish-line')).not.toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      mockUseLazyLoad.mockReturnValue({
        data: mockInitialVocs,
        loading: true,
        error: null,
        hasMore: true,
        observerRef: { current: null },
        refresh: jest.fn()
      });
    });

    it('shows loading animation when loading', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
    });

    it('applies correct classes to loading container', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      const loadingContainer = screen.getByTestId('loading-animation').parentElement;
      expect(loadingContainer).toHaveClass(
        'flex',
        'justify-center',
        'items-center',
        'py-8',
        'mt-10'
      );
    });
  });

  describe('Error State', () => {
    const mockRefresh = jest.fn();

    beforeEach(() => {
      mockUseLazyLoad.mockReturnValue({
        data: [],
        loading: false,
        error: new Error('Network error'),
        hasMore: false,
        observerRef: { current: null },
        refresh: mockRefresh
      });
    });

    it('shows error message and retry button', () => {
      render(<VocListContainer initialVocs={[]} />);
      
      expect(screen.getByText('There were some errors, please try again')).toBeInTheDocument();
      expect(screen.getByText('retry')).toBeInTheDocument();
    });

    it('calls refresh when retry button is clicked', async () => {
      render(<VocListContainer initialVocs={[]} />);
      
      const retryButton = screen.getByText('retry');
      
      await act(async () => {
        retryButton.click();
      });
      
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    it('applies correct classes to error container', () => {
      render(<VocListContainer initialVocs={[]} />);
      
      const errorContainer = screen.getByText('retry').parentElement;
      expect(errorContainer).toHaveClass(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'py-8'
      );
    });

    it('applies correct classes to retry button', () => {
      render(<VocListContainer initialVocs={[]} />);
      
      const retryButton = screen.getByText('retry');
      expect(retryButton).toHaveClass(
        'px-4',
        'py-2',
        'bg-blue-500',
        'text-white',
        'rounded',
        'hover:bg-blue-600'
      );
    });
  });

  describe('End State (No More Data)', () => {
    beforeEach(() => {
      mockUseLazyLoad.mockReturnValue({
        data: mockInitialVocs,
        loading: false,
        error: null,
        hasMore: false,
        observerRef: { current: null },
        refresh: jest.fn()
      });
    });

    it('shows finish line when no more data', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      expect(screen.getByTestId('finish-line')).toBeInTheDocument();
    });

    it('applies correct classes to finish line', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      const finishLine = screen.getByTestId('finish-line');
      expect(finishLine).toHaveClass('w-full', 'pt-10', 'pb-32');
    });

    it('does not show observer element when hasMore is false', () => {
      const { container } = render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      const observerElement = container.querySelector('.h-12');
      expect(observerElement).not.toBeInTheDocument();
    });
  });

  describe('Word Selection', () => {
    beforeEach(() => {
      mockUseLazyLoad.mockReturnValue({
        data: mockInitialVocs,
        loading: false,
        error: null,
        hasMore: true,
        observerRef: { current: null },
        refresh: jest.fn()
      });
    });

    it('opens VocCard when word is clicked', async () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      const vocItem = screen.getByTestId('voc-item-vocab-1');
      
      await act(async () => {
        vocItem.click();
      });
      
      expect(screen.getByTestId('voc-card')).toBeInTheDocument();
      expect(screen.getByTestId('voc-card')).toHaveAttribute('data-word', 'hello');
    });

    it('closes VocCard when close button is clicked', async () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      const vocItem = screen.getByTestId('voc-item-vocab-1');
      
      await act(async () => {
        vocItem.click();
      });
      
      expect(screen.getByTestId('voc-card')).toBeInTheDocument();
      
      const closeButton = screen.getByText('Close');
      
      await act(async () => {
        closeButton.click();
      });
      
      expect(screen.queryByTestId('voc-card')).not.toBeInTheDocument();
    });

    it('updates selected word when different item is clicked', async () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      const vocItem1 = screen.getByTestId('voc-item-vocab-1');
      
      await act(async () => {
        vocItem1.click();
      });
      
      expect(screen.getByTestId('voc-card')).toHaveAttribute('data-word', 'hello');
      
      const vocItem2 = screen.getByTestId('voc-item-vocab-2');
      
      await act(async () => {
        vocItem2.click();
      });
      
      expect(screen.getByTestId('voc-card')).toHaveAttribute('data-word', 'world');
    });
  });

  describe('useLazyLoad Integration', () => {
    it('calls useLazyLoad with correct parameters', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      expect(mockUseLazyLoad).toHaveBeenCalledWith('/api/voc', {
        initialData: mockInitialVocs,
        pageSize: 20,
        rootMargin: "200px",
        threshold: 0.1
      });
    });

    it('passes initialVocs to useLazyLoad', () => {
      const customInitialVocs: Vocabulary[] = [
        {
          publicVocabularyId: 'custom-1',
          word: 'custom',
          phonetic: '',
          pronunciation: '',
          definitions: []
        }
      ];

      render(<VocListContainer initialVocs={customInitialVocs} />);
      
      expect(mockUseLazyLoad).toHaveBeenCalledWith('/api/voc', expect.objectContaining({
        initialData: customInitialVocs
      }));
    });
  });

  describe('Component Structure', () => {
    beforeEach(() => {
      mockUseLazyLoad.mockReturnValue({
        data: mockInitialVocs,
        loading: false,
        error: null,
        hasMore: true,
        observerRef: { current: null },
        refresh: jest.fn()
      });
    });

    it('renders Fragment as root element', () => {
      const { container } = render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      // Fragment doesn't create a wrapper element
      expect(container.firstChild).toBe(screen.getByTestId('voc-list'));
    });

    it('conditionally renders elements based on state', () => {
      render(<VocListContainer initialVocs={mockInitialVocs} />);
      
      expect(screen.getByTestId('voc-list')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-animation')).not.toBeInTheDocument();
      expect(screen.queryByTestId('voc-card')).not.toBeInTheDocument();
      expect(screen.queryByTestId('finish-line')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty initial vocabularies', () => {
      mockUseLazyLoad.mockReturnValue({
        data: [],
        loading: false,
        error: null,
        hasMore: false,
        observerRef: { current: null },
        refresh: jest.fn()
      });

      render(<VocListContainer initialVocs={[]} />);
      
      expect(screen.getByTestId('voc-list')).toBeInTheDocument();
      expect(screen.getByTestId('finish-line')).toBeInTheDocument();
    });

    it('handles simultaneous loading and error states gracefully', () => {
      mockUseLazyLoad.mockReturnValue({
        data: [],
        loading: true,
        error: new Error('Error'),
        hasMore: false,
        observerRef: { current: null },
        refresh: jest.fn()
      });

      render(<VocListContainer initialVocs={[]} />);
      
      // Error state takes precedence
      expect(screen.getByText('There were some errors, please try again')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-animation')).not.toBeInTheDocument();
    });
  });
});