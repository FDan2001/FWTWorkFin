import React from 'react'

const Paintings = ({paintings, loading, authors, locations}) => {
  if(loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="cards">
      {
        paintings.map((paint, i) => (
          <div key={i} className="cart">
            <img className="img-paint" src={'https://test-front.framework.team'+paint.imageUrl} alt="print" style={{width:150}}/>
            <div className='container-painting-rules'>
              <p className="description">{paint.name}</p>
              <p className='rules'>Author: <span className='rules-span'>{authors.filter(author => author.id === paint.authorId).map(author => author.name)}</span></p>
              <p className='rules'>Created: <span className='rules-span'>{paint.created}</span></p>
              <p className='rules'>Location: <span className='rules-span'>{locations.filter(location => location.id === paint.locationId).map(location => location.location)}</span></p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
export default Paintings;
