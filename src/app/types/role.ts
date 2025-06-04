export const Role = {
  STAFF: '施術スタッフ',
  MANAGER: '店長',
  OFFICE: '事務',
} as const;

export type Role = typeof Role[keyof typeof Role];
