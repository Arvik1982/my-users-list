export const queryKeys = {
  users: {
    all: ['users'] as const,
    list: () => [...queryKeys.users.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.users.all, 'detail', id] as const,
  },
} as const;
