import React from 'react'
import TripSelector from './TripSelector'
import CabinClassSelector from './CabinClassSelector'
import AirlineSelection from './AirlineSelector'
import { useSearch } from '@/context/SearchContext'

const Filter = () => {
  const {searchResult}=useSearch();
  return (
    <div className='filter-container'>
    <div className='filter-heading-container'>
     
      <div className='filter-title'>
        <h3>Filter</h3>
      </div>
  
    </div>
    <div className="filter-body">
    <div className='tripSelector'>
      <h4>Journey Type</h4>
    <TripSelector />
    </div>
    <div className='cabinClass'>
      <h4>Cabin Class</h4>
        <CabinClassSelector/>
    </div>
    {searchResult && searchResult.length>0 &&     <div className='airlineSelection'>
      <h4>Airline</h4>
    

      <AirlineSelection/>

    </div>}

    </div>

  </div>
  )
}

export default Filter