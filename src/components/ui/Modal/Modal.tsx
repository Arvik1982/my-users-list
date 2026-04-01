import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  duration?: number;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  duration = 4000,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M8.5 8.5L19.5 19.5M19.5 8.5L8.5 19.5"
              stroke="#595959"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.iconWrapper}>
          {icon || (
            <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
              <rect width="84" height="84" rx="42" fill="#C6F4C6" />
              <path
                d="M26 42L38 54L58 30"
                stroke="#22A0BC"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
};
