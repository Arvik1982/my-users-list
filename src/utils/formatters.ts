export const formatPhoneForDisplay = (phone: string): string => {
  return phone;
};

export const cleanPhoneForForm = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const getAvatarUrl = (userId: number): string => {
  return `https://i.pravatar.cc/150?img=${userId % 70}`;
};
