import { fetchUsers } from '@/api/endpoints/users';
import { queryKeys } from '@/api/queryKeys';
import { UserCard } from '@/components/common/UserCard/UserCard';
import { Loader } from '@/components/ui/Loader/Loader';
import { useUsersStore } from '@/store/usersStore';
import type { IUserWithStatus } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const {
    setUsers,
    archiveUser,
    unarchiveUser,
    hideUser,
    getActiveUsers,
    getArchivedUsers,
    usersWithStatus,
  } = useUsersStore();

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
      {/* Активные пользователи */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Активные</h2>
          <div className={styles.line}></div>
        </div>

        <div className={styles.cardsGrid}>
          {activeUsers.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Нет активных пользователей</p>
            </div>
          ) : (
            activeUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onArchive={archiveUser}
                onUnarchive={unarchiveUser}
                onHide={hideUser}
                isArchived={false}
              />
            ))
          )}
        </div>
      </div>

      {/* Архив - показываем только если есть архивные пользователи */}
      {archivedUsers.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Архив</h2>
            <div className={styles.line}></div>
          </div>

          <div className={styles.cardsGrid}>
            {archivedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onArchive={archiveUser}
                onUnarchive={unarchiveUser}
                onHide={hideUser}
                isArchived={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
