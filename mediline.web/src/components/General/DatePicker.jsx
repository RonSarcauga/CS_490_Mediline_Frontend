import React, { useState } from "react";
import Container, { ItemGroup } from './Container';
import BaseIcon from './BaseIcon';
import { monthNames } from '../../assets/js/const';

function DatePicker({ onDateSelect })
{
    const [selectedDate, setSelectedDate] = useState(null);

    // Generate array of dates starting from today
    const generateDates = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 30; i++)
        {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date.toISOString().split("T")[0]);
        }

        return dates;
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    return (
        <div className="date-picker">
            <h3>Choose a Date</h3>
            <div className="date-grid">
                {generateDates().map((date) => (
                    <button
                        key={date}
                        className={`date-button ${selectedDate === date ? "selected" : ""}`}
                        onClick={() => handleDateClick(date)}
                    >
                        {date}
                    </button>
                ))}
            </div>
            {selectedDate && (
                <p className="selected-info">
                    Selected Date: <strong>{selectedDate}</strong>
                    Selected Date: <strong>{selectedDate}</strong>
                </p>
            )}
        </div>
    );
};

export default DatePicker;