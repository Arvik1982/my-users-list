import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { IUserWithStatus } from '@/types/user.types';

interface UsersStore {
  usersWithStatus: IUserWithStatus[];
  hiddenUserIds: number[];
  setUsers: (users: IUserWithStatus[]) => void;
  archiveUser: (userId: number) => void;
  unarchiveUser: (userId: number) => void;
  hideUser: (userId: number) => void;
  updateUser: (userId: number, updatedData: Partial<IUserWithStatus>) => void;
  isUserHidden: (userId: number) => boolean;
  getActiveUsers: () => IUserWithStatus[];
  getArchivedUsers: () => IUserWithStatus[];
}

export const useUsersStore = create<UsersStore>()(
  persist(
    immer((set, get) => ({
      usersWithStatus: [],
      hiddenUserIds: [],

      setUsers: (users) => {
        set((state) => {
          state.usersWithStatus = users;
        });
      },

      archiveUser: (userId) => {
        set((state) => {
          const userIndex = state.usersWithStatus.findIndex(
            (u: IUserWithStatus) => u.id === userId
          );
          if (
            userIndex !== -1 &&
            state.usersWithStatus[userIndex].status === 'active'
          ) {
            state.usersWithStatus[userIndex].status = 'archived';
          }
        });
      },

      unarchiveUser: (userId) => {
        set((state) => {
          const userIndex = state.usersWithStatus.findIndex(
            (u: IUserWithStatus) => u.id === userId
          );
          if (
            userIndex !== -1 &&
            state.usersWithStatus[userIndex].status === 'archived'
          ) {
            state.usersWithStatus[userIndex].status = 'active';
          }
        });
      },

      hideUser: (userId) => {
        set((state) => {
          if (!state.hiddenUserIds.includes(userId)) {
            state.hiddenUserIds.push(userId);
          }
        });
      },

      updateUser: (userId, updatedData) => {
        set((state) => {
          const userIndex = state.usersWithStatus.findIndex(
            (u: IUserWithStatus) => u.id === userId
          );
          if (userIndex !== -1) {
            state.usersWithStatus[userIndex] = {
              ...state.usersWithStatus[userIndex],
              ...updatedData,
            };
          }
        });
      },

      isUserHidden: (userId) => {
        return get().hiddenUserIds.includes(userId);
      },

      getActiveUsers: () => {
        const state = get();
        return state.usersWithStatus.filter(
          (user) =>
            user.status === 'active' && !state.hiddenUserIds.includes(user.id)
        );
      },

      getArchivedUsers: () => {
        const state = get();
        return state.usersWithStatus.filter(
          (user) =>
            user.status === 'archived' && !state.hiddenUserIds.includes(user.id)
        );
      },
    })),
    {
      name: 'users-storage',
      partialize: (state) => ({
        usersWithStatus: state.usersWithStatus,
        hiddenUserIds: state.hiddenUserIds,
      }),
    }
  )
);
