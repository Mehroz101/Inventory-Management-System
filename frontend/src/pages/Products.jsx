import React, { useState } from "react";
import ProductsTable from "../components/tables/ProductsTable";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CDropdown from "../components/FormComponents/CDropDown";
import CCheckBox from "../components/FormComponents/CCheckBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddProduct,
  GetCategory,
  GetProduct,
  UpdateProduct,
} from "../services/Api";
import { notify } from "../utils/notification";

const Products = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // For editing a product

  const method = useForm({
    defaultValues: {
      productName: "",
      quantity: 0,
      isRawData: false,
    },
  });

  const { data: product, refetch: refetchProducts } = useQuery({
    queryKey: ["products"],
    queryFn: GetProduct,
  });

  const addProductMutation = useMutation({
    mutationFn: AddProduct,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Product added successfully");
        setVisible(false);
        refetchProducts();
      } else {
        notify("error", data.message);
      }
    },
    onError: () => {},
  });

  const editProductMutation = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
      notify("success", "Product updated successfully");
      setVisible(false);
      setEditProduct(null);
      refetchProducts();
    },
  });

  const onSubmit = (data) => {
    if (editProduct) {
      editProductMutation.mutate({
        productId: editProduct.productID,
        ...data,
      });
    } else {
      addProductMutation.mutate(data);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    method.setValue("productName", product.productName);
    method.setValue("quantity", product.quantity);
    method.setValue("isRawData", product.isRawData);
    setVisible(true);
  };

  return (
    <>
      <div className="Productspage">
        <div className="page_top">
          <h2>Products</h2>
          <button
            className="btn"
            onClick={() => {
              setEditProduct(null);
              method.reset();
              setVisible(true);
            }}
          >
            New Product
          </button>
        </div>
        <div className="all_Products">
          <ProductsTable data={product} onEditProduct={handleEditProduct} />
        </div>
      </div>
      <Dialog
        header={editProduct ? "Edit Product" : "Add Product"}
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setVisible(false);
          method.reset();
          setEditProduct(null);
        }}
      >
        <form onSubmit={method.handleSubmit(onSubmit)}>
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
              <CustomTextInput
                control={method.control}
                name="quantity"
                required={true}
                label="Quantity"
                isEnable={true}
                type="number"
                placeholder="Enter quantity"
              />
            </FormColumn>
            {!editProduct && (
              <FormColumn>
                <CCheckBox
                  control={method.control}
                  name="isRawData"
                  label="Raw Data"
                />
              </FormColumn>
            )}

            <FormColumn>
              <Button label={editProduct ? "Update" : "Add"} type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default Products;
