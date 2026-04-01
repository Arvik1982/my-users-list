import { memo } from 'react';

export const ErrorIcon = memo(() => (
  <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
    <rect width="84" height="84" rx="42" fill="#FEE2E2" />
    <path
      d="M30 30L54 54M54 30L30 54"
      stroke="#EF4444"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ErrorIcon.displayName = 'ErrorIcon';
