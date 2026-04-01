import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '@/store/authStore';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  const navigate = useNavigate();
  //   const { user, logout } = useAuthStore();

  const handleLogout = () => {
    // logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <h1>User Management</h1>
          </div>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              end
            >
              Главная
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Дашборд
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Пользователи
            </NavLink>
          </nav>

          <div className={styles.userMenu}>
            <>
              <span className={styles.userName}>{'user.name'}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Выйти
              </button>
            </>
          </div>
        </div>
      </header>

      {/* Основной контент - здесь будет рендериться дочерний маршрут */}
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />{' '}
          {/* Ключевой момент! Здесь рендерятся дочерние компоненты */}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2024 User Management App. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};
