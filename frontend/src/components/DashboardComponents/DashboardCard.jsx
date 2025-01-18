import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DashboardCard = ({card_no,card_title,card_amount,card_icon}) => {
  return (
    <>
      <div className={`state_card state_card_${card_no}`}>
        <div className="state_card_left">
            <p className="state_card_title">{card_title}</p>
            <p className="state_card_number">{card_amount}</p>
        </div>
        <div className="state_card_right">
          <div className="icon">
            <FontAwesomeIcon icon={card_icon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
