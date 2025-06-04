export const Role = {
  STAFF: 'staff',
  MANAGER: 'manager',
  OFFICE: 'office',
} as const;

export type Role = typeof Role[keyof typeof Role];
