import React, {useState, useEffect} from 'react'

const Pagination = ({paintingsPerPage, totalPaintings, paginate}) => {

  const pageNumbers = []

  const [lefts, setLefts]=useState(80)

  const [openPage, setOpenPage]=useState(1)

  for (var i = 1; i <= Math.ceil(totalPaintings/paintingsPerPage); i++) {
    pageNumbers.push(i)
  }

  function f(number) {
    paginate(number)
    setOpenPage(number)
    if (number==3) {
      setLefts(40)
    }else if (number==4) {
      setLefts(0)
    }else if (number==2) {
      setLefts(80)
    }else if (number==1) {
      setLefts(80)
    }
  }

  return (
    <div className="container-fluid paginations-items">
      <div className="container pNull">
        <div className="paginations">
          {(openPage==1) ?
            <div className="btn-back">
                <button className="total-left btn-paginations btn-nav disabled" disabled>
                {'<<'}
                </button>
                <button className="btn-paginations btn-nav disabled" disabled>
                {'<'}
                </button>
            </div>
            :
            <div className="btn-back">
              <button className="total-left btn-paginations btn-nav" onClick={() => f(1)}>
              {'<<'}
              </button>
              <button className="btn-paginations btn-nav" onClick={() => f(openPage-1)}>
              {'<'}
              </button>
            </div>
          }
          {(openPage==pageNumbers.length) ?
          <div className="btn-next">
            <button className="btn-paginations btn-nav disabled" disabled>
            {'>'}
            </button>
            <button className="btn-paginations-nav-total total-right btn-paginations btn-nav disabled" disabled>
            {'>>'}
            </button>
          </div>
          :
          <div className="btn-next">
            <button className="btn-paginations btn-nav" onClick={() => f(openPage+1)}>
            {'>'}
            </button>
            <button className="btn-paginations-nav-total total-right btn-paginations btn-nav" onClick={() => f(pageNumbers.length)}>
            {'>>'}
            </button>
          </div>
          }

          <div className="btns-numbers-pages" style={{left: lefts}}>
          {
            pageNumbers.map(number => (
              <button className={(openPage==number) ? 'btn-paginations btn-page active-btn-page' :'btn-paginations btn-page'} id={number} key={number} onClick={() => f(number)}>
                {number}
              </button>
            ))
          }
          </div>

    </div></div></div>
  )
}

export default Pagination;
