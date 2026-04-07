import styles from './CloseIcon.module.scss';

interface CloseIconProps {
  onClose: () => void;
  className?: string;
}
//test

export default function CloseIcon({ onClose, className }: CloseIconProps) {
  return (
    <button
      className={`${styles.closeBtn} ${className || ''}`}
      onClick={onClose}
      type="button"
      aria-label="Очистить"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M12 4L4 12M4 4L12 12"
          stroke="#595959"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
