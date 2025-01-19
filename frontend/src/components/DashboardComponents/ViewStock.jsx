import React from "react";
import { GetStock } from "../../services/Api";
import { useQuery } from "@tanstack/react-query";

const ViewStock = () => {
  const { data: StockData } = useQuery({
    queryKey: ["stock"],
    queryFn: GetStock,
  });
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

        {StockData && StockData?.map((product, index) => {
          return (
            <>
              <div className="product_stock_box" key={index}>
                <span className="title">{product?.product}</span>
                <span className="stock">{product?.quantity}</span>
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
