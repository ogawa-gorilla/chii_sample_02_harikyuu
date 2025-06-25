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

    TREATMENT_RECORD_LIST: 'treatment-record-list',
    TREATMENT_RECORD_DETAIL: 'treatment-record-detail',
    TREATMENT_RECORD_CREATE: 'treatment-record-create',
    TREATMENT_RECORD_EDIT: 'treatment-record-edit',

    DASHBOARD: 'dashboard',
} as const

export type Page = (typeof Page)[keyof typeof Page]
