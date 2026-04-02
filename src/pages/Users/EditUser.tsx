import { fetchUserById, updateUser } from '@/api/endpoints/users';
import { queryKeys } from '@/api/queryKeys';
import BackIcon from '@/components/ui/BackButton/BackButton';
import { Button } from '@/components/ui/Button/Button';
import { ErrorIcon } from '@/components/ui/Icons/ErrorIcon/ErrorIcon';
import { Input } from '@/components/ui/Input/Input';
import { Loader } from '@/components/ui/Loader/Loader';
import { Modal } from '@/components/ui/Modal/Modal';
import Success from '@/components/ui/Success/Success';
import { useUsersStore } from '@/store/usersStore';
import {
  FORM_FIELDS,
  getAvatarUrl,
  mapFormDataToUser,
  mapUserToFormData,
} from '@/utils/constants';
import {
  userEditSchema,
  type UserEditFormData,
} from '@/utils/validators/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditUser.module.scss';

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { updateUser: updateUserInStore } = useUsersStore();
  const settingsArray = [
    'Настройки',
    'Безопасность',
    'Уведомления',
    'Приватность',
  ];

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    title: '',
    type: 'success',
  });

  const userId = useMemo(() => Number(id), [id]);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => fetchUserById(userId),
    enabled: !isNaN(userId),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,
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

  useEffect(() => {
    if (user) {
      reset(mapUserToFormData(user));
    }
  }, [user, reset]);

  const updateMutation = useMutation({
    mutationFn: (formData: UserEditFormData) => {
      if (!user) throw new Error('User not found');
      const updatedUser = mapFormDataToUser(formData, user);
      return updateUser(userId, updatedUser);
    },

    onMutate: async (formData) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.users.detail(userId),
      });

      const oldUser = queryClient.getQueryData(queryKeys.users.detail(userId));

      const updatedUser = mapFormDataToUser(formData, user!);

      // обновляем кэш
      queryClient.setQueryData(queryKeys.users.detail(userId), updatedUser);

      // обновляем стор
      updateUserInStore(userId, {
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        company: updatedUser.company,
      });

      return { oldUser };
    },

    // обновляем список
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.list(),
      });

      setModalState({
        isOpen: true,
        title: 'Изменения сохранены!',
        type: 'success',
      });
    },

    // откатываем изменения
    onError: (error, formData, context) => {
      if (context?.oldUser) {
        queryClient.setQueryData(
          queryKeys.users.detail(userId),
          context.oldUser
        );

        // Возвращаем старые данные в стор
        updateUserInStore(userId, context.oldUser);
      }

      setModalState({
        isOpen: true,
        title: 'Ошибка при сохранении',
        type: 'error',
      });
    },
  });

  const onSubmit = useCallback(
    (data: UserEditFormData) => {
      updateMutation.mutate(data);
    },
    [updateMutation]
  );

  const handleCloseModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.type === 'success') {
      navigate('/dashboard');
    }
  }, [modalState.type, navigate]);

  const handleNavigateBack = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const avatarUrl = useMemo(() => getAvatarUrl(userId), [userId]);
  const isButtonDisabled = useMemo(
    () => isSubmitting || !isDirty,
    [isSubmitting, isDirty]
  );

  const renderFormFields = useCallback(() => {
    return FORM_FIELDS.map((field) => (
      <Input
        key={field.name}
        label={field.label}
        type={field.type}
        {...register(field.name as keyof UserEditFormData)}
        error={errors[field.name as keyof UserEditFormData]?.message}
        placeholder={field.placeholder}
        inputSize="desktop"
        fullWidth
      />
    ));
  }, [register, errors]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !user) {
    return (
      <div className={styles.error}>
        <p>Пользователь не найден</p>
        <Button onClick={handleNavigateBack}>Вернуться на главную</Button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.editUser}>
        <div className={styles.container}>
          <button
            onClick={handleNavigateBack}
            className={styles.backBtn}
            aria-label="Вернуться назад"
          >
            <BackIcon />
            <span className={styles.backText}>Назад</span>
          </button>

          <div className={styles.layout}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                <div className={styles.avatarWrapper}>
                  <img
                    src={avatarUrl}
                    alt={user.name}
                    className={styles.avatarImage}
                    loading="lazy"
                  />
                </div>

                <div className={styles.categories}>
                  {settingsArray.map((category, index) => (
                    <div key={category} className={styles.category}>
                      <div
                        className={
                          index === 0
                            ? styles.categoryName
                            : styles.categoryNameMuted
                        }
                      >
                        {category}
                      </div>
                      <div className={styles.categoryLine}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.profileData}>
              <div className={styles.profileHeader}>
                <h2 className={styles.profileTitle}>Данные профиля</h2>
                <div className={styles.profileLine}></div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                noValidate
              >
                <div className={styles.formFields}>{renderFormFields()}</div>

                <div className={styles.buttons}>
                  <Button
                    type="submit"
                    disabled={isButtonDisabled}
                    size="desktop"
                  >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        title={modalState.title}
        icon={modalState.type === 'success' ? <Success /> : <ErrorIcon />}
        duration={4000}
      />
    </>
  );
};

export default memo(EditUser);
