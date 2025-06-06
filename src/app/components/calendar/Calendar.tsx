import { useCalendar } from "@/app/hooks/useCalendar";
import { Table } from "react-bootstrap";
import CalendarHeader from "./CalendarHeader";
import CalendarNavigation from "./CalendarNavigation";
import CalendarStyles from "./CalendarStyles";
import CalendarTimeRow from "./CalendarTimeRow";

export default function Calendar() {

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
            <CalendarTimeRow
              key={hour}
              hour={hour}
              days={days}
              isFirstRow={index === 0}
            />
          ))}
        </tbody>
      </Table>
      </div>
  )
}

