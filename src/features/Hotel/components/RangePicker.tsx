import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';

interface RangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange?: (dateRange: {
    from?: string;
    to?: string;
    nights: number;
  }) => void;
}

const RangePicker = ({ startDate, endDate, onChange }: RangePickerProps) => {
  const today = new Date();

  // 선택된 날짜가 변경될 때마다 호출되는 함수
  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (!dateRange) return;

    const { from, to } = dateRange;

    if (onChange) {
      onChange({
        from: from ? format(from, 'yyyy-MM-dd') : undefined,
        to: to ? format(to, 'yyyy-MM-dd') : undefined,
        nights: from && to ? differenceInDays(to, from) : 0,
      });
    }
  };

  // 선택된 날짜를 객체로 만들어서 selected 변수에 할당
  const selected = {
    from: startDate ? parseISO(startDate) : undefined,
    to: endDate ? parseISO(endDate) : undefined,
  };

  return (
    <div>
      <DayPicker
        mode="range"
        numberOfMonths={2}
        locale={ko}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
        classNames={customClassNames}
        disabled={{ before: addDays(today, 1) }}
      />
    </div>
  );
};

export default RangePicker;

const customClassNames = {
  day: 'p-4 text-center',
  selected: 'text-white bg-red-500',
  today: 'font-semibold bg-gray-200 text-neutral-700',
  disabled: 'text-gray-300',
};
