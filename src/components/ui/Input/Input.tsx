import React, { useState } from 'react';
import CloseIcon from '../CloseIcon/CloseIcon';
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

        <CloseIcon onClose={handleClear} className={styles.clearIcon} />
      </div>

      {error && <span className={styles.supportingText}>{error}</span>}
    </div>
  );
};
