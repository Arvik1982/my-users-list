import { IUser } from '@/types/user.types';
import { UserEditFormData } from './validators/user.schema';

export const FORM_FIELDS = [
  { name: 'name', label: 'Имя', type: 'text', placeholder: 'Имя' },
  { name: 'username', label: 'Никнейм', type: 'text', placeholder: 'Никнейм' },
  { name: 'email', label: 'Почта', type: 'email', placeholder: 'Почта' },
  { name: 'city', label: 'Город', type: 'text', placeholder: 'Город' },
  { name: 'phone', label: 'Телефон', type: 'tel', placeholder: 'Только цифры' },
  {
    name: 'companyName',
    label: 'Название компании',
    type: 'text',
    placeholder: 'Название компании',
  },
] as const;
export const mapUserToFormData = (user: IUser): UserEditFormData => ({
  name: user.name,
  username: user.username,
  email: user.email,
  city: user.address.city,
  phone: user.phone.replace(/\D/g, ''),
  companyName: user.company.name,
});

export const mapFormDataToUser = (
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
export const AVATAR_URL = 'https://i.pravatar.cc/150?img=';

export const getAvatarUrl = (userId: number) => `${AVATAR_URL}${userId % 70}`;
