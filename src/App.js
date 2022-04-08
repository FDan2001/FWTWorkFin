import axios from 'axios'
import React, {useState, useEffect} from 'react'
import './App.css';

import Info from './components/info';

import Paintings from './components/paintings';

import Paginations from './components/paginations';

import Select from './components/Select/Select';

import Location from './components/Location/Location';

import Round from './components/Round/Round';

import logo from './components/img/logo.png';

import sl from './components/img/sun-light.png';

import sd from './components/img/sun-dark.png';

import { useTheme } from './hooks/use-theme'

function App() {

  const [paintings, setPaintings]=useState([])
  const [authors, setAutors]=useState([])
  const [locations, setLocations]=useState([])

  const [loading, setLoading]=useState(false)
  const [currentPage, setCurrentPage]=useState(1)
  const [paintingsPerPage, setPaintingsPage]=useState(9)

  const [filterSerch, setFilterSerch]=useState('')
  const [filterAutor, setFilterAutor]=useState(0)
  const [filterLocations, setFilterLocations]=useState(0)

  const [filterDateStart, setFilterDateStart]=useState('0')
  const [filterDateEnd, setFilterDateEnd]=useState('9999')

  const filterPaintings = paintings.filter(paint => {
    if(filterAutor===0 && filterLocations===0){
      return(paint.name.toLowerCase().includes(filterSerch.toLowerCase()) && parseInt(paint.created)>=parseInt(filterDateStart) && parseInt(paint.created)<=parseInt(filterDateEnd))
    }else if(filterAutor!=0 && filterLocations!=0){
      return(paint.name.toLowerCase().includes(filterSerch.toLowerCase()) && parseInt(paint.created)>=parseInt(filterDateStart) && parseInt(paint.created)<=parseInt(filterDateEnd) && paint.authorId===filterAutor && paint.locationId===filterLocations)
    }else if(filterAutor!=0){
      return(paint.name.toLowerCase().includes(filterSerch.toLowerCase()) && parseInt(paint.created)>=parseInt(filterDateStart) && parseInt(paint.created)<=parseInt(filterDateEnd) && paint.authorId===filterAutor)
    }else if(filterLocations!=0){
      return(paint.name.toLowerCase().includes(filterSerch.toLowerCase()) && parseInt(paint.created)>=parseInt(filterDateStart) && parseInt(paint.created)<=parseInt(filterDateEnd) && paint.locationId===filterLocations)
    }
  }

)

  useEffect(()=>{
    const getPaintings = async () => {
      setLoading(true)
      const res = await axios.get('https://test-front.framework.team/paintings')
      setPaintings(res.data)
      setLoading(false)
    }
    const getAutors = async () => {
      setLoading(true)
      const resA = await axios.get('https://test-front.framework.team/authors')
      setAutors(resA.data)
      setLoading(false)
    }
    const getLocations = async () => {
      setLoading(true)
      const resL = await axios.get('https://test-front.framework.team/locations')
      setLocations(resL.data)
      setLoading(false)
    }

    getPaintings()
    getAutors()
    getLocations()
  }, [])

  const lastPaintingsPageIndex = currentPage * paintingsPerPage
  const firstPaintingsPageIndex = lastPaintingsPageIndex - paintingsPerPage
  const currentPaintings = filterPaintings.slice(firstPaintingsPageIndex, lastPaintingsPageIndex)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const selectAutors = selectAutor => setFilterAutor(selectAutor)
  const selectLocations = selectLocation => setFilterLocations(selectLocation)
  const selectDateStarts = selectDateStart => setFilterDateStart(selectDateStart)
  const selectDateEnds = selectDateEnd => setFilterDateEnd(selectDateEnd)

  const { theme, setTheme } = useTheme()

  const [btnThemeStyle, setBtnThemeStyle]=useState((theme=='light')?sl:sd)

  function handleThemeClick() {
    if (theme=='light') {
      setTheme('dark')
      setBtnThemeStyle(sd)
    }else {
      setTheme('light')
      setBtnThemeStyle(sl)
    }
  }

  return (
    <div className="App">
    <nav className="navbar navbar-light bg-nav">
      <div className="container">
        <img className="logo" src={logo}/>
        <img onClick={handleThemeClick} className="btn-theme" src={btnThemeStyle}/>
      </div>
    </nav>

    <section className="section-items">
      <div className="container pNull">
        <div className="row-items">
        <div className="select">
          <input type="text" className="Input" onChange={(event) => setFilterSerch(event.target.value)} placeholder="Serch"/>
        </div>
          <Select authors={authors} selectAutors={selectAutors}/>
          <Location locations={locations} selectLocations={selectLocations}/>
          <Round selectDateStarts={selectDateStarts} selectDateEnds={selectDateEnds}/>
        </div>
      </div>
    </section>


<div className="container pNull">
            <Paintings paintings={currentPaintings} loading={loading} authors={authors} locations={locations}/>
</div>
        <Paginations paintingsPerPage={paintingsPerPage} totalPaintings={filterPaintings.length} paginate={paginate}/>

    </div>

  );
}

export default App;
