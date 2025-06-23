import { render, screen } from '@testing-library/react';
import Title from '@/components/Title';

describe('Title', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Title>Test Title</Title>);
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders as paragraph element', () => {
      render(<Title>Paragraph Title</Title>);
      
      const titleElement = screen.getByText('Paragraph Title');
      expect(titleElement.tagName).toBe('P');
    });

    it('applies default CSS classes', () => {
      render(<Title>Styled Title</Title>);
      
      const titleElement = screen.getByText('Styled Title');
      expect(titleElement).toHaveClass(
        'text-3xl',
        'text-black',
        'font-bold'
      );
    });
  });

  describe('Custom className', () => {
    it('applies custom className when provided', () => {
      render(<Title className="custom-class">Custom Title</Title>);
      
      const titleElement = screen.getByText('Custom Title');
      expect(titleElement).toHaveClass('custom-class');
    });

    it('combines default and custom classes', () => {
      render(<Title className="text-red-500 underline">Combined Classes</Title>);
      
      const titleElement = screen.getByText('Combined Classes');
      expect(titleElement).toHaveClass(
        'text-3xl',
        'text-black',
        'font-bold',
        'text-red-500',
        'underline'
      );
    });

    it('handles empty string className', () => {
      render(<Title className="">Empty Class</Title>);
      
      const titleElement = screen.getByText('Empty Class');
      expect(titleElement).toHaveClass(
        'text-3xl',
        'text-black',
        'font-bold'
      );
    });

    it('handles multiple custom classes', () => {
      render(<Title className="mb-4 text-center uppercase tracking-wide">Multiple Classes</Title>);
      
      const titleElement = screen.getByText('Multiple Classes');
      expect(titleElement).toHaveClass(
        'text-3xl',
        'text-black',
        'font-bold',
        'mb-4',
        'text-center',
        'uppercase',
        'tracking-wide'
      );
    });

    it('works without className prop', () => {
      render(<Title>No Custom Class</Title>);
      
      const titleElement = screen.getByText('No Custom Class');
      expect(titleElement).toHaveClass(
        'text-3xl',
        'text-black',
        'font-bold'
      );
    });
  });

  describe('Children Content', () => {
    it('renders text content', () => {
      render(<Title>Simple Text</Title>);
      
      expect(screen.getByText('Simple Text')).toBeInTheDocument();
    });

    it('renders React element children', () => {
      render(
        <Title>
          <span>React Element</span>
        </Title>
      );
      
      expect(screen.getByText('React Element')).toBeInTheDocument();
    });

    it('renders mixed content', () => {
      render(
        <Title>
          Text and <strong>Bold</strong>
        </Title>
      );
      
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText(/Text and/)).toBeInTheDocument();
    });

    it('renders multiple child elements', () => {
      render(
        <Title>
          <span>First</span>
          <span>Second</span>
        </Title>
      );
      
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('handles empty children', () => {
      render(<Title></Title>);
      
      const titleElement = document.querySelector('p');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement?.textContent).toBe('');
    });
  });

  describe('Component Structure', () => {
    it('has correct HTML structure', () => {
      const { container } = render(<Title>Structure Test</Title>);
      
      expect(container.firstChild?.nodeName).toBe('P');
    });

    it('contains only the title element', () => {
      const { container } = render(<Title>Single Element</Title>);
      
      expect(container.children).toHaveLength(1);
    });
  });

  describe('Typography Styling', () => {
    it('uses large text size (text-3xl)', () => {
      render(<Title>Large Text</Title>);
      
      const titleElement = screen.getByText('Large Text');
      expect(titleElement).toHaveClass('text-3xl');
    });

    it('uses black text color', () => {
      render(<Title>Black Text</Title>);
      
      const titleElement = screen.getByText('Black Text');
      expect(titleElement).toHaveClass('text-black');
    });

    it('uses bold font weight', () => {
      render(<Title>Bold Text</Title>);
      
      const titleElement = screen.getByText('Bold Text');
      expect(titleElement).toHaveClass('font-bold');
    });
  });

  describe('Edge Cases', () => {
    it('handles special characters', () => {
      const specialText = 'Title with & symbols < > " \'';
      render(<Title>{specialText}</Title>);
      
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('handles numbers as children', () => {
      render(<Title>{12345}</Title>);
      
      expect(screen.getByText('12345')).toBeInTheDocument();
    });

    it('handles very long text', () => {
      const longText = 'This is a very long title that might wrap to multiple lines depending on the container width and screen size';
      render(<Title>{longText}</Title>);
      
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('handles undefined className gracefully', () => {
      render(<Title className={undefined}>Undefined Class</Title>);
      
      const titleElement = screen.getByText('Undefined Class');
      expect(titleElement).toHaveClass(
        'text-3xl',
        'text-black',
        'font-bold'
      );
    });
  });

  describe('Accessibility', () => {
    it('uses semantic paragraph element', () => {
      render(<Title>Semantic Title</Title>);
      
      const titleElement = screen.getByText('Semantic Title');
      expect(titleElement.tagName).toBe('P');
    });

    it('text is readable with good contrast', () => {
      render(<Title>Readable Title</Title>);
      
      const titleElement = screen.getByText('Readable Title');
      expect(titleElement).toHaveClass('text-black');
    });

    it('could benefit from semantic heading element for better structure', () => {
      render(<Title>Heading-like Title</Title>);
      
      const titleElement = screen.getByText('Heading-like Title');
      // This test documents that the component uses p tag instead of h1-h6
      expect(titleElement.tagName).toBe('P');
      expect(titleElement.tagName).not.toBe('H1');
      expect(titleElement.tagName).not.toBe('H2');
    });
  });
});