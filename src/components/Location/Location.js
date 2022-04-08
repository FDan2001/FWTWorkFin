import React, {useState, useEffect} from 'react'
import './Location.css'

const Location = ({locations, selectLocations}) => {
const [selectedLocation, setSelectedLocation]=useState('Locations')
const [openContainerLocations, setOpenContainerLocations]=useState(false)
const optionsContainerLocations = openContainerLocations ? "options-container active" : "options-container";
const backdropStyle = openContainerLocations ? "active-select-box-backdrop" : "select-box-backdrop";
  function openLocations() {
    setOpenContainerLocations(!openContainerLocations)
  }

  function fL(id, name) {
    setSelectedLocation(name)
    selectLocations(id)
    setOpenContainerLocations(false)
  }

  return(
<div className="select">

  <div className={backdropStyle} data-type="backdrop" onClick={() => setOpenContainerLocations(false)}></div>
  <div className="select-box">
    <div className={optionsContainerLocations}>
      {
        locations.map((location, i) => (
          <div className="option" key={i} onClick={(e) => fL(location.id, location.location)}>
            <input type="radio" className="radio" id={i} name="category" />
            <label htmlFor={i}>{location.location}</label>
          </div>
        ))
      }
    </div>

    <div className="selected" onClick={openLocations}>
      { selectedLocation }
    </div>
  </div>
</div>
  );
}

export default Location;
