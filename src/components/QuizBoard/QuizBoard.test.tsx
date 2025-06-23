import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizBoard from '@/components/QuizBoard';
import { Vocabulary } from '@/types';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/hooks/useApi', () => ({
  useApi: jest.fn()
}));

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

describe('QuizBoard', () => {
  const mockPush = jest.fn();
  const mockUseApi = require('@/hooks/useApi').useApi;
  const mockUseRouter = require('next/navigation').useRouter;

  const mockItems: Vocabulary[] = [
    {
      publicVocabularyId: 'vocab-1',
      word: 'hello',
      userVocabularyId: 'user-vocab-1',
      definitions: [
        {
          id: 'def-1',
          partOfSpeech: 'interjection',
          definition: 'used as a greeting',
          pronunciation: 'huh-LOH',
          example: 'Hello, how are you?'
        }
      ]
    },
    {
      publicVocabularyId: 'vocab-2',
      word: 'world',
      userVocabularyId: 'user-vocab-2',
      definitions: [
        {
          id: 'def-2',
          partOfSpeech: 'noun',
          definition: 'the earth and all the people on it',
          pronunciation: 'wurld',
          example: 'She traveled around the world.'
        }
      ]
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseRouter.mockReturnValue({
      push: mockPush
    });

    mockUseApi.mockReturnValue({
      loading: false,
      execute: jest.fn().mockResolvedValue({ ok: true })
    });
  });

  describe('Rendering with items', () => {
    it('renders quiz interface with first item', () => {
      render(<QuizBoard items={mockItems} />);
      
      expect(screen.getByText('hello')).toBeInTheDocument();
      expect(screen.getByText('"Hello, how are you?"')).toBeInTheDocument();
      expect(screen.getByText('1 / 2')).toBeInTheDocument();
    });

    it('renders check answer button initially', () => {
      render(<QuizBoard items={mockItems} />);
      
      const checkButton = screen.getByText('Check the answer');
      expect(checkButton).toBeInTheDocument();
    });

    it('applies correct CSS classes to main container', () => {
      const { container } = render(<QuizBoard items={mockItems} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'flex',
        'flex-col',
        'w-full',
        'max-w-[720px]',
        'mx-auto'
      );
    });

    it('displays progress counter', () => {
      render(<QuizBoard items={mockItems} />);
      
      expect(screen.getByText('1 / 2')).toBeInTheDocument();
    });
  });

  describe('Answer reveal functionality', () => {
    it('shows answer details when check answer is clicked', () => {
      render(<QuizBoard items={mockItems} />);
      
      const checkButton = screen.getByText('Check the answer');
      fireEvent.click(checkButton);
      
      expect(screen.getByText('interjection')).toBeInTheDocument();
      expect(screen.getByText('[huh-LOH]')).toBeInTheDocument();
      expect(screen.getByText('used as a greeting')).toBeInTheDocument();
    });

    it('shows answer options after revealing answer', () => {
      render(<QuizBoard items={mockItems} />);
      
      const checkButton = screen.getByText('Check the answer');
      fireEvent.click(checkButton);
      
      expect(screen.getByText('✅ I remember')).toBeInTheDocument();
      expect(screen.getByText('❓ I\'m not sure')).toBeInTheDocument();
      expect(screen.getByText('❌ I forgot')).toBeInTheDocument();
    });

    it('hides check answer button after revealing', () => {
      render(<QuizBoard items={mockItems} />);
      
      const checkButton = screen.getByText('Check the answer');
      fireEvent.click(checkButton);
      
      expect(screen.queryByText('Check the answer')).not.toBeInTheDocument();
    });
  });

  describe('Quiz progression', () => {
    it('advances to next question when answer is selected', () => {
      render(<QuizBoard items={mockItems} />);
      
      // Reveal answer for first question
      const checkButton = screen.getByText('Check the answer');
      fireEvent.click(checkButton);
      
      // Select "I remember"
      const rememberButton = screen.getByText('✅ I remember');
      fireEvent.click(rememberButton);
      
      // Should show second question
      expect(screen.getByText('world')).toBeInTheDocument();
      expect(screen.getByText('2 / 2')).toBeInTheDocument();
    });

    it('handles all answer types correctly', () => {
      render(<QuizBoard items={mockItems} />);
      
      // Test "I'm not sure" answer
      const checkButton = screen.getByText('Check the answer');
      fireEvent.click(checkButton);
      
      const notSureButton = screen.getByText('❓ I\'m not sure');
      fireEvent.click(notSureButton);
      
      expect(screen.getByText('world')).toBeInTheDocument();
    });

    it('completes quiz after last question', async () => {
      const mockExecute = jest.fn().mockResolvedValue({ ok: true });
      mockUseApi.mockReturnValue({
        loading: false,
        execute: mockExecute
      });

      render(<QuizBoard items={mockItems} />);
      
      // Complete first question
      fireEvent.click(screen.getByText('Check the answer'));
      fireEvent.click(screen.getByText('✅ I remember'));
      
      // Complete second question
      fireEvent.click(screen.getByText('Check the answer'));
      fireEvent.click(screen.getByText('✅ I remember'));
      
      // Should show completion screen
      await waitFor(() => {
        expect(screen.getByText('Quiz Completed! 🎉')).toBeInTheDocument();
        expect(screen.getByText('Processing your results...')).toBeInTheDocument();
      });
    });
  });

  describe('Quiz completion and navigation', () => {
    it('submits results and navigates to results page', async () => {
      const mockExecute = jest.fn().mockResolvedValue({ ok: true });
      mockUseApi.mockReturnValue({
        loading: false,
        execute: mockExecute
      });

      render(<QuizBoard items={mockItems} />);
      
      // Complete both questions with "remember"
      fireEvent.click(screen.getByText('Check the answer'));
      fireEvent.click(screen.getByText('✅ I remember'));
      
      fireEvent.click(screen.getByText('Check the answer'));
      fireEvent.click(screen.getByText('✅ I remember'));
      
      await waitFor(() => {
        expect(mockExecute).toHaveBeenCalledWith({
          url: '/api/quiz',
          method: 'POST',
          body: expect.stringContaining('remembered')
        });
      });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/Quiz/Result?words=hello%2Cworld');
      });
    });

    it('handles API errors during submission', async () => {
      const mockExecute = jest.fn().mockResolvedValue({ ok: false, status: 500 });
      mockUseApi.mockReturnValue({
        loading: false,
        execute: mockExecute
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(<QuizBoard items={mockItems} />);
      
      // Complete quiz
      fireEvent.click(screen.getByText('Check the answer'));
      fireEvent.click(screen.getByText('✅ I remember'));
      
      fireEvent.click(screen.getByText('Check the answer'));
      fireEvent.click(screen.getByText('✅ I remember'));
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to submit quiz results:', expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Edge cases', () => {
    it('handles empty items array', () => {
      render(<QuizBoard items={[]} />);
      
      expect(screen.getByText('No vocabulary items available')).toBeInTheDocument();
    });

    it('handles items with no definitions', () => {
      const itemsWithNoDefinitions: Vocabulary[] = [
        {
          ...mockItems[0],
          definitions: []
        }
      ];

      render(<QuizBoard items={itemsWithNoDefinitions} />);
      
      expect(screen.getByText('hello')).toBeInTheDocument();
      expect(screen.getByText('"No example"')).toBeInTheDocument();
    });

    it('handles items with multiple definitions', () => {
      const itemsWithMultipleDefinitions: Vocabulary[] = [
        {
          ...mockItems[0],
          definitions: [
            mockItems[0].definitions[0],
            {
              id: 'def-2',
              partOfSpeech: 'noun',
              definition: 'an exclamation of greeting',
              example: 'She said hello'
            }
          ]
        }
      ];

      render(<QuizBoard items={itemsWithMultipleDefinitions} />);
      
      // Should render one of the definitions randomly
      expect(screen.getByText('hello')).toBeInTheDocument();
    });
  });

  describe('Loading state during submission', () => {
it('shows loading state during API call', async () => {
  const mockExecute = jest.fn().mockImplementation(() => 
    new Promise(resolve => setTimeout(() => resolve({ ok: true }), 200))
  );
  
  mockUseApi.mockReturnValue({
    loading: false, // 不要在一開始就阻擋流程
    execute: mockExecute
  });

  render(<QuizBoard items={mockItems} />);

  // ✅ 第 1 題
  fireEvent.click(screen.getByText('Check the answer'));
  fireEvent.click(screen.getByText('✅ I remember'));

  // ✅ 第 2 題
  fireEvent.click(screen.getByText('Check the answer'));
  fireEvent.click(screen.getByText('✅ I remember'));

  // 🕵️ 等待 loading 畫面出現
  await waitFor(() => {
    expect(screen.getByText('Quiz Completed! 🎉')).toBeInTheDocument();
    expect(screen.getByText('Processing your results...')).toBeInTheDocument();
  });
});

  });

  describe('Answer content display', () => {
    it('displays N/A for missing answer parts', () => {
      const itemWithIncompleteDefinition: Vocabulary[] = [
        {
          ...mockItems[0],
          definitions: [
            {
              id: 'def-1',
              definition: 'basic definition',
              partOfSpeech: 'noun',
            }
          ]
        }
      ];

      render(<QuizBoard items={itemWithIncompleteDefinition} />);
      
      fireEvent.click(screen.getByText('Check the answer'));
      
      // There are multiple N/A elements for missing fields
      expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
    });

    it('shows quiz progress correctly', () => {
      render(<QuizBoard items={mockItems} />);
      
      expect(screen.getByText('1 / 2')).toBeInTheDocument();
      
      // Progress to next question
      fireEvent.click(screen.getByText('Check the answer'));
      fireEvent.click(screen.getByText('✅ I remember'));
      
      expect(screen.getByText('2 / 2')).toBeInTheDocument();
    });
  });
});