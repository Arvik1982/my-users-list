import { colors } from '../../../../theme';
import styles from './NavIcon.module.scss';

interface NavIconProps {
  className?: string;
  size?: 'small' | 'medium';
}

export default function NavIcon({
  className = '',
  size = 'medium',
}: NavIconProps) {
  const width = size === 'small' ? 12 : 16;
  const height = width * 4;

  return (
    <span className={`${styles.navIcon} ${className}`}>
      <svg
        className={styles.navIcon__svg}
        width={width}
        height={height}
        viewBox="0 0 4 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12C0.9 12 0 12.9 0 14ZM0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2ZM0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6C0.9 6 0 6.9 0 8Z"
          fill={colors['01']}
        />
      </svg>
    </span>
  );
}
