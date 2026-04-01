import { apiClient } from '@/api/client';
import type { IUser, IUsersResponse } from '@/types/user.types';

export const fetchUsers = async (): Promise<IUsersResponse> => {
  const { data } = await apiClient.get<IUsersResponse>('/users');
  return data;
};

export const fetchUserById = async (id: number): Promise<IUser> => {
  const { data } = await apiClient.get<IUser>(`/users/${id}`);
  return data;
};

export const updateUser = async (
  id: number,
  userData: Partial<IUser>
): Promise<IUser> => {
  const { data } = await apiClient.put<IUser>(`/users/${id}`, userData);
  return data;
};
