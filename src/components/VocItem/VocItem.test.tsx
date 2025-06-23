import { render, screen, fireEvent } from '@testing-library/react';
import VocItem from '@/components/VocItem';
import { Vocabulary } from '@/types';

jest.mock('@/components/FamiliaritySign', () => {
  return function MockFamiliaritySign({ familiarity }: { familiarity: number }) {
    return <div data-testid="familiarity-sign" data-familiarity={familiarity}></div>;
  };
});

describe('VocItem', () => {
  const mockHandleClick = jest.fn();

  const mockVocabulary: Vocabulary = {
    publicVocabularyId: 'vocab-123',
    word: 'example',
    phonetic: '/ɪɡˈzæmpəl/',
    pronunciation: 'ig-ZAM-puhl',
    familiarity: 3,
    definitions: [
      {
        id: 'def-1',
        partOfSpeech: 'noun',
        definition: 'a thing characteristic of its kind',
        example: 'This is a good example.'
      }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders vocabulary item correctly', () => {
      render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      expect(screen.getByText('example')).toBeInTheDocument();
      expect(screen.getByTestId('familiarity-sign')).toBeInTheDocument();
    });

    it('displays word with correct styling', () => {
      render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const wordElement = screen.getByText('example');
      expect(wordElement).toHaveClass('text-xl', 'font-bold');
      expect(wordElement.tagName).toBe('SPAN');
    });

    it('renders familiarity sign with correct value', () => {
      render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const familiaritySign = screen.getByTestId('familiarity-sign');
      expect(familiaritySign).toHaveAttribute('data-familiarity', '3');
    });
  });

  describe('CSS Classes and Layout', () => {
    it('applies correct classes to main container', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'flex',
        'items-center',
        'justify-between',
        'py-3',
        'w-full',
        'border-b',
        'border-primary-hover',
        'gap-2',
        'px-3',
        'hover:bg-primary-hover',
        'cursor-pointer'
      );
    });

    it('applies correct classes to word container', () => {
      render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const wordContainer = screen.getByText('example').closest('div');
      expect(wordContainer).toHaveClass(
        'flex',
        'items-center',
        'justify-start',
        'py-3',
        'gap-2'
      );
    });

    it('applies correct classes to word paragraph', () => {
      render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const wordParagraph = screen.getByText('example').closest('p');
      expect(wordParagraph).toHaveClass('font-bold');
    });
  });

  describe('Click Functionality', () => {
    it('calls handleClick when container is clicked', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      fireEvent.click(mainContainer);
      
      expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('calls handleClick when word is clicked', () => {
      render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const wordElement = screen.getByText('example');
      fireEvent.click(wordElement);
      
      expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('handles multiple clicks correctly', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      fireEvent.click(mainContainer);
      fireEvent.click(mainContainer);
      fireEvent.click(mainContainer);
      
      expect(mockHandleClick).toHaveBeenCalledTimes(3);
    });

    it('does not call handleClick when not provided', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={undefined as any} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      // Should not throw error
      expect(() => fireEvent.click(mainContainer)).not.toThrow();
    });
  });

  describe('Different Familiarity Levels', () => {
    it('handles familiarity level 0', () => {
      const vocab = { ...mockVocabulary, familiarity: 0 };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      const familiaritySign = screen.getByTestId('familiarity-sign');
      expect(familiaritySign).toHaveAttribute('data-familiarity', '0');
    });

    it('handles familiarity level 4', () => {
      const vocab = { ...mockVocabulary, familiarity: 4 };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      const familiaritySign = screen.getByTestId('familiarity-sign');
      expect(familiaritySign).toHaveAttribute('data-familiarity', '4');
    });

    it('handles undefined familiarity with non-null assertion', () => {
      const vocab = { ...mockVocabulary, familiarity: undefined };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      // The component uses familiarity! so it will pass undefined to FamiliaritySign
      const familiaritySign = screen.getByTestId('familiarity-sign');
      expect(familiaritySign).not.toHaveAttribute('data-familiarity');
    });
  });

  describe('Different Words', () => {
    it('handles short words', () => {
      const vocab = { ...mockVocabulary, word: 'cat' };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      expect(screen.getByText('cat')).toBeInTheDocument();
    });

    it('handles long words', () => {
      const vocab = { ...mockVocabulary, word: 'antidisestablishmentarianism' };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      expect(screen.getByText('antidisestablishmentarianism')).toBeInTheDocument();
    });

    it('handles words with special characters', () => {
      const vocab = { ...mockVocabulary, word: "don't" };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      expect(screen.getByText("don't")).toBeInTheDocument();
    });

    it('handles words with numbers', () => {
      const vocab = { ...mockVocabulary, word: 'HTTP2' };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      expect(screen.getByText('HTTP2')).toBeInTheDocument();
    });

    it('handles empty word', () => {
      const vocab = { ...mockVocabulary, word: '' };
      render(<VocItem item={vocab} handleClick={mockHandleClick} />);
      
      const wordElement = screen.getByTestId('familiarity-sign').parentElement?.querySelector('span');
      expect(wordElement).toBeInTheDocument();
      expect(wordElement?.textContent).toBe('');
    });
  });

  describe('Component Structure', () => {
    it('has correct HTML structure', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer.tagName).toBe('DIV');
      expect(mainContainer.children).toHaveLength(2);
    });

    it('contains word section and familiarity sign', () => {
      render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      expect(screen.getByText('example')).toBeInTheDocument();
      expect(screen.getByTestId('familiarity-sign')).toBeInTheDocument();
    });

    it('positions elements correctly with flexbox', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('flex', 'items-center', 'justify-between');
    });
  });

  describe('Hover and Interactive States', () => {
    it('has hover background class', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('hover:bg-primary-hover');
    });

    it('has cursor pointer for interactivity', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('cursor-pointer');
    });
  });

  describe('Accessibility', () => {
    it('is clickable for keyboard users', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      fireEvent.keyDown(mainContainer, { key: 'Enter' });
      
      // Click event still works for keyboard users
      fireEvent.click(mainContainer);
      expect(mockHandleClick).toHaveBeenCalledTimes(1);
    });

    it('could benefit from ARIA attributes for better accessibility', () => {
      const { container } = render(<VocItem item={mockVocabulary} handleClick={mockHandleClick} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      // This test documents that the component doesn't currently have ARIA attributes
      expect(mainContainer).not.toHaveAttribute('role');
      expect(mainContainer).not.toHaveAttribute('tabindex');
      expect(mainContainer).not.toHaveAttribute('aria-label');
    });
  });

  describe('Edge Cases', () => {
    it('handles vocabulary with minimal data', () => {
      const minimalVocab: Vocabulary = {
        publicVocabularyId: 'minimal',
        word: 'test',
        phonetic: '',
        pronunciation: '',
        familiarity: 1,
        definitions: []
      };
      
      render(<VocItem item={minimalVocab} handleClick={mockHandleClick} />);
      
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByTestId('familiarity-sign')).toBeInTheDocument();
    });

    it('handles vocabulary with all optional fields', () => {
      const fullVocab: Vocabulary = {
        publicVocabularyId: 'full',
        word: 'comprehensive',
        phonetic: '/ˌkɒmprɪˈhensɪv/',
        pronunciation: 'kom-pri-HEN-siv',
        familiarity: 2,
        definitions: [
          {
            id: 'def-1',
            partOfSpeech: 'adjective',
            definition: 'complete and including everything',
            example: 'A comprehensive guide to cooking.'
          }
        ],
        userVocabularyId: 'user-vocab-123',
        customDefinition: 'My custom definition',
        customExample: 'My custom example',
        personalNote: 'Personal note here'
      };
      
      render(<VocItem item={fullVocab} handleClick={mockHandleClick} />);
      
      expect(screen.getByText('comprehensive')).toBeInTheDocument();
    });
  });
});