import { useEffect } from 'react';
import styles from './Toast.module.scss';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  type = 'success',
  onClose,
  duration = 4000,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
      <span className={styles.toast__message}>{message}</span>
      <button className={styles.toast__close} onClick={onClose}>
        ×
      </button>
    </div>
  );
};
