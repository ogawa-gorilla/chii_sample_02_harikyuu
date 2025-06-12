import dayjs from 'dayjs'

export interface CalendarCellProps {
    day: dayjs.Dayjs
    hour: number
}

export interface CalendarProps<
    TCellProps extends CalendarCellProps = CalendarCellProps
> {
    cellComponent?: React.ComponentType<TCellProps>
    cellProps?: Omit<TCellProps, keyof CalendarCellProps>
    onWeekChange?: (startDate: string) => void
    startDate?: string
}
