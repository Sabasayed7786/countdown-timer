import React from 'react';

const DateTimePicker = ({ value, onChange }) => {
  return (
    <input type="datetime-local" value={value} onChange={onChange} step="60"/>
  );
};

export default DateTimePicker;
