import { useCalendar } from "@/app/hooks/useCalendar";
import { Table } from "react-bootstrap";
import CalendarHeader from "./CalendarHeader";
import CalendarNavigation from "./CalendarNavigation";
import CalendarStyles from "./CalendarStyles";
import CalendarTimeRow from "./CalendarTimeRow";
import { CalendarCellProps, CalendarProps } from "./types";

export default function Calendar<TCellProps extends CalendarCellProps = CalendarCellProps>({ 
  cellComponent: CellComponent, 
  cellProps = {} as Omit<TCellProps, keyof CalendarCellProps>
}: CalendarProps<TCellProps>) {

  const { 
    startOfWeek, 
    days, 
    hours, 
    handlePrevWeek, 
    handleNextWeek, 
    handleToday 
  } = useCalendar();

  return (
    <div>
      <CalendarStyles />
      <CalendarNavigation
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
      />
    <Table bordered responsive className="w-100 text-center align-middle small">
        <CalendarHeader days={days} />
        <tbody>
          {hours.map((hour, index) => (
            <CalendarTimeRow<TCellProps>
              key={hour}
              hour={hour}
              days={days}
              isFirstRow={index === 0}
              CellComponent={CellComponent}
              cellProps={cellProps}
            />
          ))}
        </tbody>
      </Table>
      </div>
  )
}

