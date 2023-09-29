import React, { createContext, useContext, useState } from "react";
import { AirlineInfo } from "./SearchContext";
// Create a context
const FilterContext = createContext();
const airlineData = [
  {
    name: "Qatar Airways",

    iata: "QR",

    is_lowcost: false,

    logo: "https://pics.avs.io/200/200/QR@2x.png",

    is_scheduled_passenger: 0,

    is_cargo: 0,
  },
  {
    name: "Emirates",

    iata: "EK",

    is_lowcost: false,

    logo: "https://pics.avs.io/200/200/EK@2x.png",

    is_scheduled_passenger: 0,

    is_cargo: 0,
  },

  {
    name: "Etihad Airways",

    iata: "EY",

    is_lowcost: false,

    logo: "https://pics.avs.io/200/200/EY@2x.png",

    is_scheduled_passenger: 0,

    is_cargo: 0,
  },
  {
    name: "Air India",

    iata: "AI",

    is_lowcost: false,

    logo: "https://pics.avs.io/200/200/AI@2x.png",

    is_scheduled_passenger: 0,

    is_cargo: 0,
  },

  {
    name: "Singapore Airlines",

    iata: "SQ",

    is_lowcost: false,

    logo: "https://pics.avs.io/200/200/SQ@2x.png",

    is_scheduled_passenger: 0,

    is_cargo: 0,
  },
];

// Create a custom hook to access the context
export const useFilterContext = () => {
  return useContext(FilterContext);
};

// Create a provider component to manage the filter state
export const FilterProvider = ({ children }) => {
  const [tripType, setTripType] = useState("oneWay");
  const [airlinesAvailable, setAirlinesAvailable] = useState(airlineData);
  
  const updateTripType = (newTripTypes) => {
    setTripType(newTripTypes);
  };

  const updateAirlineAvailable=(newAirline)=>{
    setAirlinesAvailable(newAirline)
  }





  return (
    <FilterContext.Provider
      value={{
        tripType,
        updateTripType,
        airlinesAvailable,
        updateAirlineAvailable
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
