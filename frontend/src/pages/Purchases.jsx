import React from 'react'
import PurchaseTable from '../components/tables/PurchaseTable'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import { useQuery } from '@tanstack/react-query'
import { GetPurchases } from '../services/Api'

const Purchases = () => {
    const navigate = useNavigate()
    const { data: purchases, refetch: refetchPurchases } = useQuery({
        queryKey: ["purchases"],
        queryFn: GetPurchases,
      });
  return (
    <>
        <div className="purchasepage">
            <div className="page_top">
                <h2>Purchases</h2>
                <button className="btn" onClick={()=>navigate(ROUTES.NEWPURCHASE)}>New Purchases</button>
            </div>
            <div className="all_purchases">
                <PurchaseTable data={purchases} />
            </div>
        </div>
    </>
  )
}

export default Purchases