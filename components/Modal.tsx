import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { Route } from '@/context/SearchContext';
import Searchresult from './Searchresult';
import { formatMinutes } from '@/util/dateformatter';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
 borderRadius:"5px",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoute: Route | null;
}

const BasicModal: React.FC<Props> = ({ open, handleClose,selectedRoute }) => {
  console.log(selectedRoute?.Monday)
  return (
    selectedRoute &&  <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="modal-container">
                <div className="modal-header">
                  <div className="modal-logo-container">
                   <img className='modal-logo' src={selectedRoute.AirlineInfo.logo} alt={selectedRoute.AirlineInfo.code} />
                 
                  </div>
                  <div className="modal-airline">
                  {selectedRoute?.AirlineInfo.name}
                  </div>
                </div>
                <div className="modal-content">
                  <div className="modal-travel-container">
                    <div className="modal-travel-dig">
                      <div className="circle-1"></div>
                      <hr/>
                      <div className="circle-2"></div>
                    </div>
                    <div className="modal-travel-detail">
                      <div className="modal-from">
                        {selectedRoute.ResAirportFrom.city+"("+selectedRoute.airportFrom+")"}
                      </div>
                      <div className="modal-duration">
                        {formatMinutes(selectedRoute.CommonDuration)}
                      </div>
                      <div className="modal-to">
                        {selectedRoute.ResAirportTo.city+"("+selectedRoute.airportTo+")"}
                      </div>
                    </div>
                  </div>
                  <div className='modal-availablity'>
                    <div>
                    <div className='modal-available'></div>
                    <p>Available</p>
                    </div>
                    <div>
                    <div className='modal-unavailable'></div>
                    <p>Unavailable</p>
                    </div>
                  
           
                  
                  </div>
                  <div className="weekday">
                    <div className={`weekday-container ${selectedRoute.Monday==="yes" ?"available":""}`}>
                    Mon
                    </div>
                    <div className={`weekday-container ${selectedRoute.Tuesday==="yes" ?"available":""}`}>
                  Tue
                    </div>
                    <div className={`weekday-container ${selectedRoute.Wednesday==="yes" ?"available":""}`}>
                    Wed
                    </div>
                    
                    <div className={`weekday-container ${selectedRoute.Thursday==="yes" ?"available":""}`}>
                   Thu
                    </div>
                    
                    
                    <div className={`weekday-container ${selectedRoute.Friday==="yes" ?"available":""}`}>
                   Fri
                    </div>
                    <div className={`weekday-container ${selectedRoute.Saturday==="yes" ?"available":""}`}>
                  Sat
                    </div>
                    <div className={`weekday-container ${selectedRoute.Sunday==="yes" ?"available":""}`}>
                    Sun
                    </div>
                    
                    
               
                
                  </div>
                  <div className="class-type">
                    <div className={`modal-class-container ${selectedRoute.ClassBusiness?"available":null}`}>
                      Bussiness Class
                    </div>
                    <div className={`modal-class-container ${selectedRoute.ClassEconomy?"available":null}`}>
                     Economic Class
                    </div>
                    <div className={`modal-class-container ${selectedRoute.ClassFirst?"available":null}`}>
                     First Class
                    </div>

                    {selectedRoute.ClassEconomy}
                    {selectedRoute.ClassBusiness}
                    {selectedRoute.ClassFirst}
                  </div>
                </div>
            </div>
    
        </Box>
      </Modal>
    </div>
   
  );
};

export default BasicModal;
