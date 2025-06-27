import { Role } from '@/app/types/role'

export const roleText = (role: Role) => {
    switch (role) {
        case Role.MANAGER:
            return '店長アカウントは、すべての予約・シフトを閲覧/入力/編集できます。\n施術記録は誰でも閲覧できますが、入力/編集は施術者本人にしかできません。'
        case Role.STAFF:
            return '施術スタッフアカウントは、自分の担当予約のみ閲覧/入力/編集できます。\n施術スタッフはシフトを入力/編集できません。(店長か事務に依頼してください)\n施術記録は誰でも閲覧できますが、編集は施術者本人にしかできません。'
        case Role.OFFICE:
            return '事務アカウントは、すべての予約・シフトを閲覧/入力/編集できます。\n施術記録は誰でも閲覧できますが、入力/編集は施術者本人にしかできません。'
    }
}
