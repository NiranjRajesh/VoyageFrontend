import { Route, useSearch } from '@/context/SearchContext';
import React, { useState } from 'react';
import RouteCard from './RouteCard';
import { useFilterContext } from '@/context/FilterContext';
import { useLoading } from '@/context/loadingContext';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Modal from './Modal';
import NoRoute from './NoRoute';


function Searchresult() {
  const {isLoading}=useLoading();
  const { searchResult } = useSearch();
  const {tripType}=useFilterContext()
  const [page,setPage]=useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedRoute, setSelectedRoute] = useState<Route |null>(null); // State for selected RouteCard data
 

    // Function to open the modal and set the selected >RouteCard data
    const openModal = (routeData:Route) => {

      setSelectedRoute(routeData);
      console.log(selectedRoute)
      setIsModalOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setSelectedRoute(null);
      setIsModalOpen(false);
    };


  if (!searchResult || searchResult.length === 0 ) {
    // Render a loading state or a message when there are no search results
    return (
      <div className='search-result-container'>
   
      </div>
    );
  }



  // Render the search results when available
  return (
    <div className='search-result-container'>
      {isLoading ? <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box> :
      
      <>
       <div className="search-result-heading">
        <h4>Search Result</h4>
      </div>
      <div className="page-section">
        {tripType!="oneWay" && 
        <div className="trip-button-container">
          {
            searchResult.map((value,index)=>
<button key={index} onClick={()=>setPage(index)}>{value.departure}-{value.arrival}</button>
            )
          }
          
        </div>
        }
      </div>
      {searchResult[page].route ?

      <div className="search-result">
        <div className="search-route">
          <div className="from-airport-container">
            <div className="t-airport-title">
              From
            </div>
            <div className="t-airport-iata">{searchResult[page].departure}</div>
            <div className="t-airport">{searchResult[page].route[0]?.ResAirportFrom.name}</div>
          </div>
          <div className="to-airport-container">
            <div className="t-airport-title">To</div>
            <div className="t-airport-iata">{searchResult[page].arrival}</div>
            <div className="t-airport">{searchResult[page].route[0]?.ResAirportTo.name}</div>
          </div>
        </div>
        <div className="route-results">
         {searchResult[page].route.map((value,index)=><RouteCard  route={value} date={searchResult[page].date} key={index}  onClick={() => openModal(value) }/>)}
        
      </div>
    </div>: <NoRoute title={"Currently no flight in this route"}/>
} 

      </>
      }
     
   
<Modal open={isModalOpen} handleClose={()=>setIsModalOpen(false)} selectedRoute={selectedRoute}/>   

{/* 
{isModalOpen && selectedRoute && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
            <h2>Route Details</h2>
            <button onClick={closeModal}>Close</button>
            </div>
            <div className="modal-body">
              
               <p>{selectedRoute.airportTo}</p>
              <p>{selectedRoute.airportFrom}</p>
              <p>{selectedRoute.CommonDuration}</p>

              <div className="day-grid">
              
               <p>Mon</p>
               <p>Tue</p>
               <p>Wed</p>
               <p>Thu</p>
               <p>Fri</p>
               <p>Sat</p>
               <p>Sun</p>
               <div className='day-box'>
                <p>yes</p>
               </div>
              </div>


              

            </div>
      
          </div>
        </div>
     )}  */}
    </div>
  );
}

export default Searchresult;
