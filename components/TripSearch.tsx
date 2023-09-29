import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import Calender from "./Calender";
import { useFilterContext } from "@/context/FilterContext";
import RangeCalender from "./RangeCalender";
import { PiAirplaneTakeoffBold, PiAirplaneLandingBold } from "react-icons/pi";
import { useSearch } from "@/context/SearchContext";
import { formatDate } from "@/util/dateformatter";
import debounce from "lodash/debounce";
import { useLoading } from "@/context/loadingContext";

type AutoCompleteResponse = {
  iata: string;
  code: string;
  name: string;
  city: string;
  state: string;
};

type Search = {
  code: string;
  name: string;
};

const TripSearch = () => {
  const { tripType } = useFilterContext();

  const {
    from,
    to,
    updateFrom,
    updateTo,
    departureDate,
    departureAirport,
    arrivalAirport,
    updateArrivalAirport,
    updateDepartureAirport,
    cabinClass,
    selectedAirlines,
    setSearchResult,
    returnDate,
  } = useSearch();
  const { isLoading, toggleLoading } = useLoading();
  const [fromSearch, setFromSearch] = useState<Search>();
  const [toSearch, setToSearch] = useState<Search>();
  const [fromSuggestions, setFromSuggestions] = useState<
    AutoCompleteResponse[]
  >([]);
  const [toSuggestions, setToSuggestions] = useState<AutoCompleteResponse[]>(
    []
  );
 

  const fromInputRef = useRef<HTMLInputElement | null>(null);
  const toInputRef = useRef<HTMLInputElement | null>(null);
  const clickRef=useRef<HTMLDivElement | null>(null);


  const debouncedFetchSuggestions = useCallback(
    debounce(
      async (
        inputValue: string,
        setSuggestions: (suggestions: AutoCompleteResponse[]) => void
      ) => {
        if (inputValue.length === 0) {
          setSuggestions([]);
          return;
        }
        
        try {
          const response = await fetch(
            `http://localhost:8080/api/airportautocomplete?search_string=${inputValue}`
          );
          const data = await response.json();
  
          setSuggestions(data);
        } catch (error) {
          console.error(error);
        }
      },
      300 // Adjust the delay as needed (e.g., 300 milliseconds)
    ),
    [] // Empty dependency array to ensure that debounce function is created only once
  );

  const handleSearch = async () => {
  
    toggleLoading();
  
    try {
      interface RequestBody {
        class: string[];
        airline: string[];
        routes: {
          date: string;
          departure: string;
          arrival: string;
        }[];
      }
      const requestBody:RequestBody = {
        class: cabinClass,
        airline: selectedAirlines,
        routes: [],
      };
  
      if (tripType === "oneWay" && departureDate) {
        const date = formatDate(departureDate);
     
        requestBody.routes.push({
          date,
          departure: departureAirport,
          arrival: arrivalAirport,
        });
      } else if (tripType === "roundTrip" && returnDate && departureDate) {
        const departureDateFormatted = formatDate(departureDate);
        const arrivalDateFormatted = formatDate(returnDate);
        requestBody.routes.push(
          {
            date: departureDateFormatted,
            departure: departureAirport,
            arrival: arrivalAirport,
          },
          {
            date: arrivalDateFormatted,
            departure: arrivalAirport,
            arrival: departureAirport,
          }
        );
      }
  
    
  
      const response = await fetch("http://localhost:8080/api/detailrecommendations", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
       
      }
  
      const data = await response.json();
      console.log(data);
      setSearchResult(data.multicity);
      toggleLoading();
    } catch (error) {
      console.error("An error occurred:", error);
      toggleLoading();
      // Handle the error gracefully, e.g., by displaying an error message to the user
    }
  };
  

 

  useEffect(() => {
    if (fromInputRef.current) {
      const inputValue = fromInputRef.current.value;
      debouncedFetchSuggestions(inputValue, setFromSuggestions);
    }
  }, [debouncedFetchSuggestions, from]);
  
  useEffect(() => {
    if (toInputRef.current) {
      const inputValue = toInputRef.current.value;
      debouncedFetchSuggestions(inputValue, setToSuggestions);
    }
  }, [debouncedFetchSuggestions, to]);


  const handleSelection = (sugg: Search, inputType: string) => {
  
    if (inputType === "from") {
      setFromSearch(sugg);
      updateFrom(sugg.name);
      updateDepartureAirport(sugg.code);
      toggleModal(inputType)
    } else if (inputType === "to") {
      setToSearch(sugg);
      updateTo(sugg.name);
      updateArrivalAirport(sugg.code);
      toggleModal(inputType)
    }
  };

  const handleSwap = () => {
    const temp = from;
    const tempCode=arrivalAirport;
    updateArrivalAirport(departureAirport)
    updateDepartureAirport(tempCode)
    updateFrom(to);
    updateTo(temp);
  };
  const handlePopper=(e:React.ChangeEvent<HTMLInputElement>,inputType:string)=>{
    if (inputType === "from") {
      updateFrom(e.target.value);
    } else {
      updateTo(e.target.value);
    }
  
    // Only toggle the modal if the inputType doesn't match the current showModal value
    if (inputType !== showModal) {
      toggleModal(inputType);
    }

  }

  const [showModal, setShowModal] = useState<string |null>(null); // null for neither, 'from', or 'to'

  const handleModalClickOutside:any = (e:React.MouseEvent) => {
   
    if (
      showModal &&
      ((showModal === "from" && clickRef.current && !clickRef.current.contains(e.target as Node) && fromInputRef.current && !fromInputRef.current.contains(e.target as Node)) ||
      (showModal === "to"  && clickRef.current && !clickRef.current.contains(e.target as Node)  &&toInputRef.current && !toInputRef.current.contains(e.target as Node)))
    ) {
      setShowModal(null);
    }
  };

  useEffect(() => {
   document.addEventListener("mousedown", handleModalClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleModalClickOutside);
    };
  }, [showModal]);

  const toggleModal = (modalType:string |null) => {
    setShowModal(showModal === modalType ? null : modalType);
  };

  return  (
    <div className="trip-container">
      <div className="travel-input-container">
        <label htmlFor="travel-from">From</label>
        <input
          type="text"
          name="travel-from"
          autoComplete="off"
          placeholder="Leaving from"
          value={from}
          onChange={(e) => handlePopper(e, "from")}
          onFocus={() => toggleModal("from")}
  
          ref={fromInputRef}
        />
        <span className="placeholder-icon">
          {" "}
          <PiAirplaneTakeoffBold />{" "}
        </span>
        {showModal === "from" && (
          <SuggestionsModal
            suggestions={fromSuggestions}
            handleSelection={(suggestion) => handleSelection(suggestion, "from")}
            inputType="from"
             
            clickRef={clickRef} 
          />
        )}
        <span className="iata-cur">{departureAirport}</span>
      </div>
      <button className="roundButton" onClick={handleSwap}>
        ⇆
      </button>
      <div className="travel-input-container">
        <label htmlFor="travel-to">To</label>
        <input
          type="text"
          name="travel-to"
          placeholder="Going to"
          autoComplete="off"
          value={to}
          onChange={(e) => handlePopper(e, "to")}
          onFocus={() => toggleModal("to")}
       
          ref={toInputRef}
        />
        <span className="placeholder-icon">
          {" "}
          <PiAirplaneLandingBold />{" "}
        </span>
        {showModal === "to" && (
          <SuggestionsModal
            suggestions={toSuggestions}
            handleSelection={(suggestion) => handleSelection(suggestion, "to")}
            inputType="to"
       
           clickRef={clickRef} 
          />
        )}
        <span className="iata-cur">{arrivalAirport}</span>
      </div>
      <div className="travel-calender-container">
        <div>
          <div>
            <label htmlFor="travel-date">Date</label>
          </div>

          <div>
            {tripType === "roundTrip" ? <RangeCalender /> : <Calender />}
          </div>
        </div>

        <div>
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

interface SuggestionProps{
  suggestions:AutoCompleteResponse[];
  handleSelection: (sugg: Search, inputType: string) => void;
  inputType:string;

  clickRef:React.MutableRefObject<HTMLDivElement | null>;
}


const SuggestionsModal:React.FC<SuggestionProps> = ({ suggestions, handleSelection,inputType,clickRef }) => {

  const handleSuggestionClick = (suggestion: AutoCompleteResponse) => {
    handleSelection(suggestion, inputType);
   
  };
  return (
    <div className="suggestions-container"  ref={clickRef}  >
      {suggestions?.map((suggestion, index) => (
        <div
          className="suggestions"
          
          onClick={() => handleSuggestionClick(suggestion)}
          key={index}
        >
          <div className="suggestion-name">{suggestion.name}</div>
          <div className="suggestion-code">{suggestion.code}</div>
        </div>
      ))}
    </div>
  );
};
export default React.memo(TripSearch);
