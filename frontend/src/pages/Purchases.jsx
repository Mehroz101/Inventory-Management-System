import React from 'react'
import PurchaseTable from '../components/tables/PurchaseTable'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'

const Purchases = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className="purchasepage">
            <div className="page_top">
                <h2>Purchases</h2>
                <button className="btn" onClick={()=>navigate(ROUTES.NEWPURCHASE)}>New Purchases</button>
            </div>
            <div className="all_purchases">
                <PurchaseTable/>
            </div>
        </div>
    </>
  )
}

export default Purchases