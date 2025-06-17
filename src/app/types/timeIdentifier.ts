export type TimeIdentifier = {
    type: 'date' | 'dayOfWeek'
    value: string // 'YYYY-MM-DD' または '0'〜'6'
    displayValue: string // 表示用の値（'2025-05-01' または '月'）
}
