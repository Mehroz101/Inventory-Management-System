import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxOpen,
  faTags,
  faCity,
  faEdit,
  faTrash,
  faShoppingCart,
  faFileInvoice,
  faPrint,
  faExchangeAlt,
  faChartLine,
  faFileAlt,
  faUser,
  faRuler,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/UserGuide.css'; // Import your custom CSS for styling
import { useNavigate } from 'react-router-dom';

const UserGuide = () => {
  const steps = [
    {
      label: 'Step 1: Create Products',
      icon: <FontAwesomeIcon icon={faBoxOpen} className="step-icon" />,
      content: (
        <div>
          <p>
            Start by creating products. Enter the <strong>product name</strong>, <strong>quantity</strong>, and check the box if it's a <strong>raw product</strong>. Leave it unchecked for <strong>built products</strong>.
          </p>
          <p>
            <strong>Note:</strong> You can also add products with different sizes. Each size will be treated as a separate product entry.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 2: Create Categories',
      icon: <FontAwesomeIcon icon={faTags} className="step-icon" />,
      content: (
        <div>
          <p>
            Navigate to the <strong>Categories</strong> page and add categories by entering the <strong>category name</strong>.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 3: Add Cities',
      icon: <FontAwesomeIcon icon={faCity} className="step-icon" />,
      content: (
        <div>
          <p>
            Add cities from where you purchase or sell products. Go to the <strong>Cities</strong> page and enter the <strong>city name</strong>.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 4: Add Customers',
      icon: <FontAwesomeIcon icon={faUser} className="step-icon" />,
      content: (
        <div>
          <p>
            Add customers to track customer-specific receivable and payable data. Go to the <strong>Customers</strong> page and enter the <strong>customer name</strong>, <strong>contact details</strong>, and any <strong>notes</strong>.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 5: Manage Data',
      icon: <FontAwesomeIcon icon={faEdit} className="step-icon" />,
      content: (
        <div>
          <p>
            You can <strong>edit</strong> or <strong>delete</strong> products, categories, cities, and customers at any time.
          </p>
          <p>
            <strong>Note:</strong> Deleting a product with different sizes will delete all its size variants.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 6: Create Purchases',
      icon: <FontAwesomeIcon icon={faShoppingCart} className="step-icon" />,
      content: (
        <div>
          <p>
            When purchasing products, select the <strong>product</strong>, <strong>category</strong>, and <strong>city</strong> from dropdowns. Enter the <strong>supplier name</strong>, <strong>contact details</strong>, <strong>quantity</strong>, <strong>total amount</strong>, <strong>paid amount</strong>, <strong>remaining amount</strong>, and <strong>purchase date</strong>. Add a note if needed.
          </p>
          <p className="warning">
            <FontAwesomeIcon icon={faTrash} className="warning-icon" />
            <strong>Warning:</strong> Once a purchase is created, it cannot be edited. You can only view or delete it. Deleting a purchase will dynamically reduce the product quantity.
          </p>
          <p>
            <strong>Update Payment:</strong> You can update the payment data for purchases. For example, if a supplier pays an additional amount, you can add it to the paid amount.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 7: Transfer Raw Products to Printing',
      icon: <FontAwesomeIcon icon={faPrint} className="step-icon" />,
      content: (
        <div>
          <p>
            For raw products, click the <strong>Transfer</strong> button on the product page. Select the quantity to transfer to the <strong>Printing Department</strong>. The transferred quantity will be marked as <strong>in processing</strong>.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 8: Transfer Printed Products to Built Products',
      icon: <FontAwesomeIcon icon={faExchangeAlt} className="step-icon" />,
      content: (
        <div>
          <p>
            After printing, transfer the quantity from the <strong>Printing Department</strong> to the <strong>built product</strong>. Specify how much quantity is used and how much is produced. This will update the product quantity and make it available for sale.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 9: Create Sales',
      icon: <FontAwesomeIcon icon={faFileInvoice} className="step-icon" />,
      content: (
        <div>
          <p>
            To create a sale, select the <strong>product</strong>, <strong>category</strong>, and <strong>city</strong> from dropdowns. Enter the <strong>customer name</strong>, <strong>contact details</strong>, <strong>quantity</strong>, <strong>total amount</strong>, <strong>paid amount</strong>, <strong>remaining amount</strong>, and <strong>sale date</strong>. Add a note if needed.
          </p>
          <p className="warning">
            <FontAwesomeIcon icon={faTrash} className="warning-icon" />
            <strong>Warning:</strong> Once a sale is created, it cannot be edited. You can only view or delete it. Deleting a sale will dynamically return the quantity to the product stock.
          </p>
          <p>
            <strong>Update Payment:</strong> You can update the payment data for sales. For example, if a customer pays an additional amount, you can add it to the paid amount.
          </p>
        </div>
      ),
    },
    {
      label: 'Step 10: Generate Reports',
      icon: <FontAwesomeIcon icon={faChartLine} className="step-icon" />,
      content: (
        <div>
          <p>
            To generate a report, go to the <strong>Reports</strong> page. Select a <strong>start date</strong> and <strong>end date</strong> (optional). The report will display the <strong>current stock</strong>, <strong>payable purchases</strong>, <strong>receivable sales</strong>, and <strong>customer-wise data</strong>.
          </p>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="user-guide">
      <h1>
        <FontAwesomeIcon icon={faFileAlt} className="guide-icon" /> User Guide for Inventory Management System
      </h1>
      <div className="guide-container">
        <div className="details-container">
          {steps.map((step, index) => (
            <Card key={index} className="step-card">
              <h3>
                {step.icon} {step.label}
              </h3>
              {step.content}
            </Card>
          ))}
        </div>
      </div>
      <div className="actions">
        <Button label="Go to Dashboard" icon="pi pi-arrow-right" className="dashboard-button" onClick={() => navigate('/')} />
      </div>
    </div>
  );
};

export default UserGuide;
