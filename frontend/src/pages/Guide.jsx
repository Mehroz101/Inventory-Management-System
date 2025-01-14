import React from 'react';
import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
// import './User Guide.css'; // Import your custom CSS for styling

const UserGuide = () => {
  const steps = [
    {
      label: 'Step 1: Purchase Raw Data',
      content: (
        <div>
          <p>
            Start by purchasing raw data from the market. Navigate to the <strong>New Purchase</strong> page to list your purchases.
          </p>
          {/* <Image src="path/to/purchase-image.png" alt="Purchase Raw Data" /> */}
        </div>
      ),
    },
    {
      label: 'Step 2: Pass Quantity to Printing Department',
      content: (
        <div>
          <p>
            After purchasing, pass the required quantity to the <strong>Printing Department</strong>. You can do this by selecting the purchased items and specifying the quantity.
          </p>
          {/* <Image src="path/to/printing-image.png" alt="Pass Quantity to Printing" /> */}
        </div>
      ),
    },
    {
      label: 'Step 3: Monitor Printing Status',
      content: (
        <div>
          <p>
            Monitor the status of your items in the printing department. There are two statuses: <strong>Processing</strong> and <strong>Printed</strong>.
          </p>
          {/* <Image src="path/to/status-image.png" alt="Monitor Printing Status" /> */}
        </div>
      ),
    },
    {
      label: 'Step 4: Add Products Ready for Sale',
      content: (
        <div>
          <p>
            Once the items are printed and ready for sale, add them to your product inventory. This will update the product quantity accordingly.
          </p>
          {/* <Image src="path/to/add-product-image.png" alt="Add Products Ready for Sale" /> */}
        </div>
      ),
    },
    {
      label: 'Step 5: Finalize Sales',
      content: (
        <div>
          <p>
            Finally, you can sell the products that are now available in your inventory. Navigate to the <strong>Sales</strong> page to manage your sales transactions.
          </p>
          {/* <npm Image src="path/to/sales-image.png" alt="Finalize Sales" /> */}
        </div>
      ),
    },
  ];

  return (
    <div className="user-guide">
      <h1>User Guide for Inventory Management System</h1>
      <div className="guide-container">
        {/* <div className="steps-container">
          <Steps model={steps} style={{}} orientation="vertical" />
        </div> */}
        <div className="details-container">
          {steps.map((step, index) => (
            <div key={index} className="step-detail">
              <h3>{step.label}</h3>
              {step.content}
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        <Button label="Go to Dashboard" icon="pi pi-arrow-right" />
      </div>
    </div>
  );
};

export default UserGuide;