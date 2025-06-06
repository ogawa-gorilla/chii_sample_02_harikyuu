import { CalendarCellProps } from './types';

interface ExampleCustomCellProps extends CalendarCellProps {
  backgroundColor?: string;
  textColor?: string;
  content?: string;
}

export default function ExampleCustomCell({ 
  day, 
  hour, 
  backgroundColor = '#f8f9fa',
  textColor = '#333',
  content 
}: ExampleCustomCellProps) {
  return (
    <td 
      key={`${day.format()}-${hour}`}
      style={{
        backgroundColor,
        color: textColor,
        padding: '8px',
        minHeight: '60px',
        cursor: 'pointer'
      }}
      onClick={() => console.log(`Clicked on ${day.format('YYYY-MM-DD')} at ${hour}:00`)}
    >
      <div className="text-center">
        {content || `${day.format('DD')}日 ${hour}:00`}
      </div>
    </td>
  );
} 