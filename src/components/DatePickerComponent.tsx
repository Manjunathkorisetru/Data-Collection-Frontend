import { SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerComponent({
  selectedDate,
  handleDateChange,
}: {
  selectedDate: Date | null;
  handleDateChange: (date: SetStateAction<Date | null>) => void;
}) {
  return (
    <div className="date-picker-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText="Select a date"
        className="bg-slate-100 p-2 rounded-lg shadow-lg "
      />
    </div>
  );
}
export default DatePickerComponent;
