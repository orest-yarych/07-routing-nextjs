'use client';

import { useEffect, type ReactNode } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const onClose = () => router.back();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  });

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.body
  );
}
