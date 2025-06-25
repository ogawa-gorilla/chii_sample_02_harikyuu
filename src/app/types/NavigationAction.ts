export const NavigationAction = {
    PUSH: 'push',
    POP: 'pop',
    MOVE_TO: 'move-to',
} as const

export type NavigationAction =
    (typeof NavigationAction)[keyof typeof NavigationAction]
