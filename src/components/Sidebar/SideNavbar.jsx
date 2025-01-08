// src/components/CustomSidebar.js
import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";
import "../../styles/CustomSidebar.css"; // Optional CSS for custom styles
import { ROUTES } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faCartShopping, faChartLine, faCookieBite, faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const CustomSidebar = ({ visible, onHide }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onHide(); // Close the sidebar
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Sidebar visible={visible} onHide={onHide} position="left">
      <div>
        <div className="sidebar-header flex justify-content-start gap-2 align-items-center flex-row  ">
          <h3 className="sidebar-profile-name ">Admin Dashboard</h3>
        </div>
        <ul className="sidebar-links">
          <li>
            <Link
              to={"/"}
              className="sidebar-link"
              onClick={handleLinkClick}
            >
             <FontAwesomeIcon icon={faChartLine} className="pr-2"/>  Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.PURCHASES}
              className="sidebar-link"
              onClick={handleLinkClick}
            ><FontAwesomeIcon icon={faCartShopping} className="pr-2"/>
             Purchases
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.SALES}
              className="sidebar-link "
              onClick={handleLinkClick}
            >
            <FontAwesomeIcon icon={faArrowTrendUp} className="pr-2"/>
            Sales
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.PRODUCTS}
              className="sidebar-link "
              onClick={handleLinkClick}
            >
            <FontAwesomeIcon icon={faCookieBite} className="pr-2" />
            Products
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.CATEGORIES}
              className="sidebar-link "
              onClick={handleLinkClick}
            >
            <FontAwesomeIcon icon={faLayerGroup} className="pr-2"  />
            Category
            </Link>
          </li>

          <li>
            <Link
              to={ROUTES.SETTING}
              className="sidebar-link "
              onClick={handleLinkClick}
            >
              <FontAwesomeIcon icon={faGear} className="pr-2"/>Settings
            </Link>
          </li>
         
          <li className=" py-2 px-4 rext-black" onClick={() => handleLogout()}>
            <i className="pi pi-sign-out pr-2"></i>
            Logout
          </li>
        </ul>
      </div>

      <div className=" absolute bottom-0">
        <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
        <a
          v-ripple
          className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
        >
          <Avatar
            image="https://media.licdn.com/dms/image/v2/D4D0BAQFYnsnKEj8M3w/company-logo_200_200/company-logo_200_200/0/1724233190482?e=1744243200&v=beta&t=nUMcynJyqsih3okCbDNLxkSzxIbhHBg8Oo3tuSPVOmo"
            shape="circle"
          />
          <span className="font-bold">Webtech Smart Solution</span>
        </a>
      </div>
    </Sidebar>
  );
};

export default CustomSidebar;
