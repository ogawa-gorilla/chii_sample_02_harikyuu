import { User } from './user'

export interface EditLog {
    id: string // 編集ログのID。
    editTarget: EditLogTarget // 編集ログの種類。つまり、何のエンティティを変更したか。エンティティに対応するキーが入る。
    user: User // 編集を行ったユーザ。
    editedAt: string // 編集を行った日付。
    edits: string[] // 編集の内容。複数の個所を変更した場合を考え配列。
    tags: EditLogTag[] // 編集のタグ。複数のタグを付けることがある。
    backup?: string // 編集前のデータ。JSON化しておく。
}

export const EditLogTarget = {
    RESERVATION: 'reservation',
    SHIFT: 'shift',
    TREATMENT_RECORD: 'treatment-record',
} as const

export type EditLogTarget = (typeof EditLogTarget)[keyof typeof EditLogTarget]

export const EditLogTag = {
    DELETE: '削除',
    EDIT: '編集',
    CREATE: '作成',
    RESTORE: '復元',
} as const

export type EditLogTag = (typeof EditLogTag)[keyof typeof EditLogTag]

export interface EditLogSearchConditions {
    target: EditLogTarget | null
    startDate: string
    endDate: string
    staffId: string
}
