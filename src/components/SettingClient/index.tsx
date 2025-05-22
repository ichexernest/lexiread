'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import PrimaryButton from '@/components/PrimaryButton';
import { SignOutButton } from '@clerk/nextjs';
import { Account } from '@/types/account';
import Modal from '@/components/Modal';
import { FaPen } from 'react-icons/fa';
import { FaGoogle, FaFacebook } from 'react-icons/fa6';

export default function SettingsClient({ userData }: { userData: Account }) {
    const { user } = useUser();
    const [modals, setModals] = useState({
        updateAvatar: false,
        addEmail: false,
        setPassword: false,
        disconnectAccount: false,
        deleteAccount: false
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        selectedAccountId: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    // 獲取提供商的顯示名稱
    const getProviderDisplayName = (provider: string) => {
        const providerNames: { [key: string]: string } = {
            oauth_google: 'Google',
            oauth_facebook: 'Facebook',
        };
        return providerNames[provider] || provider;
    };

    // 開啟 Modal
    const openModal = (modalName: keyof typeof modals, accountId?: string) => {
        setModals({ ...modals, [modalName]: true });
        if (accountId) {
            setFormData({ ...formData, selectedAccountId: accountId });
        }
    };

    // 關閉 Modal
    const closeModal = (modalName: keyof typeof modals) => {
        setModals({ ...modals, [modalName]: false });
        if (modalName === 'disconnectAccount') {
            setFormData({ ...formData, selectedAccountId: '' });
        }
    };

    // 處理大頭貼上傳
    const handleUpload = async (file: File) => {
        if (!user) return;

        try {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('only support jpeg, png, gif');
                return;
            }

            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('image size must be less than 10MB');
                return;
            }

            setIsLoading(true);
            await user.setProfileImage({ file });
            await user.reload();
            alert('profile image updated');
            closeModal('updateAvatar');
        } catch (err) {
            console.error('upload image failed:', err);
            alert('upload image failed, please try again later');
        } finally {
            setIsLoading(false);
        }
    };

    // 處理新增 Email
    const handleAddEmail = async () => {
        if (!user || !formData.email) return;

        try {
            setIsLoading(true);
            await user.createEmailAddress({ email: formData.email });
            alert('Email added successfully');
            setFormData({ ...formData, email: '' });
            closeModal('addEmail');
        } catch (err) {
            console.error(err);
            alert('add email failed');
        } finally {
            setIsLoading(false);
        }
    };

    // 處理設定密碼
    const handleSetPassword = async () => {
        if (!user || !formData.password) return;

        try {
            setIsLoading(true);
            await user.updatePassword({ newPassword: formData.password });
            alert('password set success');
            setFormData({ ...formData, password: '' });
            closeModal('setPassword');
        } catch (err) {
            console.error(err);
            alert('password set failed');
        } finally {
            setIsLoading(false);
        }
    };

    // 處理斷開第三方帳號
    const handleDisconnectAccount = async () => {
        if (!user || !formData.selectedAccountId) return;

        try {
            setIsLoading(true);
            //   await user.removeExternalAccount({ externalAccountId: formData.selectedAccountId });
            await user.reload();
            alert('disconnect success');
            closeModal('disconnectAccount');
        } catch (err) {
            console.error('disconnect failed:', err);
            alert('disconnect failed, please try again later');
        } finally {
            setIsLoading(false);
        }
    };

    // 處理刪除帳號
    const handleDeleteAccount = async () => {
        if (!user) return;

        try {
            setIsLoading(true);
            await user.delete();
            alert('account deleted successfully');
        } catch (err) {
            console.error(err);
            alert('delete account failed, please try again later');
        } finally {
            setIsLoading(false);
        }
    };

    const selectedAccount = userData.externalAccounts.find(acc => acc.id === formData.selectedAccountId);

    return (
        <div className="w-full pt-10 pb-32">

            {/* 大頭貼與名字 */}
            <div className="flex flex-col items-center space-y-3">
                <div
                    onClick={() => openModal('updateAvatar')}
                    className="relative w-[100px] h-[100px] cursor-pointer group"
                >
                    <img
                        src={userData.imageUrl}
                        alt="Avatar"
                        width={100}
                        height={100}
                        className="rounded-full w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <FaPen className="text-white" />
                    </div>
                </div>
                <p className="text-lg font-semibold">{userData.fullName}</p>
            </div>

            {/* Email 資訊 */}
            <div className="py-4">
                <h2 className="text-xl font-semibold mb-3">Email</h2>
                <div className="space-y-2 mb-3">
                    {userData.emailAddresses.map((email) => (

                        <div key={email.id} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="font-medium">{email.emailAddress}</p>
                                    <p className={`text-sm ${email.verification?.status === 'verified' ? 'text-green-500' : 'text-gray-600'}`}>
                                        {email.verification?.status === 'verified' ? 'verified' : 'unverified'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <PrimaryButton onClick={() => openModal('addEmail')}>
                    Add Email
                </PrimaryButton>
            </div>

            {/* 已連結的帳號 */}
            <div className="py-4 border-t border-primary-hover">
                <h2 className="text-xl font-semibold mb-3">Connected Accounts</h2>
                {userData.externalAccounts.length > 0 ? (
                    <div className="space-y-3">
                        {userData.externalAccounts.map((account) => (
                            <div key={account.id} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                        {getProviderDisplayName(account.provider) === 'Facebook' ? <FaFacebook className="text-black" /> : <FaGoogle className="text-black" />}
                                    </div>
                                    <div>
                                        <p className="font-medium">{getProviderDisplayName(account.provider)}</p>
                                        <p className="text-sm text-gray-600">{account.emailAddress || account.username || '已連結'}</p>
                                    </div>
                                </div>
                                <PrimaryButton
                                    onClick={() => openModal('disconnectAccount', account.id)} >
                                    Disconnect
                                </PrimaryButton>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No connected accounts</p>
                )}
            </div>

            {/* 密碼設定 */}
            <div className="py-4 border-t border-primary-hover">
                <h2 className="text-xl font-semibold mb-3">Password</h2>
                <PrimaryButton onClick={() => openModal('setPassword')}>
                    {userData.hasPassword ? 'Update Password' : 'Set Password'}
                </PrimaryButton>
            </div>

            {/* 危險操作 */}
            <div className="py-4 border-t border-primary-hover">
                <h2 className="text-xl font-semibold text-red-600 mb-3">Danger Zone</h2>
                <div className="space-y-3">
                    <PrimaryButton
                        onClick={() => openModal('deleteAccount')}
                       
                    >
                        Delete Account
                    </PrimaryButton>
                </div>
            </div>

            <div className="py-4 w-full flex justify-center items-center">
                <SignOutButton>
                    <PrimaryButton >Sign Out</PrimaryButton>
                </SignOutButton>
            </div>


            {/* 更新大頭貼 Modal */}
            <Modal isOpen={modals.updateAvatar} onClose={() => closeModal('updateAvatar')} title="Update Profile Image">
                <div className="space-y-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file);
                        }}
                        className="w-full"
                    />
                    <p className="text-sm text-gray-600">Supports JPG, PNG, or GIF formats, up to 10MB</p>
                </div>
            </Modal>

            {/* 新增 Email Modal */}
            <Modal isOpen={modals.addEmail} onClose={() => closeModal('addEmail')} title="Add Email">
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter new email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/70 px-3 py-2 rounded"
                    />
                    <div className="flex space-x-3 justify-end">
                        <button onClick={() => closeModal('addEmail')} className="px-4 py-2 text-gray-600">
                            Cancel
                        </button>
                        <PrimaryButton onClick={handleAddEmail} >
                            {isLoading ? 'Processing...' : 'Add'}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

            {/* 設定密碼 Modal */}
            <Modal isOpen={modals.setPassword} onClose={() => closeModal('setPassword')} title={userData.hasPassword ? 'Update Password' : 'Set Password'}>
                <div className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-white/70"
                    />
                    <div className="flex space-x-3 justify-end">
                        <button onClick={() => closeModal('setPassword')} className="px-4 py-2 text-gray-600">
                            Cancel
                        </button>
                        <PrimaryButton onClick={handleSetPassword} >
                            {isLoading ? 'Processing...' : 'Set Password'}
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

            {/* 斷開連結確認 Modal */}
            <Modal
                isOpen={modals.disconnectAccount}
                onClose={() => closeModal('disconnectAccount')}
                onConfirm={handleDisconnectAccount}
                type="confirm"
                title="Disconnect"
                message={`Are you sure you want to disconnect from ${selectedAccount ? getProviderDisplayName(selectedAccount.provider) : ''}?`}
                confirmText="Disconnect"
            />
            <Modal
                isOpen={modals.deleteAccount}
                onClose={() => closeModal('deleteAccount')}
                onConfirm={handleDeleteAccount}
                type="confirm"
                title="Delete Account"
                message="Are you sure you want to delete your account? This action cannot be undone, and all data will be permanently lost."
                confirmText="Delete Account"
            />
        </div>
    );
}