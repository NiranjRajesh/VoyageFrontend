import React, { useState } from 'react'
import TripSelector from './TripSelector'
import TripSearch from './TripSearch'

import Image from 'next/image';
const FlightSearch = () => {
  const [tripType, setTripType] = useState('roundTrip');
  return (
    <div className='flight-search-container'>
        <div className='flight-content'>
        <img src="/assets/banner3.png" alt="logo" className="banner-container" />
       
        </div>

       
    <div className='flight-search'>
    
      {tripType === 'roundTrip' &&<TripSearch/>}
      {tripType === 'oneWay' && <TripSearch/>}
 
      {/* {tripType === 'multiCity' && <MultiCity tripType={''} />} */}
    </div>
   
    </div>
  )
}

export default FlightSearch