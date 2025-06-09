export default function CalendarStyles() {
  return (
    <style>
      {`
      th {
          font-weight: normal;
        }
      .reservation-cell {
        background-color: #f0f0f0;
      }
      table th.saturday,
      table td.saturday {
        color: #007Bcc !important;
        background-color: #e6f0ff !important;
      }

      table th.sunday,
      table td.sunday {
        color: #cc3B30 !important;
        background-color: #ffe6e6 !important;
      }

      table th.today,
      table td.today {
        background-color: #e6f0e6 !important;
      }

      td.not-available {
        text-align: center;
        background-color: #f0f0f0;
        color: #6c757d;
      }
      `}
    </style>
  );
} 