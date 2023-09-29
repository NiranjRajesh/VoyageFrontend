import React, { useEffect, useState } from 'react';
import { AirlineInfo, useSearch } from '@/context/SearchContext';
import { Route } from 'next';

const AirlineSelector: React.FC = () => {
  const { searchResult, selectedAirlines, updateSelectedAirlines } = useSearch();
  const [airlinesAvailable, setAirlinesAvailable] = useState<Set<AirlineInfo>>(new Set());

  // Function to remove duplicates based on an identifier
  const removeDuplicates = (array:AirlineInfo[], identifier:(airline:AirlineInfo)=>void) => {
    const seen = new Set();
    return array.filter((item) => {
      const key = identifier(item);
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      }
      return false;
    });
  };
  
  // Update airlinesAvailable when searchResult changes
  useEffect(() => {
    const uniqueAirlines = removeDuplicates(
      searchResult
        .flatMap((value) => value?.route || []) // Flatten the route arrays
        .map((airline) => airline.AirlineInfo), // Extract AirlineInfo objects
      (airline:AirlineInfo) => airline.code // Use the airline code as the identifier
    );
  
    const newAirlinesAvailable = new Set<AirlineInfo>(uniqueAirlines);
  
    setAirlinesAvailable(newAirlinesAvailable);
  }, [searchResult]);
  

  const handleAirlineChange = (airline: string) => {
    const updatedSelectedAirlines = new Set(selectedAirlines);

    if (updatedSelectedAirlines.has(airline)) {
      updatedSelectedAirlines.delete(airline);
    } else {
      updatedSelectedAirlines.add(airline);
    }

    updateSelectedAirlines(Array.from(updatedSelectedAirlines));
  };

  return (
    <div className="airline-container">
      <ul className="airline-list">
        {Array.from(airlinesAvailable).map((airline: AirlineInfo) => (
          <li key={airline.code} className="airline-item">
            <label className="airline-label">
             
             <span className="airline-detail">
             <img src={airline.logo} alt={airline.code} />
              <span>{airline.code}</span>
              <span>{airline.name}</span>
             </span>
             <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedAirlines.includes(airline.code)}
                onChange={() => handleAirlineChange(airline.code)}
              />
              <span className="checkmark"></span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirlineSelector;
