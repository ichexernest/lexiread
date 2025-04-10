import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleCard from './index';
import { Article } from '@/types';

describe('ArticleCard', () => {
  const mockArticle: Article = {
    id: '5sdf',
    title: 'Richard Chamberlain, Shogun star, dies aged 90.',
    date: '2023-10-01',
    author: 'John Doe',
    image: 'https://picsum.photos/800/600'
  };

  it('應該正確渲染文章內容', () => {
    render(<ArticleCard item={mockArticle} />);

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.author)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.date)).toBeInTheDocument();
    expect(screen.getByAltText(mockArticle.title)).toBeInTheDocument();
  });
});
