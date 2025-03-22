// DateFilter.js
import React, { useState } from 'react';

const DateFilter = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleApplyFilter = () => {
    onDateChange(startDate, endDate);
  };

  return (
    <div className="date-filter">
      <h4>Filtrer par Date</h4>
      <div className="date-inputs">
        <label>
          Date de début:
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </label>
        <label>
          Date de fin:
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </label>
        <button onClick={handleApplyFilter}>Appliquer</button>
      </div>
    </div>
  );
};

export default DateFilter;
