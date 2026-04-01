import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchUserById, updateUser } from '@/api/endpoints/users';
import { queryKeys } from '@/api/queryKeys';
import { useUsersStore } from '@/store/usersStore';
import {
  userEditSchema,
  type UserEditFormData,
} from '@/utils/validators/user.schema';
import { Toast } from '@/components/ui/Toast/Toast';
import { Loader } from '@/components/ui/Loader/Loader';
import styles from './EditUser.module.scss';
import { IUser } from '@/types/user.types';

const getAvatarUrl = (userId: number) => {
  return `https://i.pravatar.cc/150?img=${userId % 70}`;
};

const mapUserToFormData = (user: IUser): UserEditFormData => ({
  name: user.name,
  username: user.username,
  email: user.email,
  city: user.address.city,
  phone: user.phone.replace(/\D/g, ''),
  companyName: user.company.name,
});

const mapFormDataToUser = (
  formData: UserEditFormData,
  originalUser: IUser
) => ({
  ...originalUser,
  name: formData.name,
  username: formData.username,
  email: formData.email,
  phone: formData.phone,
  address: {
    ...originalUser.address,
    city: formData.city,
  },
  company: {
    ...originalUser.company,
    name: formData.companyName,
  },
});

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateUser: updateUserInStore } = useUsersStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const userId = Number(id);

  // Загрузка данных пользователя
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => fetchUserById(userId),
    enabled: !isNaN(userId),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      city: '',
      phone: '',
      companyName: '',
    },
    mode: 'onChange',
  });

  // Заполнение формы при загрузке данных
  useEffect(() => {
    if (user) {
      reset(mapUserToFormData(user));
    }
  }, [user, reset]);

  // Мутация для сохранения
  const updateMutation = useMutation({
    mutationFn: (formData: UserEditFormData) => {
      if (!user) throw new Error('User not found');
      const updatedUser = mapFormDataToUser(formData, user);
      return updateUser(userId, updatedUser);
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.users.detail(userId), updatedUser);
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() });

      updateUserInStore(userId, {
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        company: updatedUser.company,
      });

      setToastMessage('Данные успешно сохранены!');
      setShowToast(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    },
    onError: () => {
      setToastMessage('Ошибка при сохранении данных');
      setShowToast(true);
    },
  });

  const onSubmit = (data: UserEditFormData) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error || !user) {
    return (
      <div className={styles.error}>
        <p>Пользователь не найден</p>
        <button onClick={() => navigate('/dashboard')}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.editUser}>
        <div className={styles.container}>
          <button
            onClick={() => navigate('/dashboard')}
            className={styles.backBtn}
          >
            ← Назад
          </button>

          <div className={styles.card}>
            <div className={styles.avatar}>
              <img src={getAvatarUrl(userId)} alt={user.name} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Имя *</label>
                  <input
                    type="text"
                    {...register('name')}
                    className={errors.name ? styles.error : ''}
                  />
                  {errors.name && (
                    <span className={styles.errorMessage}>
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Никнейм *</label>
                  <input
                    type="text"
                    {...register('username')}
                    className={errors.username ? styles.error : ''}
                  />
                  {errors.username && (
                    <span className={styles.errorMessage}>
                      {errors.username.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    {...register('email')}
                    className={errors.email ? styles.error : ''}
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Город *</label>
                  <input
                    type="text"
                    {...register('city')}
                    className={errors.city ? styles.error : ''}
                  />
                  {errors.city && (
                    <span className={styles.errorMessage}>
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Телефон *</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="Только цифры"
                    className={errors.phone ? styles.error : ''}
                  />
                  {errors.phone && (
                    <span className={styles.errorMessage}>
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Название компании *</label>
                  <input
                    type="text"
                    {...register('companyName')}
                    className={errors.companyName ? styles.error : ''}
                  />
                  {errors.companyName && (
                    <span className={styles.errorMessage}>
                      {errors.companyName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className={styles.cancelBtn}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className={styles.saveBtn}
                >
                  {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}
    </>
  );
};

export default EditUser;
