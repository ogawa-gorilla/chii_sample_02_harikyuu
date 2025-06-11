import { VIRUTAL_TODAY } from '@/app/constants/virtualToday'
import { weeklyClosedDays } from '@/app/constants/weeklyClosedDays'
import dayjs from 'dayjs'

/**
 * 指定日が定休日かどうかを判定
 */
export function isClosedDay(day: dayjs.Dayjs): boolean {
    return weeklyClosedDays.includes(day.format('d'))
}

/**
 * 指定日が土曜日かどうかを判定
 */
export function isSaturday(day: dayjs.Dayjs): boolean {
    return day.format('d') === '6'
}

/**
 * 指定日が日曜日かどうかを判定
 */
export function isSunday(day: dayjs.Dayjs): boolean {
    return day.format('d') === '0'
}

/**
 * 指定日が今日（仮想的な今日）かどうかを判定
 */
export function isToday(day: dayjs.Dayjs): boolean {
    return day.format('YYYY-MM-DD') === VIRUTAL_TODAY
}

/**
 * 日付に応じたCSSクラス名を取得
 */
export function getDayClassName(day: dayjs.Dayjs): string {
    if (isToday(day)) return 'today'
    if (isSaturday(day)) return 'saturday'
    if (isSunday(day)) return 'sunday'
    return ''
}

/**
 * 指定日が営業日かどうかを判定
 */
export function isBusinessDay(day: dayjs.Dayjs): boolean {
    return !isClosedDay(day)
}
