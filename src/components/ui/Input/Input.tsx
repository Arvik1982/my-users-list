import React, { useState } from 'react';
import styles from './Input.module.scss';

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  label?: string;
  error?: string;
  inputSize?: 'desktop' | 'mobile';
  fullWidth?: boolean;
  onClear?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  inputSize = 'desktop',
  fullWidth = false,
  onClear,
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== '' && value !== null;
  const showClear = hasValue && onClear && !props.disabled;

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const inputState = error
    ? 'error'
    : isFocused && hasValue
      ? 'active'
      : hasValue
        ? 'done'
        : 'default';

  return (
    <div
      className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''}`}
    >
      {label && (
        <div className={styles.inputTop}>
          <label className={styles.inputLabel}>{label}</label>
        </div>
      )}

      <div
        className={`${styles.inputField} ${styles[inputState]} ${styles[inputSize]}`}
      >
        <input
          className={styles.input}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Очистить"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#595959"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {error && <span className={styles.supportingText}>{error}</span>}
    </div>
  );
};
