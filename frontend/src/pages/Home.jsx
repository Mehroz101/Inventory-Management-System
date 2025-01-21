import React, { useEffect } from "react";
import DashboardCard from "../components/DashboardComponents/DashboardCard";
import "../styles/Home.css";
import {
  faMoneyBillTrendUp,
  faChartLine,
  faHandHoldingUsd,
  faShoppingCart,
  faMoneyCheckAlt,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import SaleProduct from "../components/DashboardComponents/SaleProduct";
import UpdateStock from "../components/DashboardComponents/UpdateStock";
import ViewStock from "../components/DashboardComponents/ViewStock";
import { DashboardData } from "../services/Api";
import { useQuery } from "@tanstack/react-query";

const iconMapping = {
  "Revenue": faMoneyBillTrendUp,
  "Profit": faSackDollar,
  "Receivable": faHandHoldingUsd,
  "Purchase": faShoppingCart,
  "Payable": faMoneyCheckAlt,
  "No of Sales": faChartLine,
};

const Home = () => {
  const { data: Dashboarddata } = useQuery({
    queryKey: ["dashboarddata"],
    queryFn: DashboardData,
  });


  return (
    <>
      <div className="dashboardpage">
        <div className="page_top"></div>
        <div className="dashboard_cards">
          {Dashboarddata && Dashboarddata.map((data, index) => {
            const key = Object.keys(data)[0]; // Get the key (e.g., "Revenue")
            const value = data[key]; // Get the corresponding value (e.g., 7000)

            return (
              <DashboardCard
                key={index} // Use index as a key (or better, use a unique identifier if available)
                card_no={`${index + 1}`}
                card_title={key} // Use the key as the title
                card_amount={value} // Use the value as the amount
                card_icon={iconMapping[key]} // Get the icon from the mapping
              />
            );
          })}
        </div>
        <div className="dashboardcomponent w-full flex justify-content-between mt-4 gap-2 flex-wrap">
          <div className="addsalecomonent ">
          <UpdateStock />
          </div>
          <div className="stockcomponent w-full">
            <ViewStock />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;