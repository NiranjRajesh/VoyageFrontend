import { MultiCityInfo, Route, useSearch } from '@/context/SearchContext'
import { formatDate, formatDateToCustomString, formatMinutes, stringToDateformat } from '@/util/dateformatter';
import React, { MouseEventHandler } from 'react'
import { on } from 'stream';
import{BiSolidPlane} from 'react-icons/bi';


interface RouteCardProps {
  route: Route;
  date:string;
  onClick:MouseEventHandler<HTMLDivElement>;
}
const RouteCard: React.FC<RouteCardProps> = ({route,date, onClick}) => {
  console.log(route)
  return (
    <div className="card" onClick={onClick}>

      <div className="card-header">
      <img src={route.AirlineInfo.logo} className='card-img' alt="Card Image" />
      <h5>{route.AirlineInfo.name}</h5>
      </div>

 

    <div className="card-content">
      <div className="card-content-l">
        <p className="card-content-city">{route.ResAirportFrom.city}</p>
        <p className="card-content-iata">{route.airportFrom}</p>

      </div>
      <div className="card-content-m">
        <div className="card-content-date">
           {formatDateToCustomString(date)}
        </div>
        <div className='card-content-transition'>
          <hr />
         
          <BiSolidPlane className="flight-icon"/>
         <hr/>

        </div>
        <div className="card-content-duration">
          {formatMinutes(route.CommonDuration)}
        </div>
        
      </div>
      <div className="card-content-r">
        <p className="card-content-city">{route.ResAirportTo.city}</p>
        <p className="card-content-iata">{route.airportTo}</p>

      </div>

    </div>

  </div>
  )
}

export default RouteCard