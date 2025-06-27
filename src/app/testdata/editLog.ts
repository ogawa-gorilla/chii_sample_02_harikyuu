import { EditLogTarget } from '../types/EditLog'
import { Role } from '../types/role'
import { USER_TESTDATA } from './userTestData'

export const EDIT_LOG_TESTDATA = [
    {
        editTarget: EditLogTarget.RESERVATION,
        user: {
            id: '1',
            name: '鈴木',
            email: 'manager@example.com',
            role: Role.MANAGER,
            password: 'suzuki',
            themeColor: '#0A192F',
        },
        editedAt: '2024-01-15T10:30:00Z',
        edits: [
            '予約時間を14:00から15:00に変更',
            'クライアント名を「田中」から「佐藤」に変更',
        ],
    },
    {
        editTarget: EditLogTarget.SHIFT,
        user: {
            id: '2',
            name: '佐藤',
            email: 'sato@example.com',
            role: Role.STAFF,
            password: 'sato',
            themeColor: '#2D0B5A',
        },
        editedAt: '2024-01-14T16:45:00Z',
        edits: ['勤務時間を9:00-18:00から10:00-19:00に変更'],
    },
    {
        editTarget: EditLogTarget.TREATMENT_RECORD,
        user: {
            id: '3',
            name: '山田',
            email: 'yamada@example.com',
            role: Role.STAFF,
            password: 'yamada',
            themeColor: '#4B000F',
        },
        editedAt: '2024-01-13T12:20:00Z',
        edits: ['施術内容を追加', '注意事項を更新'],
    },
    {
        editTarget: EditLogTarget.TREATMENT_RECORD,
        user: USER_TESTDATA[3],
        editedAt: '2024-01-13T12:20:00Z',
        edits: ['施術内容を追加', '注意事項を更新'],
    },
]
