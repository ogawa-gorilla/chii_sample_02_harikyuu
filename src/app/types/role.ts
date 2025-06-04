export const Role = {
  STAFF: 'staff',
  MANAGER: 'manager',
} as const;

export type Role = typeof Role[keyof typeof Role];
