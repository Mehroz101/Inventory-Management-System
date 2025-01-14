import React, { useState } from "react";
import ProductsTable from "../components/tables/ProductsTable";
import { ROUTES } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CDropdown from "../components/FormComponents/CDropDown";
import { useQuery } from "@tanstack/react-query";
import { GetCategory } from "../services/Api";

const Products = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const method = useForm({
    defaultValues: {
      productName: "",
      category: "",
    },
  });
  const {data:category} = useQuery({
    queryKey:["categories"],
    queryFn:GetCategory
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
            <CDropdown
              control={method.control}
              name="category"
              required={true}
              label="Category"
              optionLabel="categoryName"
              optionValue="categoryID"
              placeholder="Select category"
              options={category}
            />
          </FormColumn>
          <FormColumn>
            <Button label="Add" />
          </FormColumn>
        </FormRow>
      </Dialog>
    </>
  );
};

export default Products;
