import { HOURS } from '@/app/constants/hours'
import { VIRUTAL_TODAY } from '@/app/constants/virtualToday'
import dayjs from 'dayjs'
import { useState } from 'react'

export function useCalendar() {
    const [startOfWeek, setStartOfWeek] = useState(
        dayjs(VIRUTAL_TODAY).startOf('week').add(1, 'day')
    )

    // 7日間の日付配列を生成
    const days = (startDate: string) => {
        return Array.from({ length: 7 }, (_, i) =>
            dayjs(startDate).add(i, 'day')
        )
    }

    // 営業時間の配列を生成（9:00〜18:00）
    const hours = Array.from({ length: HOURS }, (_, i) => i + 9)

    // 週移動の処理
    const handlePrevWeek = (onWeekChange?: (startDate: string) => void) => {
        const newStartOfWeek = startOfWeek.subtract(1, 'week')
        setStartOfWeek(newStartOfWeek)
        onWeekChange?.(newStartOfWeek.format('YYYY-MM-DD'))
    }

    const handleNextWeek = (onWeekChange?: (startDate: string) => void) => {
        const newStartOfWeek = startOfWeek.add(1, 'week')
        setStartOfWeek(newStartOfWeek)
        onWeekChange?.(newStartOfWeek.format('YYYY-MM-DD'))
    }

    const handleToday = (onWeekChange?: (startDate: string) => void) => {
        const newStartOfWeek = dayjs(VIRUTAL_TODAY)
            .startOf('week')
            .add(1, 'day')
        setStartOfWeek(newStartOfWeek)
        onWeekChange?.(newStartOfWeek.format('YYYY-MM-DD'))
    }

    // 特定の週にジャンプ
    const jumpToWeek = (date: dayjs.Dayjs) => {
        setStartOfWeek(date.startOf('week').add(1, 'day'))
    }

    return {
        // 状態
        startOfWeek,
        days,
        hours,
        // アクション
        handlePrevWeek,
        handleNextWeek,
        handleToday,
        jumpToWeek,
    }
}
