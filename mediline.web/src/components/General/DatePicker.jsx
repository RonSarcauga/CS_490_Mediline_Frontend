import { useState } from 'react';
import Container, { ItemGroup } from './Container';
import BaseIcon from './BaseIcon';
function DatePicker({
    onDateSelect,
    disablePastDates = false
})
{
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());

    const isPastDate = (day) => {
        if (!disablePastDates || !day) return false;

        // Format the selected date
        const today = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const selectedDay = new Date(year, month, day);

        // Compare selected date to the current date
        return selectedDay < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }

    const generateCalendarDays = () => {
        const days = [];
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add leading empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }

        // Add days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const handleDateSelection = (day) => {
        if (!isPastDate(day)) setSelectedDate(day);

        // Passes selected date to parent component
        if (onDateSelect) {
            const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            onDateSelect(selectedDate);
        }
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDate(null);
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDate(null);
    };

    return (
        <div className="date-picker-wrapper">
            <div className="date-picker-header">
                <Container
                    customClass="p-0"
                    isClickable={true}
                    onClick={goToPreviousMonth}
                    content={[
                        <>
                            <BaseIcon
                                height={30}
                                weight={30}
                                fillColor='none'>
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0606 11.9999L15.5303 17.4696L14.4696 18.5303L7.93928 11.9999L14.4696 5.46961L15.5303 6.53027L10.0606 11.9999Z" fill="#080341" />
                                </g>
                            </BaseIcon>
                        </>
                    ]}
                />
                <h2 style={{ textAlign: 'center' }}>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <Container
                    customClass="p-0"
                    isClickable={true}
                    onClick={goToNextMonth}
                    content={[
                        <>
                            <BaseIcon
                                height={30}
                                weight={30}
                                fillColor='none'>
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9394 12.0001L8.46973 6.53039L9.53039 5.46973L16.0607 12.0001L9.53039 18.5304L8.46973 17.4697L13.9394 12.0001Z" fill="#080341" />
                                </g>
                            </BaseIcon>
                        </>
                    ]}
                />
            </div>
            <div className="date-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div
                        key={day}
                        className="day-name"
                    >
                        {day}
                    </div>
                ))}
                {generateCalendarDays().map((day, index) => (
                    <div
                        key={index}
                        onClick={() => day && handleDateSelection(day)}
                        className="date-slot"
                        style={{
                            cursor: day ? 'pointer' : 'default',
                            backgroundColor: day && day === selectedDate ? 'hsl(210, 70%, 50%)' : '#FFF',
                            color: day && day === selectedDate ? '#FFF' : '#000',
                            border: day ? '1px solid #CCC' : 'none',
                        }}
                    >
                        {day || ''}
                    </div>
                ))}
            </div>
            {/*selectedDate && (
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Selected Date: {selectedDate} {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </p>
            )*/}
        </div>
    );
};

export default DatePicker;