export const formatPhoneForDisplay = (phone: string): string => {
  return phone;
};

export const cleanPhoneForForm = (phone: string): string => {
  return phone.replace(/\D/g, '');
};
