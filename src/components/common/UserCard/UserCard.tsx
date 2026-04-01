import { useNavigate } from 'react-router-dom';
import { getAvatarUrl } from '@/utils/formatters';
import type { IUserWithStatus } from '@/types/user.types';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: IUserWithStatus;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
  onHide: (id: number) => void;
  isArchived?: boolean;
}

export const UserCard = ({
  user,
  onArchive,
  onUnarchive,
  onHide,
  isArchived = false,
}: UserCardProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/users/${user.id}/edit`);
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.userCard__avatar}>
        <img src={getAvatarUrl(user.id)} alt={user.name} />
      </div>

      <div className={styles.userCard__content}>
        <h3 className={styles.userCard__username}>@{user.username}</h3>
        <div className={styles.userCard__info}>
          <p>
            <span className={styles.label}>Город:</span>
            {user.address.city}
          </p>
          <p>
            <span className={styles.label}>Компания:</span>
            {user.company.name}
          </p>
        </div>
      </div>

      <div className={styles.userCard__actions}>
        <button onClick={handleEdit} className={styles.editBtn}>
          ✏️ Редактировать
        </button>

        {!isArchived ? (
          <button
            onClick={() => onArchive(user.id)}
            className={styles.archiveBtn}
          >
            📦 Архивировать
          </button>
        ) : (
          <button
            onClick={() => onUnarchive(user.id)}
            className={styles.unarchiveBtn}
          >
            🔄 Активировать
          </button>
        )}

        <button onClick={() => onHide(user.id)} className={styles.hideBtn}>
          👁️ Скрыть
        </button>
      </div>
    </div>
  );
};
