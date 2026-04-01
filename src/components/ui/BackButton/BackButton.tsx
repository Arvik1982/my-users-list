import { memo } from 'react';
import ChevronIcon from '../Icons/ChevronIcon/ChevronIcon';
import styles from './BackButton.module.scss';
const BackIcon = memo(() => {
  return (
    <>
      <svg
        className={styles.backIconDesktop}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.125 14H0.875"
          stroke="#595959"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 20.125L0.875 14L7 7.875"
          stroke="#595959"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <ChevronIcon className={styles.backIconMobile} />
    </>
  );
});
BackIcon.displayName = 'BackIcon';

export default BackIcon;
