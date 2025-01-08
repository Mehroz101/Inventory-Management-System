import React from "react";

const ViewStock = () => {
  const productsData = [
    {
      ProductName: "Product1",
      ProductStock: 1,
    },
    {
      ProductName: "Product2",
      ProductStock: 2,
    },
    {
      ProductName: "Product3",
      ProductStock: 3,
    },
  ];
  return (
    <>
      <div className="view_stock_container container">
      <h3 className="container_title">View Stock</h3>

        {productsData.map((product, index) => {
          return (
            <>
              <div className="product_stock_box" key={index}>
                <span className="title">{product.ProductName}</span>
                <span className="stock">{product.ProductStock}</span>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </>
  );
};

export default ViewStock;
