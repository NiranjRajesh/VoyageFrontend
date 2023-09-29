import React from 'react';
import { useSearch } from '@/context/SearchContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calender: React.FC = () => {
  const { departureDate, updateDepartureDate } = useSearch();
  const today: Date = new Date();


  

  
  return (
    
    <DatePicker
      selected={departureDate}
      
      placeholderText='DD/MM/YY'
      popperPlacement='bottom-end'
      onChange={(date) => updateDepartureDate(date)}
      minDate={today}
    />
  );
};

export default React.memo(Calender);
