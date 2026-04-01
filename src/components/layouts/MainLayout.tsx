import { Outlet } from 'react-router-dom';

import Header from '../common/Header/Header';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {/* <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2026 User Management App. Все права защищены.</p>
        </div>
      </footer> */}
    </div>
  );
};
