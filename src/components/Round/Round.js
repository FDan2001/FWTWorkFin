import React, {useState, useEffect} from 'react'
import './Round.css'

const Round = ({selectDateStarts, selectDateEnds}) => {
const [selectedDateStart, setSelectedDateStart]=useState('0')
const [selectedDateEnd, setSelectedDateEnd]=useState('9999')
const [openContainerDates, setOpenContainerDates]=useState(false)
const optionsContainerDates = openContainerDates ? "options-container active" : "options-container";
const backdropStyle = openContainerDates ? "active-select-box-backdrop" : "select-box-backdrop";
const [prov, setProv]=useState(true)
  function openDates() {
    setOpenContainerDates(!openContainerDates)
  }

  function DateStarts(DateStart) {
    if (DateStart=='') {
      setSelectedDateStart('0')
      selectDateStarts('0')
    }else if (DateStart!='' && selectedDateStart!=DateStart) {
      setSelectedDateStart(DateStart)
      selectDateStarts(DateStart)
    }
  }

  function DateEnds(DateEnd) {
    if (DateEnd=='') {
      setSelectedDateEnd('9999')
      selectDateEnds('9999')
    }else if (DateEnd!='' && selectedDateStart!=DateEnd) {
      setSelectedDateEnd(DateEnd)
      selectDateEnds(DateEnd)
    }
  }



  return(
<div className="select">

  <div className={backdropStyle} data-type="backdrop" onClick={() => setOpenContainerDates(false)}></div>
  <div className="select-box">
    <div className={optionsContainerDates}>
      {
        <div className="option">
          <input type="text" className="Input input-select" name="DateStart" onChange={(event) => DateStarts(event.target.value)} placeholder="From"/>
          -
          <input type="text" className="Input input-select" name="DateEnd" onChange={(event) => DateEnds(event.target.value)} placeholder="Before"/>
        </div>
      }
    </div>

    <div className="selected" onClick={openDates}>
      Created
    </div>
  </div>
</div>
  );
}

export default Round;
