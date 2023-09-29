'use client'
import React, { useState } from 'react'

import { useFilterContext } from '@/context/FilterContext';


    const TripSelector = () => {
      const {tripType,updateTripType}=useFilterContext();
      
        const handleTripTypeChange = (e: { target: { value: React.SetStateAction<string> } }) => {
          updateTripType(e.target.value);
        };
  return (
    <div className="trip-selector">
      <div className="radio-buttons">
      <div className='trip-btn'>
              <input
                type='radio'
                name='oneway'
                value='oneWay'
                checked={tripType === 'oneWay'}
                onChange={handleTripTypeChange}
              />
              <label htmlFor='oneway' className='ml-1'>One-Way</label>
            </div> 
        <div className='trip-btn'>
              <input
                type='radio'
                name='roundtrip'
                value='roundTrip'
                checked={tripType === 'roundTrip'}
                onChange={handleTripTypeChange}
              />
              <label htmlFor='roundtrip' className='ml-1'>Round-Trip</label>
            </div>

        

            
            
      </div>
   
    </div>
  )
}

export default TripSelector