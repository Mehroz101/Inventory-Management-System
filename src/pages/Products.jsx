import React, { useState } from "react";
import ProductsTable from "../components/tables/ProductsTable";
import { ROUTES } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";

const Products = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const method = useForm({
    defaultValues:{
        productName:""
    }
  })
  return (
    <>
      <div className="Productspage">
        <div className="page_top">
          <h2>Products</h2>
          <button
            className="btn"
            onClick={() => {
              setVisible(true);
            }}
          >
            New Product
          </button>
        </div>
        <div className="all_Products">
          <ProductsTable />
        </div>
      </div>
      <Dialog
        header="Add Product"
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <FormRow>
          <FormColumn>
            <CustomTextInput
              control={method.control}
              name="productName"
              required={true}
              label="Product Name"
              isEnable={true}
              placeholder="Enter product name"
            />
          </FormColumn>
          <FormColumn>
            <Button
            label="Add"
            />
          </FormColumn>
        </FormRow>
      </Dialog>
    </>
  );
};

export default Products;
