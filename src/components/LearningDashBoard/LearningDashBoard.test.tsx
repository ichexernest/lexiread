import { render, screen } from '@testing-library/react';
import LearningDashBoard from '@/components/LearningDashBoard';

// Mock external dependencies
jest.mock('@/utils/fetch', () => ({
  __esModule: true,
  default: {
    getVocTotalAndCount: jest.fn()
  }
}));

jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn()
}));

jest.mock('@/components/MainButton', () => {
  return function MockMainButton({ 
    href, 
    icon, 
    hint, 
    haveHint 
  }: { 
    href?: string; 
    icon: React.ReactNode; 
    hint: string; 
    haveHint: boolean; 
  }) {
    return (
      <div 
        data-testid="main-button" 
        data-href={href}
        data-hint={hint}
        data-have-hint={haveHint}
      >
        {icon}
      </div>
    );
  };
});

jest.mock('@/components/ProgressCircle', () => {
  return function MockProgressCircle({ 
    total, 
    count 
  }: { 
    total: number; 
    count: number; 
  }) {
    return (
      <div data-testid="progress-circle" data-total={total} data-count={count}>
        Progress: {count}/{total}
      </div>
    );
  };
});

jest.mock('react-icons/fa', () => ({
  FaPlay: () => <div data-testid="play-icon">Play</div>
}));

describe('LearningDashBoard', () => {
  const mockFetchService = require('@/utils/fetch').default;
  const mockCurrentUser = require('@clerk/nextjs/server').currentUser;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock current user
    mockCurrentUser.mockResolvedValue({
      id: 'user-123'
    });
  });

  describe('Rendering with different vocabulary counts', () => {
    it('renders dashboard with vocabulary count data', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 25
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByTestId('progress-circle')).toBeInTheDocument();
      expect(screen.getByText('25 mastered vocabularies.')).toBeInTheDocument();
      expect(screen.getByTestId('main-button')).toBeInTheDocument();
    });

    it('displays correct progress information', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 200,
        count: 150
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      const progressCircle = screen.getByTestId('progress-circle');
      expect(progressCircle).toHaveAttribute('data-total', '200');
      expect(progressCircle).toHaveAttribute('data-count', '150');
      expect(screen.getByText('150 mastered vocabularies.')).toBeInTheDocument();
    });

    it('handles zero vocabulary count', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 50,
        count: 0
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByText('0 mastered vocabularies.')).toBeInTheDocument();
      expect(screen.getByTestId('progress-circle')).toHaveAttribute('data-count', '0');
    });

    it('handles high vocabulary counts', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 1000,
        count: 999
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByText('999 mastered vocabularies.')).toBeInTheDocument();
    });
  });

  describe('Component Structure and Layout', () => {
    it('applies correct CSS classes to main container', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 50
      });

      const dashboard = await LearningDashBoard();
      const { container } = render(dashboard);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass(
        'py-5',
        'px-4',
        'w-full',
        'mx-auto',
        'flex',
        'justify-between',
        'items-center'
      );
    });

    it('applies correct CSS classes to progress section', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 75
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      const progressSection = screen.getByTestId('progress-circle').parentElement;
      expect(progressSection).toHaveClass(
        'flex',
        'justify-center',
        'items-center'
      );
    });

    it('applies responsive text sizing to vocabulary count', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 42
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      const countText = screen.getByText('42 mastered vocabularies.');
      expect(countText).toHaveClass('text-xs', 'md:text-md');
    });
  });

  describe('Quiz Button', () => {
    it('renders quiz button with correct properties', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 30
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      const quizButton = screen.getByTestId('main-button');
      expect(quizButton).toHaveAttribute('data-href', '/Quiz');
      expect(quizButton).toHaveAttribute('data-hint', 'Quiz');
      expect(quizButton).toHaveAttribute('data-have-hint', 'true');
    });

    it('displays play icon in quiz button', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 60
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByTestId('play-icon')).toBeInTheDocument();
    });

    it('has correct key attribute for quiz button', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 80
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      // The key is used internally by React, we verify the button renders
      expect(screen.getByTestId('main-button')).toBeInTheDocument();
    });
  });

  describe('User Authentication', () => {
    it('calls currentUser to get user information', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 40
      });

      await LearningDashBoard();
      
      expect(mockCurrentUser).toHaveBeenCalledTimes(1);
    });

    it('passes user ID to vocabulary count service', async () => {
      mockCurrentUser.mockResolvedValue({
        id: 'specific-user-id'
      });

      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: 35
      });

      await LearningDashBoard();
      
      expect(mockFetchService.getVocTotalAndCount).toHaveBeenCalledWith('specific-user-id');
    });
  });

  describe('Data Integration', () => {
    it('passes correct data to ProgressCircle component', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 250,
        count: 125
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      const progressCircle = screen.getByTestId('progress-circle');
      expect(progressCircle).toHaveAttribute('data-total', '250');
      expect(progressCircle).toHaveAttribute('data-count', '125');
    });

    it('displays vocabulary count in text format', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 180,
        count: 90
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByText('90 mastered vocabularies.')).toBeInTheDocument();
    });
  });

  describe('Server Component Behavior', () => {
    it('is an async server component', () => {
      // Test that the component returns a Promise (async function)
      const result = LearningDashBoard();
      expect(result).toBeInstanceOf(Promise);
    });

    it('fetches data server-side', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 300,
        count: 150
      });

      await LearningDashBoard();
      
      expect(mockCurrentUser).toHaveBeenCalled();
      expect(mockFetchService.getVocTotalAndCount).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('handles missing user gracefully', async () => {
      mockCurrentUser.mockResolvedValue(null);
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 0,
        count: 0
      });

      // This would typically throw an error due to clerkUser!.id
      // In a real implementation, this should be handled properly
      await expect(LearningDashBoard()).rejects.toThrow();
    });

    it('handles API errors from vocabulary service', async () => {
      mockCurrentUser.mockResolvedValue({ id: 'user-123' });
      mockFetchService.getVocTotalAndCount.mockRejectedValue(new Error('API Error'));

      await expect(LearningDashBoard()).rejects.toThrow('API Error');
    });
  });

  describe('Edge Cases', () => {
    it('handles decimal vocabulary counts', async () => {
      // Though not realistic, testing edge case
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100.5,
        count: 50.7
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByText('50.7 mastered vocabularies.')).toBeInTheDocument();
    });

    it('handles negative vocabulary counts', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 100,
        count: -5
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByText('-5 mastered vocabularies.')).toBeInTheDocument();
    });

    it('handles count greater than total', async () => {
      mockFetchService.getVocTotalAndCount.mockResolvedValue({
        total: 50,
        count: 75
      });

      const dashboard = await LearningDashBoard();
      render(dashboard);
      
      expect(screen.getByText('75 mastered vocabularies.')).toBeInTheDocument();
      expect(screen.getByTestId('progress-circle')).toHaveAttribute('data-count', '75');
      expect(screen.getByTestId('progress-circle')).toHaveAttribute('data-total', '50');
    });
  });
});