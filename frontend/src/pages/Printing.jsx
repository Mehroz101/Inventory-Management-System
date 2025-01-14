import React from "react";
import { ROUTES } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import PrintingTable from "../components/tables/PrintingTable";

const Printing = () => {
    const navigate = useNavigate()
  return (
    <div className="printingpage">
      <div className="page_top">
        <h2>Printing</h2>
        {/* <button className="btn" onClick={() => navigate(ROUTES.NEWPRINTING)}>
          New printing
        </button> */}
      </div>
      <div className="all_printings">
        <PrintingTable />
      </div>
    </div>
  );
};

export default Printing;
