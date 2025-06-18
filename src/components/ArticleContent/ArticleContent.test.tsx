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
    contentId:'mock-001',
    content: `The leaders of G7 nations have called for a "de-escalation of hostilities in the Middle East, including a ceasefire in Gaza".

In a joint statement, they also reiterated their "commitment to peace and stability" in the region, adding that within this context "Israel has a right to defend itself".

US President Donald Trump left the summit in Canada early telling reporters: "I have to be back early for obvious reasons."

His exit came as Israel and Iran attacked each other for a fifth consecutive day.

Reports circulated that Trump had instructed the White House National Security Council to meet upon his return.

US Defence Secretary Pete Hegseth announced the "deployment of additional capabilities" to the Middle East to enhance the Pentagon's "defensive posture". But American officials rejected suggestions the US was about to join the Israeli offensive on Iran.`,
    createdAt: '2024-01-01',
  };

  beforeEach(() => {
    mockOnWordClick.mockClear();
  });

  it('should render article content correctly', () => {
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('text-lg', 'w-full', 'pt-5', 'px-5', 'md:px-0', 'prose', 'prose-lg', 'max-w-none');
  });

  it('should display all text content', () => {
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 檢查關鍵詞是否存在
    expect(screen.getByText('G7')).toBeInTheDocument();
    expect(screen.getByText('nations')).toBeInTheDocument();
    expect(screen.getByText('Donald')).toBeInTheDocument();
    expect(screen.getAllByText('Trump')[0]).toBeInTheDocument();
    expect(screen.getByText('Israel')).toBeInTheDocument();
    expect(screen.getByText('Iran')).toBeInTheDocument();
    
  });

  it('should split content into correct number of paragraphs', () => {
    const { container } = render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 計算 mockContent 中的段落數量（以 \n\n 分割）
    const expectedParagraphs = mockContent.content.split('\n\n').length;
    expect(expectedParagraphs).toBe(6); // 驗證我們的預期是正確的
    
    // 檢查實際渲染的段落數量
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(6);
    
    // 檢查每個段落都有正確的 className
    paragraphs.forEach(p => {
      expect(p).toHaveClass('mb-5', 'leading-8', 'text-neutral-800', 'text-pretty');
    });
  });

  it('should call onWordClick when a word is clicked', async () => {
    const user = userEvent.setup();
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 點擊特定的詞（使用 getAllByText 處理重複的詞）
    const trumpWords = screen.getAllByText('Trump');
    await user.click(trumpWords[0]); // 點擊第一個 Trump
    
    // 驗證 mockOnWordClick 被呼叫
    expect(mockOnWordClick).toHaveBeenCalledTimes(1);
    expect(mockOnWordClick).toHaveBeenCalledWith('Trump');
  });

  it('should handle multiple word clicks correctly', async () => {
    const user = userEvent.setup();
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 點擊多個不同的詞
    const trumpWords = screen.getAllByText('Trump');
    const israelWords = screen.getAllByText('Israel');
    const g7Word = screen.getByText('G7');
    
    await user.click(trumpWords[0]); // 點擊第一個 Trump
    await user.click(israelWords[0]); // 點擊第一個 "Israel"
    await user.click(g7Word);
    
    // 檢查呼叫次數和參數
    expect(mockOnWordClick).toHaveBeenCalledTimes(3);
    expect(mockOnWordClick).toHaveBeenNthCalledWith(1, 'Trump');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(2, 'Israel');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(3, 'G7');
  });

  it('should handle punctuation in words correctly', async () => {
    const user = userEvent.setup();
    render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 點擊帶標點符號的詞
    const quotedWord = screen.getByText('"de-escalation'); // 開頭有引號
    const periodWord = screen.getByText('Gaza".'); // 結尾有引號和句號
    
    await user.click(quotedWord);
    await user.click(periodWord);
    
    expect(mockOnWordClick).toHaveBeenCalledTimes(2);
    expect(mockOnWordClick).toHaveBeenNthCalledWith(1, '"de-escalation');
    expect(mockOnWordClick).toHaveBeenNthCalledWith(2, 'Gaza".');
  });

  it('should render words with proper spacing', () => {
    const { container } = render(<ArticleContent content={mockContent} onWordClick={mockOnWordClick} />);
    
    // 檢查第一段的結構
    const firstParagraph = container.querySelector('p');
    expect(firstParagraph).toBeInTheDocument();
    
    // 檢查段落內容包含預期的文字（帶空格）
    expect(firstParagraph?.textContent).toContain('The leaders of G7 nations');
  });

  it('should handle empty content gracefully', () => {
    const emptyContent: Content = {
      contentId: 'empty-001',
      content: '',
      createdAt: '2024-01-01',
    };
    
    const { container } = render(<ArticleContent content={emptyContent} onWordClick={mockOnWordClick} />);
    const article = screen.getByRole('article');
    
    expect(article).toBeInTheDocument();
    // 空內容會產生一個空的段落（因為 split 會產生一個空字串）
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(1);
    
    // 檢查這個段落是否只包含一個空的 span
    const spans = paragraphs[0].querySelectorAll('span');
    expect(spans).toHaveLength(1);
    expect(spans[0]).toHaveTextContent('');
  });

  it('should handle single paragraph content', () => {
    const singleParagraphContent: Content = {
      contentId: 'single-001',
      content: 'This is a single paragraph without line breaks.',
      createdAt: '2024-01-01',
    };
    
    const { container } = render(<ArticleContent content={singleParagraphContent} onWordClick={mockOnWordClick} />);
    
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(1);
    expect(paragraphs[0]).toHaveTextContent('This is a single paragraph without line breaks.');
  });
});