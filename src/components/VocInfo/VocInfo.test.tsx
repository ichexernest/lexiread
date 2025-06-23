import { render, screen, waitFor, act } from '@testing-library/react';
import VocInfo from '@/components/VocInfo';

// Mock dependencies
jest.mock('@/hooks/useApi', () => ({
  useApi: jest.fn()
}));

jest.mock('@/components/SaveButton', () => {
  return function MockSaveButton({ 
    isSaved, 
    saveId, 
    saveType 
  }: { 
    isSaved: boolean; 
    saveId: string; 
    saveType: string; 
  }) {
    return (
      <div data-testid="save-button" data-saved={isSaved} data-save-id={saveId} data-save-type={saveType}>
        Save Button
      </div>
    );
  };
});

jest.mock('@/components/FamiliaritySign', () => {
  return function MockFamiliaritySign({ familiarity }: { familiarity: number }) {
    return <div data-testid="familiarity-sign" data-familiarity={familiarity}></div>;
  };
});

describe('VocInfo', () => {
  const mockUseApi = require('@/hooks/useApi').useApi;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Loading State', () => {
    it('shows searching message when loading', () => {
      mockUseApi.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        execute: jest.fn().mockResolvedValue({ ok: true, status: 200, data: null }),
        reset: jest.fn()
      });

      render(<VocInfo word="hello" />);
      
      expect(screen.getByText('Searching for 「hello」...')).toBeInTheDocument();
    });
  });

  describe('Generating State', () => {
    it('shows generating message when AI is processing', async () => {
      const mockExecute = jest.fn().mockImplementation(() => 
        Promise.resolve({ 
          ok: false, 
          status: 404, 
          error: 'Not found',
          data: null 
        })
      );
      
      mockUseApi.mockReturnValue({
        data: null,
        loading: false,
        error: null,
        execute: mockExecute,
        reset: jest.fn()
      });

      render(<VocInfo word="programming" />);
      
      // Wait for the initial execute call to complete
      await waitFor(() => {
        expect(mockExecute).toHaveBeenCalled();
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Cannot find definition for「programming」, AI is generating/)).toBeInTheDocument();
      });
    });
  });

  describe('Error State', () => {
    it('shows error message when data cannot be found', () => {
      mockUseApi.mockReturnValue({
        data: null,
        loading: false,
        error: new Error('Not found'),
        execute: jest.fn().mockResolvedValue({ ok: false, status: 404, error: 'Not found' }),
        reset: jest.fn()
      });

      render(<VocInfo word="nonexistent" />);
      
      expect(screen.getByText('Cannot find definition for「nonexistent」')).toBeInTheDocument();
    });
  });

  describe('Success State with Data', () => {
    const mockVocabulary = {
      word: 'example',
      publicVocabularyId: 'vocab-123',
      familiarity: 3,
      userVocabularyId: 'user-vocab-456',
      definitions: [
        {
          id: 'def-1',
          partOfSpeech: 'noun',
          definition: 'a thing characteristic of its kind',
          pronunciation: 'ig-ZAM-puhl',
          example: 'This is a good example.',
          localDefinition: '例子',
          synonyms: 'instance, case',
          antonyms: 'exception',
          exampleTranslation: '這是一個好例子。'
        }
      ],
      customDefinition: 'My custom definition',
      customExample: 'My custom example',
      personalNote: 'This is important to remember'
    };

    beforeEach(() => {
      mockUseApi.mockReturnValue({
        data: mockVocabulary,
        loading: false,
        error: null,
        execute: jest.fn().mockResolvedValue({ ok: true, status: 200, data: mockVocabulary }),
        reset: jest.fn()
      });
    });

    it('renders vocabulary word and basic info', () => {
      render(<VocInfo word="example" />);
      
      expect(screen.getByText('example')).toBeInTheDocument();
      expect(screen.getByText('[ig-ZAM-puhl]')).toBeInTheDocument();
    });

    it('displays familiarity sign when available', () => {
      render(<VocInfo word="example" />);
      
      const familiaritySign = screen.getByTestId('familiarity-sign');
      expect(familiaritySign).toHaveAttribute('data-familiarity', '3');
    });

    it('renders definitions with part of speech', () => {
      render(<VocInfo word="example" />);
      
      expect(screen.getByText('noun')).toBeInTheDocument();
      expect(screen.getByText('a thing characteristic of its kind')).toBeInTheDocument();
    });

    it('displays local definition when available', () => {
      render(<VocInfo word="example" />);
      
      expect(screen.getByText('例子')).toBeInTheDocument();
    });

    it('shows synonyms and antonyms', () => {
      render(<VocInfo word="example" />);
      
      expect(screen.getByText('Synonyms：')).toBeInTheDocument();
      expect(screen.getByText('instance, case')).toBeInTheDocument();
      expect(screen.getByText('Antonyms：')).toBeInTheDocument();
      expect(screen.getByText('exception')).toBeInTheDocument();
    });

    it('displays example and translation', () => {
      render(<VocInfo word="example" />);
      
      // Check for the example text using a partial match
      expect(screen.getByText((content, element) => {
        return content.includes('This is a good example.');
      })).toBeInTheDocument();
      expect(screen.getByText('這是一個好例子。')).toBeInTheDocument();
    });

    it('shows custom definition and example', () => {
      render(<VocInfo word="example" />);
      
      expect(screen.getByText('✏️ My custom definition')).toBeInTheDocument();
      expect(screen.getByText('✏️ My custom example')).toBeInTheDocument();
    });

    it('displays personal note', () => {
      render(<VocInfo word="example" />);
      
      expect(screen.getByText('Note：')).toBeInTheDocument();
      expect(screen.getByText('This is important to remember')).toBeInTheDocument();
    });

    it('renders save button with correct props', () => {
      render(<VocInfo word="example" />);
      
      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toHaveAttribute('data-saved', 'true');
      expect(saveButton).toHaveAttribute('data-save-id', 'vocab-123');
      expect(saveButton).toHaveAttribute('data-save-type', 'voc');
    });
  });

  describe('Minimal Data Handling', () => {
    it('handles vocabulary with minimal definitions', () => {
      const minimalVocab = {
        word: 'test',
        publicVocabularyId: 'test-123',
        definitions: [
          {
            id: 'def-1',
            definition: 'basic definition'
          }
        ]
      };

      mockUseApi.mockReturnValue({
        data: minimalVocab,
        loading: false,
        error: null,
        execute: jest.fn().mockResolvedValue({ ok: true, status: 200, data: minimalVocab }),
        reset: jest.fn()
      });

      render(<VocInfo word="test" />);
      
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('basic definition')).toBeInTheDocument();
    });

    it('handles vocabulary without familiarity', () => {
      const vocabWithoutFamiliarity = {
        word: 'unfamiliar',
        publicVocabularyId: 'unfamiliar-123',
        definitions: []
      };

      mockUseApi.mockReturnValue({
        data: vocabWithoutFamiliarity,
        loading: false,
        error: null,
        execute: jest.fn().mockResolvedValue({ ok: true, status: 200, data: vocabWithoutFamiliarity }),
        reset: jest.fn()
      });

      render(<VocInfo word="unfamiliar" />);
      
      expect(screen.getByText('unfamiliar')).toBeInTheDocument();
      expect(screen.queryByTestId('familiarity-sign')).not.toBeInTheDocument();
    });
  });

  describe('API Lifecycle', () => {
    it('calls reset and execute on mount', () => {
      const mockReset = jest.fn();
      const mockExecute = jest.fn().mockResolvedValue({ ok: true, status: 200, data: null });

      mockUseApi.mockReturnValue({
        data: null,
        loading: false,
        error: null,
        execute: mockExecute,
        reset: mockReset
      });

      render(<VocInfo word="lifecycle" />);
      
      expect(mockReset).toHaveBeenCalled();
      expect(mockExecute).toHaveBeenCalledWith({
        url: '/api/voc/lifecycle',
        requireAuth: false
      });
    });

    it('calls execute with correct URL for different words', () => {
      const mockExecute = jest.fn().mockResolvedValue({ ok: true, status: 200, data: null });

      mockUseApi.mockReturnValue({
        data: null,
        loading: false,
        error: null,
        execute: mockExecute,
        reset: jest.fn()
      });

      render(<VocInfo word="different" />);
      
      expect(mockExecute).toHaveBeenCalledWith({
        url: '/api/voc/different',
        requireAuth: false
      });
    });
  });
});