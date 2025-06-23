import { render, screen } from '@testing-library/react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types';


jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

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
      <button data-testid="save-button" data-saved={isSaved}>
        {isSaved ? 'Saved' : 'Save'} {saveType} {saveId}
      </button>
    );
  };
});

jest.mock('@/utils/utils', () => ({
  __esModule: true,
  default: {
    formatDateToLocalString: jest.fn((date: string) => `formatted-${date}`)
  }
}));

describe('ArticleCard', () => {
  const mockArticle: Article = {
    publicArticleId: 'article-123',
    title: 'Test Article Title',
    author: 'John Doe',
    date: '2024-01-01',
    image: 'https://example.com/test-image.jpg',
    slug: 'test-article-title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // 重新設置 utils mock 
    const mockFormatDate = jest.fn((date: string) => `formatted-${date}`);
    jest.doMock('@/utils/utils', () => ({
      __esModule: true,
      default: {
        formatDateToLocalString: mockFormatDate
      }
    }));
  });

  describe('Article Information Display', () => {
    it('renders article title correctly', () => {
      render(<ArticleCard item={mockArticle} />);
      expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    });

    it('renders article author correctly', () => {
      render(<ArticleCard item={mockArticle} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders formatted date correctly', () => {
      render(<ArticleCard item={mockArticle} />);
      expect(screen.getByText('formatted-2024-01-01')).toBeInTheDocument();
    });
  });

  describe('Image Display', () => {
    it('renders image with correct src and alt attributes', () => {
      render(<ArticleCard item={mockArticle} />);
      
      const image = screen.getByAltText('Test Article Title');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
    });

    it('uses article title as image alt text', () => {
      const articleWithLongTitle = {
        ...mockArticle,
        title: 'This is a very long article title for testing purposes'
      };
      
      render(<ArticleCard item={articleWithLongTitle} />);
      
      const image = screen.getByAltText('This is a very long article title for testing purposes');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Navigation Link', () => {
    it('renders link with correct href to article detail page', () => {
      render(<ArticleCard item={mockArticle} />);
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/Article/article-123');
    });

    it('wraps article content in clickable link', () => {
      render(<ArticleCard item={mockArticle} />);
      
      const link = screen.getByRole('link');
      expect(link).toContainElement(screen.getByText('Test Article Title'));
      expect(link).toContainElement(screen.getByText('John Doe'));
      expect(link).toContainElement(screen.getByAltText('Test Article Title'));
    });
  });

  describe('Save Button', () => {
    it('shows unsaved state when userArticleId is null', () => {
      const unsavedArticle = {
        ...mockArticle,
      };
      
      render(<ArticleCard item={unsavedArticle} />);
      
      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toHaveTextContent('Save article article-123');
      expect(saveButton).toHaveAttribute('data-saved', 'false');
    });

    it('shows unsaved state when userArticleId is undefined', () => {
      const unsavedArticle = {
        ...mockArticle,
        userArticleId: undefined
      };
      
      render(<ArticleCard item={unsavedArticle} />);
      
      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toHaveTextContent('Save article article-123');
      expect(saveButton).toHaveAttribute('data-saved', 'false');
    });

    it('shows saved state when userArticleId has value', () => {
      const savedArticle = {
        ...mockArticle,
        userArticleId: 'user-article-456'
      };
      
      render(<ArticleCard item={savedArticle} />);
      
      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toHaveTextContent('Saved article article-123');
      expect(saveButton).toHaveAttribute('data-saved', 'true');
    });

    it('passes correct props to SaveButton component', () => {
      const savedArticle = {
        ...mockArticle,
        userArticleId: 'user-article-456'
      };
      
      render(<ArticleCard item={savedArticle} />);
      
      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toHaveTextContent('Saved article article-123');
    });
  });

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<ArticleCard item={mockArticle} />);
      
      const cardContainer = container.firstChild as HTMLElement;
      expect(cardContainer).toHaveClass(
        'flex',
        'flex-col',
        'items-stretch',
        'justify-stretch',
        'pb-8',
        'py-5',
        'min-w-full',
        'px-4',
        'border-b',
        'hover:bg-primary-hover'
      );
    });

    it('applies correct CSS classes to image', () => {
      render(<ArticleCard item={mockArticle} />);
      
      const image = screen.getByAltText('Test Article Title');
      expect(image).toHaveClass('w-full', 'rounded-xl');
    });

    it('applies correct CSS classes to title', () => {
      render(<ArticleCard item={mockArticle} />);
      
      const title = screen.getByText('Test Article Title');
      expect(title).toHaveClass('text-2xl', 'font-bold');
    });
  });

  describe('Utils Integration', () => {
    it('calls formatDateToLocalString with correct date', () => {
      render(<ArticleCard item={mockArticle} />);
      expect(screen.getByText('formatted-2024-01-01')).toBeInTheDocument();
    });

    it('handles different date formats', () => {
      const articleWithDifferentDate = {
        ...mockArticle,
        date: '2023-12-25'
      };
      
      render(<ArticleCard item={articleWithDifferentDate} />);
      
      expect(screen.getByText('formatted-2023-12-25')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string values gracefully', () => {
      const articleWithEmptyValues = {
        ...mockArticle,
        title: '',
        author: '',
        date: ''
      };
      
      render(<ArticleCard item={articleWithEmptyValues} />);
      expect(screen.getByTestId('save-button')).toBeInTheDocument();
    });

    it('handles special characters in article data', () => {
      const articleWithSpecialChars = {
        ...mockArticle,
        title: 'Test & "Article" <Title>',
        author: 'John O\'Doe',
        publicArticleId: 'article-123-test'
      };
      
      render(<ArticleCard item={articleWithSpecialChars} />);
      
      expect(screen.getByText('Test & "Article" <Title>')).toBeInTheDocument();
      expect(screen.getByText('John O\'Doe')).toBeInTheDocument();
    });

    it('handles very long article titles', () => {
      const articleWithLongTitle = {
        ...mockArticle,
        title: 'This is an extremely long article title that might cause layout issues if not handled properly in the component rendering'
      };
      
      render(<ArticleCard item={articleWithLongTitle} />);
      
      expect(screen.getByText(articleWithLongTitle.title)).toBeInTheDocument();
    });
  });
});