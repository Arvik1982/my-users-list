import avatar from '@/assets/avatar.png';
import logo from '@/assets/logo.png';
import BellIcon from '@/components/ui/Icons/BellIcon/BellIcon';
import FavoriteIcon from '@/components/ui/Icons/FavoriteIcon/FavoriteIcon';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="at-work Logo" width={24} height={24} />
          <p className={styles.logoText}>
            at-
            <span className={styles.logoTextBold}>work</span>
          </p>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.iconsWrapper}>
            <FavoriteIcon />
            <BellIcon />
          </div>
          <div className={styles.userInfo}>
            <img src={avatar} alt="User avatar" width={20} height={20} />
            <p className={styles.userName}>Ivan 1234</p>
          </div>
        </div>
      </div>
    </header>
  );
}
