import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsClient from '@/components/SettingClient';
import { Account } from '@/types/account';

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
  SignOutButton: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sign-out-button">{children}</div>
  )
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

jest.mock('@/components/Modal', () => {
  return function MockModal({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    type,
    onConfirm 
  }: { 
    isOpen: boolean; 
    onClose: () => void; 
    title: string; 
    children?: React.ReactNode;
    type?: string;
    onConfirm?: () => void;
  }) {
    if (!isOpen) return null;
    
    return (
      <div data-testid="modal" data-title={title} data-type={type}>
        <h3>{title}</h3>
        {children}
        <button onClick={onClose}>Close</button>
        {onConfirm && <button onClick={onConfirm}>Confirm</button>}
      </div>
    );
  };
});

jest.mock('react-icons/fa', () => ({
  FaPen: () => <div data-testid="pen-icon">Pen</div>
}));

jest.mock('react-icons/fa6', () => ({
  FaGoogle: () => <div data-testid="google-icon">Google</div>,
  FaFacebook: () => <div data-testid="facebook-icon">Facebook</div>
}));

describe('SettingsClient', () => {
  const mockUseUser = require('@clerk/nextjs').useUser;

  const mockUserData: Account = {
    id: 'user-123',
    fullName: 'John Doe',
    imageUrl: 'https://example.com/avatar.jpg',
    hasPassword: true,
    emailAddresses: [
      {
        id: 'email-1',
        emailAddress: 'john@example.com',
        verification: { status: 'verified' }
      },
      {
        id: 'email-2',
        emailAddress: 'john.backup@example.com',
        verification: { status: 'unverified' }
      }
    ],
    externalAccounts: [
      {
        id: 'ext-1',
        provider: 'oauth_google',
        emailAddress: 'john@gmail.com'
      },
      {
        id: 'ext-2',
        provider: 'oauth_facebook',
        username: 'johndoe'
      }
    ]
  };

  const mockUser = {
    setProfileImage: jest.fn(),
    reload: jest.fn(),
    createEmailAddress: jest.fn(),
    updatePassword: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseUser.mockReturnValue({
      user: mockUser
    });

    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Profile Section', () => {
    it('renders user profile information', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByAltText('Avatar')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('opens avatar update modal when avatar is clicked', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const avatar = screen.getByAltText('Avatar');
      fireEvent.click(avatar);
      
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', 'Update Profile Image');
    });

    it('applies correct CSS classes to avatar container', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const avatarContainer = screen.getByAltText('Avatar').closest('div');
      expect(avatarContainer).toHaveClass(
        'relative',
        'w-[100px]',
        'h-[100px]',
        'cursor-pointer',
        'group'
      );
    });
  });

  describe('Email Management', () => {
    it('displays all email addresses with verification status', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('john.backup@example.com')).toBeInTheDocument();
      expect(screen.getByText('verified')).toBeInTheDocument();
      expect(screen.getByText('unverified')).toBeInTheDocument();
    });

    it('applies correct styling to verified emails', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const verifiedStatus = screen.getByText('verified');
      expect(verifiedStatus).toHaveClass('text-green-500');
    });

    it('applies correct styling to unverified emails', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const unverifiedStatus = screen.getByText('unverified');
      expect(unverifiedStatus).toHaveClass('text-gray-600');
    });
  });

  describe('Connected Accounts', () => {
    it('displays connected external accounts', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      // Use getAllByText since there are multiple elements with 'Google' and 'Facebook'
      expect(screen.getAllByText('Google')).toHaveLength(2); // Icon and text
      expect(screen.getAllByText('Facebook')).toHaveLength(2); // Icon and text
      expect(screen.getByText('john@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('johndoe')).toBeInTheDocument();
    });

    it('shows disconnect buttons for each account', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const disconnectButtons = screen.getAllByText('Disconnect');
      expect(disconnectButtons).toHaveLength(2);
    });

    it('displays correct icons for providers', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      expect(screen.getByTestId('google-icon')).toBeInTheDocument();
      expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    });

    it('shows message when no connected accounts', () => {
      const userDataWithNoAccounts = {
        ...mockUserData,
        externalAccounts: []
      };

      render(<SettingsClient userData={userDataWithNoAccounts} />);
      
      expect(screen.getByText('No connected accounts')).toBeInTheDocument();
    });
  });

  describe('Password Management', () => {
    it('shows "Update Password" when user has password', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      expect(screen.getByText('Update Password')).toBeInTheDocument();
    });

    it('shows "Set Password" when user has no password', () => {
      const userDataWithoutPassword = {
        ...mockUserData,
        hasPassword: false
      };

      render(<SettingsClient userData={userDataWithoutPassword} />);
      
      expect(screen.getByText('Set Password')).toBeInTheDocument();
    });

    it('opens password modal when button is clicked', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const passwordButton = screen.getByText('Update Password');
      fireEvent.click(passwordButton);
      
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', 'Update Password');
    });
  });

  describe('Avatar Upload', () => {
    it('handles file upload correctly', async () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      render(<SettingsClient userData={mockUserData} />);
      
      // Open avatar modal
      fireEvent.click(screen.getByAltText('Avatar'));
      
      // Simulate file input
      const fileInput = screen.getByLabelText('Upload profile image');
      Object.defineProperty(fileInput, 'files', {
        value: [file]
      });
      
      fireEvent.change(fileInput);
      
      await waitFor(() => {
        expect(mockUser.setProfileImage).toHaveBeenCalledWith({ file });
      });
    });

    it('validates file type', async () => {
      const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      
      render(<SettingsClient userData={mockUserData} />);
      
      fireEvent.click(screen.getByAltText('Avatar'));
      
      const fileInput = screen.getByLabelText('Upload profile image');
      Object.defineProperty(fileInput, 'files', {
        value: [invalidFile]
      });
      
      fireEvent.change(fileInput);
      
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Only support JPEG, PNG, GIF formats');
      });
    });

    it('validates file size', async () => {
      // Create a file larger than 10MB
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
      
      render(<SettingsClient userData={mockUserData} />);
      
      fireEvent.click(screen.getByAltText('Avatar'));
      
      const fileInput = screen.getByLabelText('Upload profile image');
      Object.defineProperty(fileInput, 'files', {
        value: [largeFile]
      });
      
      fireEvent.change(fileInput);
      
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Image size must be less than 10MB');
      });
    });
  });

  describe('Danger Zone', () => {
    it('displays delete account button', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      expect(screen.getByText('Delete Account')).toBeInTheDocument();
    });

    it('applies danger styling to danger zone', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const dangerTitle = screen.getByText('Danger Zone');
      expect(dangerTitle).toHaveClass('text-red-600');
    });

    it('opens confirmation modal for account deletion', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const deleteButton = screen.getByText('Delete Account');
      fireEvent.click(deleteButton);
      
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal')).toHaveAttribute('data-type', 'confirm');
    });
  });

  describe('Sign Out', () => {
    it('renders sign out button', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
      expect(screen.getByText('Sign Out')).toBeInTheDocument();
    });

    it('applies correct styling to sign out section', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      const signOutSection = screen.getByTestId('sign-out-button').parentElement;
      expect(signOutSection).toHaveClass(
        'py-4',
        'w-full',
        'flex',
        'justify-center',
        'items-center'
      );
    });
  });

  describe('Modal Interactions', () => {
    it('closes modals when close button is clicked', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      // Open a modal
      fireEvent.click(screen.getByAltText('Avatar'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      
      // Close modal
      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('handles password update', async () => {
      render(<SettingsClient userData={mockUserData} />);
      
      fireEvent.click(screen.getByText('Update Password'));
      
      // Simulate form input and submission
      // Note: This would require more detailed form interaction testing
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles upload errors gracefully', async () => {
      mockUser.setProfileImage.mockRejectedValue(new Error('Upload failed'));
      
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      
      render(<SettingsClient userData={mockUserData} />);
      
      fireEvent.click(screen.getByAltText('Avatar'));
      
      const fileInput = screen.getByLabelText('Upload profile image');
      Object.defineProperty(fileInput, 'files', {
        value: [file]
      });
      
      fireEvent.change(fileInput);
      
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Upload failed: Upload failed');
      });
    });

    it('handles account deletion errors', async () => {
      mockUser.delete.mockRejectedValue(new Error('Delete failed'));
      
      render(<SettingsClient userData={mockUserData} />);
      
      fireEvent.click(screen.getByText('Delete Account'));
      
      // Confirm deletion
      fireEvent.click(screen.getByText('Confirm'));
      
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Delete account failed: Delete failed');
      });
    });
  });

  describe('Component Structure', () => {
    it('applies correct CSS classes to main container', () => {
      const { container } = render(<SettingsClient userData={mockUserData} />);
      
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveClass('w-full', 'pt-10', 'pb-32');
    });

    it('has proper section borders', () => {
      render(<SettingsClient userData={mockUserData} />);
      
      // Look for border classes in sections
      expect(screen.getByText('Connected Accounts').closest('div')).toHaveClass('border-t', 'border-primary-hover');
    });
  });
});