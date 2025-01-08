import React from 'react'
import SalesTable from '../components/tables/SalesTable'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'

const Sales = () => {
    const navigate = useNavigate()
  return (
   <>
      <div className="salespage">
            <div className="page_top">
                <h2>Sales</h2>
                <button className="btn" onClick={()=>navigate(ROUTES.NEWSALES)}>New Sales</button>
            </div>
            <div className="all_sales">
                <SalesTable/>
            </div>
        </div>
   </>
  )
}

export default Sales