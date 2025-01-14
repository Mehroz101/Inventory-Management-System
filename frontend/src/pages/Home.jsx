import React from "react";
import DashboardCard from "../components/DashboardComponents/DashboardCard";
import "../styles/Home.css"
import { faMoneyBillTrendUp ,faCreditCard,faSackDollar,faChartSimple} from "@fortawesome/free-solid-svg-icons";
import SaleProduct from "../components/DashboardComponents/SaleProduct";
import UpdateStock from "../components/DashboardComponents/UpdateStock";
import ViewStock from "../components/DashboardComponents/ViewStock";
const Home = () => {
  return (
    <>
      <div className="dashboardpage">
        <div className="page_top"></div>
        <div className="dashboard_cards">
          <DashboardCard card_no={"1"} card_title={"Total Revenue"} card_amount={"2122"} card_icon={faMoneyBillTrendUp}/>
          <DashboardCard card_no={"2"} card_title={"Loan"} card_amount={"2122"} card_icon={faCreditCard}/>
          <DashboardCard card_no={"3"} card_title={"Profit"} card_amount={"2122"} card_icon={faSackDollar}/>
          <DashboardCard card_no={"4"} card_title={"Sales"} card_amount={"2122"} card_icon={faChartSimple}/>
        </div>
        <div className="dashboardcomponent w-full flex justify-content-between mt-4 gap-2 flex-wrap">
        <div className="addsalecomonent ">

        <SaleProduct/>
        </div>
        <div className="stockcomponent w-full">
          <UpdateStock/>
          <ViewStock/>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
