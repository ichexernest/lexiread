import PrimaryButton from '@/components/PrimaryButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  
  // 確認對話框相關屬性
  type?: 'default' | 'confirm';
  message?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  type = 'default',
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel"
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white/70 backdrop-blur-lg rounded-xl p-6 w-full max-w-md mx-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        
        {type === 'confirm' ? (
          <div className="space-y-4">
            <p className="text-gray-700">{message}</p>
            <div className="flex space-x-3 justify-end">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {cancelText}
              </button>
              <PrimaryButton onClick={onConfirm}>
                {confirmText}
              </PrimaryButton>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}