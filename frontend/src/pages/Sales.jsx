import React from 'react'
import SalesTable from '../components/tables/SalesTable'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import { useQuery } from '@tanstack/react-query'
import { GetSales } from '../services/Api'

const Sales = () => {
    const navigate = useNavigate()
    const { data: sales, refetch: refetchPurchases } = useQuery({
        queryKey: ["sales"],
        queryFn: GetSales,
      });
  return (
   <>
      <div className="salespage">
            <div className="page_top">
                <h2>Sales</h2>
                <button className="btn" onClick={()=>navigate(ROUTES.NEWSALES)}>New Sales</button>
            </div>
            <div className="all_sales">
                <SalesTable data={sales}/>
            </div>
        </div>
   </>
  )
}

export default Sales