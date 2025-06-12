export const Page = {
    NOT_IMPLEMENTED: 'not-implemented',
    HOME: 'home',

    ACCOUNT_LIST: 'account-list',
    ACCOUNT_DETAIL: 'account-detail',
    ACCOUNT_CREATE: 'account-create',
    ACCOUNT_EDIT: 'account-edit',

    RESERVE_LIST: 'reserve-list',
    RESERVE_DETAIL: 'reserve-detail',
    RESERVE_CREATE: 'reserve-create',
    RESERVE_EDIT: 'reserve-edit',
    RESERVE_STATUS_EDIT: 'reserve-status-edit',

    RESERVATION_CALENDAR: 'reservation-calendar',
    RESERVES_ON_DATE: 'reserves-on-date',

    RESERVATION_CREATE_CALENDAR: 'reservation-create-calendar',

    SHIFT: 'shift',
    SHIFT_EDIT: 'shift-edit',

    SESSION_LIST: 'session-list',
    SESSION_DETAIL: 'session-detail',

    DASHBOARD: 'dashboard',
} as const

export type Page = (typeof Page)[keyof typeof Page]
