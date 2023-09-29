"use client"
import React, { ReactNode, createContext, memo, useContext, useState } from 'react';

interface ResAirportInfo {
  code: string;
  IATA: string;
  name: string;
  city: string;
  state: string;
  country: string;
  url: string;
  icao: string;
  direct_flights: string;
  carriers: string;
  NormalizedScore: string;
  Canceled: number;
  Delayed15: number;
  Delayed30: number;
  Delayed45: number;
  OnTime: number;

}

export interface AirlineInfo {
  name: string;
  code: string;
  is_lowcost: boolean;
  logo: string;
  is_scheduled_passenger: number;
  is_cargo: number;
 
}

 export interface Route {
  id: number;
  airportFrom: string;
  airportTo: string;
  airline: string;
  CommonDuration:number;
  Monday:string;
  Tuesday:string;
  Wednesday:string;
  Thursday:string;
  Friday:string;
  Saturday:string;
  Sunday:string;
  ClassBusiness:boolean;
  ClassEconomy:boolean;
  ClassFirst:boolean;

  ResAirportTo: ResAirportInfo;
  ResAirportFrom: ResAirportInfo;
  AirlineInfo: AirlineInfo;
}

interface MulticityResponse {
  date: string;
  departure: string;
  arrival: string;
  route: Route[];
}


export interface MultiCityInfo {
  id: number;
  airportFrom: string;
  airportTo: string;
  airline: string;
  commonDuration: number;
  ClassBusiness:boolean;
  ClassEconomy:boolean;
  ClassFirst:boolean;
  Monday:string;
  Tuesday:string;
  Wednesday:string;
  Thursday:string;
  Friday:string;
  Saturday:string;
  Sunday:string;
  ResAirportTo: {
    code: string;
    IATA: string;
    name: string;
    city: string;
    state: string;
    country: string;
    url: string;
    carriers: string;
    NormalizedScore: string;
    OnTime: number;

  };
  ResAirportFrom: {
    code: string;
    IATA: string;
    name: string;
    city: string;
    state: string;
    country: string;
    url: string;
    NormalizedScore: string;
    OnTime: number;

  };
  AirlineInfo: {
    name: string;
    iata: string;
    is_lowcost: boolean;
    logo: string;
    is_scheduled_passenger: number;
    is_cargo: number;
  
  };
}





interface SearchFilters {
 
  routes: Route[];
  searchResult:MulticityResponse[];

  from: string;
  to: string;
  departureAirport:string;
  arrivalAirport:string;
  cabinClass:string[];
  selectedAirlines:string[];
  setSearchResult:React.Dispatch<React.SetStateAction<MulticityResponse[]>>;
  updateFrom: (newFrom: string) => void;
  updateTo: (newTo: string) => void;
  updateDepartureAirport:(newDepartureAirport: string) => void;
  updateArrivalAirport: (newArrivalAirport: string) => void;
  updateCabinClass: React.Dispatch<React.SetStateAction<string[]>>;
  updateSelectedAirlines:React.Dispatch<React.SetStateAction<string[]>>;
  departureDate:Date | null;
  returnDate:Date | null;
  updateDepartureDate: (value: React.SetStateAction<Date | null>) => void;
  updateReturnDate:(value: React.SetStateAction<Date | null>) => void;


}




// Create a context for the search filters
const SearchContext = createContext<SearchFilters | undefined>(undefined);

// Create a custom hook to access the context
export const useSearch = (): SearchFilters => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = memo( ({ children }) => {
  // State for search filters
  const [cabinClass, setCabinClass] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [journeyType, setJourneyType] = useState<string>('OneWay');
  const [departureAirport, setDepartureAirport] = useState<string>('');
  const [arrivalAirport, setArrivalAirport] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [searchResult,setSearchResult]=useState<MulticityResponse[]>([]);

  const updateFrom = (newFrom: string) => setFrom(newFrom);
  const updateTo = (newTo: string) => setTo(newTo);
  // Define functions to update filters

  const updateSelectedAirlines = (newAirlines: string[]) => setSelectedAirlines(newAirlines);
  const updateJourneyType = (newJourneyType: string) => setJourneyType(newJourneyType);
  const updateDepartureAirport = (newDepartureAirport: string) => setDepartureAirport(newDepartureAirport);
  const updateArrivalAirport = (newArrivalAirport: string) => setArrivalAirport(newArrivalAirport);
  const updateDepartureDate = (newDepartureDate: Date | null) => setDepartureDate(newDepartureDate);
  const updateReturnDate = (newReturnDate: Date | null) => setReturnDate(newReturnDate);

  return (
    <SearchContext.Provider
      value={{
        cabinClass:cabinClass,
        searchResult:searchResult,
        setSearchResult:setSearchResult,
        routes: [],
        from:from,
        to:to,
        selectedAirlines:selectedAirlines,
        updateFrom:updateFrom,
        updateTo:updateTo,
        updateCabinClass:setCabinClass,
        updateSelectedAirlines:setSelectedAirlines,
        departureDate:departureDate,
        returnDate:returnDate,
        updateDepartureDate:setDepartureDate,
        updateReturnDate:setReturnDate,
        arrivalAirport:arrivalAirport,
        departureAirport:departureAirport,
        updateDepartureAirport:updateDepartureAirport,
        updateArrivalAirport:updateArrivalAirport
      }}
    >
      {children}
    </SearchContext.Provider>
  );
});
