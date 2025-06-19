import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleContent from '../ArticleContent';
import { Content } from '@/types';

const mockOnWordClick = jest.fn();

jest.mock('../ClickableWord', () => {
  return function MockClickableWord({ 
    word, 
    onClick
  }: { 
    word: string; 
    onClick: (word: string) => void; 
  }) {
    return (
      <span
        className="inline-block cursor-pointer hover:bg-primary-hover px-0.5 rounded transition-colors"
        onClick={() => onClick(word)}
      >
        {word}
      </span>
    );
  };
});

describe('ArticleContent', () => {
  const mockContent: Content = {
    contentId: 'climate-article-001',
    content: `Scientists have reported alarming new findings about the accelerating pace of climate change and its impact on global ecosystems.

According to the latest research published in Nature Climate Change, average global temperatures have risen by 1.2 degrees Celsius since pre-industrial times, with the Arctic warming at twice the global average.

Dr. Sarah Thompson, a climatologist at Stanford University, explains that "we're witnessing unprecedented changes in weather patterns, with more frequent extreme events such as hurricanes, droughts, and heatwaves."

The study analyzed data from over 200 weather stations worldwide and found that sea levels have risen by 8.2 inches since 1880, primarily due to thermal expansion of seawater and melting ice sheets.

Renewable energy adoption has accelerated significantly, with solar and wind power now accounting for 12% of global electricity generation, up from just 2% in 2010.

However, experts warn that current efforts may not be sufficient to limit warming to 1.5 degrees Celsius, the target set by the Paris Agreement in 2015.`,
    createdAt: '2024-03-15',
  };

  beforeEach(() => {
    mockOnWordClick.mockClear();
  });

  it('renders the article container with correct styling classes', () => {
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    const article = screen.getByRole('article');
    
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('text-lg', 'w-full', 'pt-5', 'px-5', 'md:px-0', 'prose', 'prose-lg', 'max-w-none');
  });

  it('displays climate-related scientific terminology correctly', () => {
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 檢查科學術語
    expect(screen.getByText('climatologist')).toBeInTheDocument();
    expect(screen.getByText('ecosystems')).toBeInTheDocument();
    expect(screen.getByText('unprecedented')).toBeInTheDocument();
    expect(screen.getByText('thermal')).toBeInTheDocument();
    expect(screen.getByText('expansion')).toBeInTheDocument();
    
    // 檢查專有名詞
    expect(screen.getByText('Arctic')).toBeInTheDocument();
    expect(screen.getByText('Stanford')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Agreement')).toBeInTheDocument();
  });

  it('correctly parses content into expected number of paragraphs', () => {
    const { container } = render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    const expectedParagraphCount = mockContent.content.split('\n\n').length;
    expect(expectedParagraphCount).toBe(6);
    
    const renderedParagraphs = container.querySelectorAll('p');
    expect(renderedParagraphs).toHaveLength(6);
    
    // 驗證每個段落的樣式類別
    renderedParagraphs.forEach(paragraph => {
      expect(paragraph).toHaveClass('mb-5', 'leading-8', 'text-neutral-800', 'text-pretty');
    });
  });

  it('triggers word click handler when scientific terms are clicked', async () => {
    const user = userEvent.setup();
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    const climateWord = screen.getByText('climate');
    const scientistsWord = screen.getByText('Scientists');
    
    await user.click(climateWord);
    await user.click(scientistsWord);
    
    expect(mockOnWordClick).toHaveBeenCalledTimes(2);
    expect(mockOnWordClick).toHaveBeenNthCalledWith(1, 'climate');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(2, 'Scientists');
  });

  it('handles sequential clicks on different vocabulary words', async () => {
    const user = userEvent.setup();
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    const targetWords = [
      screen.getByText('accelerating'),
      screen.getByText('temperature'),
      screen.getByText('renewable'),
      screen.getByText('sufficient')
    ];
    
    for (const word of targetWords) {
      await user.click(word);
    }
    
    expect(mockOnWordClick).toHaveBeenCalledTimes(4);
    expect(mockOnWordClick).toHaveBeenNthCalledWith(1, 'accelerating');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(2, 'temperature');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(3, 'renewable');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(4, 'sufficient');
  });

  it('preserves punctuation and formatting in clickable words', async () => {
    const user = userEvent.setup();
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 測試帶引號的詞
    const quotedPhrase = screen.getByText('"we\'re');
    const endQuote = screen.getByText('heatwaves."');
    
    await user.click(quotedPhrase);
    await user.click(endQuote);
    
    expect(mockOnWordClick).toHaveBeenCalledTimes(2);
    expect(mockOnWordClick).toHaveBeenNthCalledWith(1, '"we\'re');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(2, 'heatwaves."');
  });

  it('maintains proper text flow and spacing between words', () => {
    const { container } = render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    const firstParagraph = container.querySelector('p');
    expect(firstParagraph).toBeInTheDocument();
    
    // 檢查文字內容保持完整性
    expect(firstParagraph?.textContent).toContain('Scientists have reported alarming new findings');
    expect(firstParagraph?.textContent).toContain('accelerating pace of climate change');
  });

  it('gracefully handles content with no paragraphs', () => {
    const emptyContent: Content = {
      contentId: 'empty-climate-001',
      content: '',
      createdAt: '2024-03-15',
    };
    
    const { container } = render(<ArticleContent content={emptyContent} onWordClick={mockOnWordClick} />);
    const article = screen.getByRole('article');
    
    expect(article).toBeInTheDocument();
    
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(1);
    
    const spans = paragraphs[0].querySelectorAll('span');
    expect(spans).toHaveLength(1);
    expect(spans[0]).toHaveTextContent('');
  });

  it('processes single-line content without paragraph breaks', () => {
    const shortContent: Content = {
      contentId: 'short-climate-001',
      content: 'Climate change requires immediate global action and sustainable solutions.',
      createdAt: '2024-03-15',
    };
    
    const { container } = render(<ArticleContent content={shortContent} onWordClick={mockOnWordClick} />);
    
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(1);
    expect(paragraphs[0]).toHaveTextContent('Climate change requires immediate global action and sustainable solutions.');
  });

  it('handles numeric data and measurements correctly', async () => {
    const user = userEvent.setup();
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 測試包含數字的詞
    const degreesMeasurement = screen.getByText('1.2');
    const percentageData = screen.getByText('12%');
    const yearReference = screen.getByText('2015.');
    
    await user.click(degreesMeasurement);
    await user.click(percentageData);
    await user.click(yearReference);
    
    expect(mockOnWordClick).toHaveBeenCalledTimes(3);
    expect(mockOnWordClick).toHaveBeenNthCalledWith(1, '1.2');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(2, '12%');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(3, '2015.');
  });

  it('validates content structure matches expected format', () => {
    const { container } = render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    const paragraphs = container.querySelectorAll('p');
    
    // 檢查第一段包含開場內容
    expect(paragraphs[0]).toHaveTextContent(/Scientists have reported/);
    
    // 檢查中間段落包含研究數據
    expect(paragraphs[1]).toHaveTextContent(/Nature Climate Change/);
    expect(paragraphs[3]).toHaveTextContent(/200 weather stations/);
    
    // 檢查最後一段包含結論
    expect(paragraphs[5]).toHaveTextContent(/Paris Agreement/);
  });
});