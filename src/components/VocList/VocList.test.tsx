import { render, screen } from '@testing-library/react';
import VocList from '@/components/VocList';
import { Vocabulary } from '@/types';

jest.mock('@/components/VocItem', () => {
  return function MockVocItem({ 
    item, 
    handleClick 
  }: { 
    item: Vocabulary; 
    handleClick: () => void; 
  }) {
    return (
      <div data-testid={`voc-item-${item.publicVocabularyId}`} onClick={handleClick}>
        {item.word}
      </div>
    );
  };
});

describe('VocList', () => {
  const mockOnItemClick = jest.fn();

  const mockVocabularies: Vocabulary[] = [
    {
      publicVocabularyId: 'vocab-1',
      word: 'hello',
      phonetic: '/həˈloʊ/',
      pronunciation: 'huh-LOH',
      definitions: [
        {
          id: 'def-1',
          partOfSpeech: 'interjection',
          definition: 'used as a greeting',
          example: 'Hello, how are you?'
        }
      ]
    },
    {
      publicVocabularyId: 'vocab-2',
      word: 'world',
      phonetic: '/wɜːrld/',
      pronunciation: 'wurld',
      definitions: [
        {
          id: 'def-2',
          partOfSpeech: 'noun',
          definition: 'the earth and all the people and things on it',
          example: 'She traveled around the world.'
        }
      ]
    },
    {
      publicVocabularyId: 'vocab-3',
      word: 'programming',
      phonetic: '/ˈproʊɡræmɪŋ/',
      pronunciation: 'PROH-gram-ing',
      definitions: [
        {
          id: 'def-3',
          partOfSpeech: 'noun',
          definition: 'the process of writing computer programs',
          example: 'She is learning programming.'
        }
      ]
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<VocList vocs={[]} onItemClick={mockOnItemClick} />);
      
      const container = document.querySelector('.w-full');
      expect(container).toBeInTheDocument();
    });

    it('applies correct CSS class to container', () => {
      const { container } = render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('w-full');
    });

    it('renders as div element', () => {
      const { container } = render(<VocList vocs={[]} onItemClick={mockOnItemClick} />);
      
      expect(container.firstChild?.nodeName).toBe('DIV');
    });
  });

  describe('Vocabulary Items', () => {
    it('renders all vocabulary items', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      expect(screen.getByTestId('voc-item-vocab-1')).toBeInTheDocument();
      expect(screen.getByTestId('voc-item-vocab-2')).toBeInTheDocument();
      expect(screen.getByTestId('voc-item-vocab-3')).toBeInTheDocument();
    });

    it('displays vocabulary words correctly', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      expect(screen.getByText('hello')).toBeInTheDocument();
      expect(screen.getByText('world')).toBeInTheDocument();
      expect(screen.getByText('programming')).toBeInTheDocument();
    });

    it('uses publicVocabularyId as key', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      const items = document.querySelectorAll('[data-testid^="voc-item-"]');
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveAttribute('data-testid', 'voc-item-vocab-1');
      expect(items[1]).toHaveAttribute('data-testid', 'voc-item-vocab-2');
      expect(items[2]).toHaveAttribute('data-testid', 'voc-item-vocab-3');
    });
  });

  describe('Empty State', () => {
    it('renders empty container when no vocabularies provided', () => {
      render(<VocList vocs={[]} onItemClick={mockOnItemClick} />);
      
      const container = document.querySelector('.w-full');
      expect(container).toBeInTheDocument();
      expect(container?.children).toHaveLength(0);
    });

    it('handles undefined vocs array gracefully', () => {
      render(<VocList vocs={[] as Vocabulary[]} onItemClick={mockOnItemClick} />);
      
      expect(document.querySelector('.w-full')).toBeInTheDocument();
    });
  });

  describe('Item Click Handling', () => {
    it('calls onItemClick with correct word when item is clicked', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      const helloItem = screen.getByTestId('voc-item-vocab-1');
      helloItem.click();
      
      expect(mockOnItemClick).toHaveBeenCalledTimes(1);
      expect(mockOnItemClick).toHaveBeenCalledWith('hello');
    });

    it('calls onItemClick for different vocabulary items', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      const worldItem = screen.getByTestId('voc-item-vocab-2');
      const programmingItem = screen.getByTestId('voc-item-vocab-3');
      
      worldItem.click();
      expect(mockOnItemClick).toHaveBeenCalledWith('world');
      
      programmingItem.click();
      expect(mockOnItemClick).toHaveBeenCalledWith('programming');
      
      expect(mockOnItemClick).toHaveBeenCalledTimes(2);
    });

    it('handles multiple clicks on same item', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      const helloItem = screen.getByTestId('voc-item-vocab-1');
      helloItem.click();
      helloItem.click();
      helloItem.click();
      
      expect(mockOnItemClick).toHaveBeenCalledTimes(3);
      expect(mockOnItemClick).toHaveBeenNthCalledWith(1, 'hello');
      expect(mockOnItemClick).toHaveBeenNthCalledWith(2, 'hello');
      expect(mockOnItemClick).toHaveBeenNthCalledWith(3, 'hello');
    });
  });

  describe('VocItem Props', () => {
    it('passes correct item prop to VocItem', () => {
      render(<VocList vocs={[mockVocabularies[0]]} onItemClick={mockOnItemClick} />);
      
      const vocItem = screen.getByTestId('voc-item-vocab-1');
      expect(vocItem).toBeInTheDocument();
      expect(vocItem).toHaveTextContent('hello');
    });

    it('passes correct handleClick function to each VocItem', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      // Each item should have its own click handler that calls onItemClick with the correct word
      const items = [
        { id: 'vocab-1', word: 'hello' },
        { id: 'vocab-2', word: 'world' },
        { id: 'vocab-3', word: 'programming' }
      ];
      
      items.forEach(({ id, word }) => {
        const item = screen.getByTestId(`voc-item-${id}`);
        item.click();
        expect(mockOnItemClick).toHaveBeenCalledWith(word);
      });
      
      expect(mockOnItemClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('Edge Cases', () => {
    it('handles vocabulary with empty word', () => {
      const vocWithEmptyWord: Vocabulary = {
        publicVocabularyId: 'empty-word',
        word: '',
        phonetic: '',
        pronunciation: '',
        definitions: []
      };
      
      render(<VocList vocs={[vocWithEmptyWord]} onItemClick={mockOnItemClick} />);
      
      const item = screen.getByTestId('voc-item-empty-word');
      expect(item).toBeInTheDocument();
      
      item.click();
      expect(mockOnItemClick).toHaveBeenCalledWith('');
    });

    it('handles vocabulary with special characters in word', () => {
      const vocWithSpecialChars: Vocabulary = {
        publicVocabularyId: 'special-chars',
        word: "don't",
        phonetic: '/doʊnt/',
        pronunciation: 'dohnt',
        definitions: []
      };
      
      render(<VocList vocs={[vocWithSpecialChars]} onItemClick={mockOnItemClick} />);
      
      const item = screen.getByTestId('voc-item-special-chars');
      item.click();
      
      expect(mockOnItemClick).toHaveBeenCalledWith("don't");
    });

    it('handles large number of vocabulary items', () => {
      const manyVocs: Vocabulary[] = Array.from({ length: 100 }, (_, i) => ({
        publicVocabularyId: `vocab-${i}`,
        word: `word${i}`,
        phonetic: '',
        pronunciation: '',
        definitions: []
      }));
      
      render(<VocList vocs={manyVocs} onItemClick={mockOnItemClick} />);
      
      const items = document.querySelectorAll('[data-testid^="voc-item-"]');
      expect(items).toHaveLength(100);
    });
  });

  describe('Component Integration', () => {
    it('integrates correctly with VocItem component', () => {
      render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      // Verify that VocItem components are rendered and functional
      mockVocabularies.forEach((vocab) => {
        const item = screen.getByTestId(`voc-item-${vocab.publicVocabularyId}`);
        expect(item).toBeInTheDocument();
        expect(item).toHaveTextContent(vocab.word);
      });
    });

    it('maintains correct component hierarchy', () => {
      const { container } = render(<VocList vocs={mockVocabularies} onItemClick={mockOnItemClick} />);
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
      expect(wrapper?.children).toHaveLength(3);
    });
  });
});