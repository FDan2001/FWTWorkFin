import React, {useState, useEffect} from 'react'
import './Select.css'

const Select = ({authors, selectAutors}) => {
const [selectedAutor, setSelectedAutor]=useState('Autors')
const [openContainerAutors, setOpenContainerAutors]=useState(false)
const optionsContainerAutors = openContainerAutors ? "options-container active" : "options-container";
const backdropStyle = openContainerAutors ? "active-select-box-backdrop" : "select-box-backdrop";
  function openAutors() {
    setOpenContainerAutors(!openContainerAutors)
  }

  function f(id, name) {
    setSelectedAutor(name)
    selectAutors(id)
    setOpenContainerAutors(false)
  }

  return(
<div className="select">
  <div className={backdropStyle} data-type="backdrop" onClick={() => setOpenContainerAutors(false)}></div>
  <div className="select-box">
    <div className={optionsContainerAutors}>
      {
        authors.map((autor, i) => (
          <div className="option" key={i} onClick={(e) => f(autor.id, autor.name)}>
            <input type="radio" className="radio" id={i} name="category" />
            <label htmlFor={i}>{autor.name}</label>
          </div>
        ))
      }
    </div>

    <div className="selected" onClick={openAutors}>
      { selectedAutor }
    </div>
  </div>
</div>
  );
}

export default Select;
