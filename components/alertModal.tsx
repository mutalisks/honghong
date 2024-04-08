import { useRouter } from 'next/router';
import { ReactNode } from 'react';


interface ModalProps {
  isOpen: boolean;
  message: ReactNode;
  onClose: () => void;
}

function AlertModal({ isOpen, message, onClose }: ModalProps) {
  const router = useRouter();
  
  if (!isOpen) return null;

  const handleGoHome = () => {
    router.push('/'); 
    onClose(); 
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <div className="button-container">
          <button onClick={handleGoHome}>ホームページに戻る</button>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 30%; 
          height: 30%; 
          position: relative; 
        }
        .button-container {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
      `}</style>
    </div>
  );
}

export default AlertModal;