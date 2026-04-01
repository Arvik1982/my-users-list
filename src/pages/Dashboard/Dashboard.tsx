import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/api/endpoints/users';
import { queryKeys } from '@/api/queryKeys';
import { useUsersStore } from '@/store/usersStore';
import { UserCard } from '@/components/common/UserCard/UserCard';
import { Loader } from '@/components/ui/Loader/Loader';
import type { IUserWithStatus } from '@/types/user.types';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

  const {
    setUsers,
    archiveUser,
    unarchiveUser,
    hideUser,
    getActiveUsers,
    getArchivedUsers,
    usersWithStatus,
  } = useUsersStore();

  // Загрузка пользователей с API
  const {
    data: usersFromApi,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (usersFromApi && usersWithStatus.length === 0) {
      const usersWithStatusData: IUserWithStatus[] = usersFromApi
        .slice(0, 6)
        .map((user) => ({
          ...user,
          status: 'active' as const,
        }));
      setUsers(usersWithStatusData);
    }
  }, [usersFromApi, usersWithStatus.length, setUsers]);

  const activeUsers = getActiveUsers();
  const archivedUsers = getArchivedUsers();

  const displayedUsers = activeTab === 'active' ? activeUsers : archivedUsers;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Ошибка загрузки пользователей</p>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Пользователи</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'active' ? styles['tab--active'] : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Активные ({activeUsers.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'archived' ? styles['tab--active'] : ''}`}
            onClick={() => setActiveTab('archived')}
          >
            Архив ({archivedUsers.length})
          </button>
        </div>
      </header>

      <div className={styles.usersGrid}>
        {displayedUsers.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Нет пользователей в этом разделе</p>
          </div>
        ) : (
          displayedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onArchive={archiveUser}
              onUnarchive={unarchiveUser}
              onHide={hideUser}
              isArchived={activeTab === 'archived'}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
