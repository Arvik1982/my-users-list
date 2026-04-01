import DotsButton from '@/components/ui/DotsButton/DotsButton';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown/Dropdown';
import type { IUserWithStatus } from '@/types/user.types';
import { getAvatarUrl } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
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

  const dropdownItems: DropdownItem[] = isArchived
    ? [
        {
          label: 'Активировать',
          onClick: () => onUnarchive(user.id),
        },
      ]
    : [
        {
          label: 'Редактировать',
          onClick: handleEdit,
        },
        {
          label: 'Архивировать',
          onClick: () => onArchive(user.id),
        },
        {
          label: 'Скрыть',
          onClick: () => onHide(user.id),
          danger: true,
        },
      ];

  return (
    <div
      className={`${styles.userCard} ${isArchived ? styles.archivedCard : ''}`}
    >
      <div className={styles.avatar}>
        <img src={getAvatarUrl(user.id)} alt={user.username} />
      </div>

      <div className={styles.info}>
        <div className={styles.usernameCompany}>
          <div className={styles.usernameWrapper}>
            <span
              className={`${styles.username} ${isArchived ? styles.archivedUsername : ''}`}
            >
              {user.username}
            </span>

            <Dropdown items={dropdownItems}>
              <DotsButton isArchived={isArchived} />
            </Dropdown>
          </div>
          <div
            className={`${styles.companyName} ${isArchived ? styles.archivedCompanyName : ''}`}
          >
            {user.company.name}
          </div>
        </div>

        <div
          className={`${styles.city} ${isArchived ? styles.archivedCity : ''}`}
        >
          {user.address.city}
        </div>
      </div>
    </div>
  );
};
