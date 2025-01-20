import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import ProductSizeTable from "../components/tables/ProductSizeTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddProductSize, GetProductSize, UpdateProductSize } from "../services/Api";
import { notify } from "../utils/notification";
const ProductSize = () => {
  const [visible, setVisible] = useState(false);
  const [editProductSize, setEditProductSize] = useState(null); // For editing a productSize
  const method = useForm({
    defaultValues: {
      productSize: "",
    },
  });

  const addProductSizeMutation = useMutation({
    mutationFn: (data) => AddProductSize(data),
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Product Size added successfully");
        setVisible(false);
        refetch();
      }
    },
  });

  const editProductSizeMutation = useMutation({
    mutationFn: UpdateProductSize,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Product Size updated successfully");
        setVisible(false);
        setEditProductSize(null);
        method.reset()
        refetch();
      }
    },
  });

  const onSubmit = (data) => {
    if (editProductSize) {
      editProductSizeMutation.mutate({
        productSizeId: editProductSize.productSizeID,
        productSizeName: data.productSize,
      });
    } else {
      addProductSizeMutation.mutate({ productSize: data.productSize });
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: GetProductSize,
  });

  const handleEditProductSize = (productSize) => {
    setEditProductSize(productSize);
    method.setValue("productSize", productSize.productSizeName);
    setVisible(true);
  };

  return (
    <>
      <div className="productSizepage">
        <div className="page_top flex flex-wrap mb-2">
          <h2>Product Size</h2>
          <button
            className="btn"
            onClick={() => {
              setEditProductSize(null);
              setVisible(true);

            }}
          >
            New Product Size
          </button>
        </div>
        <div className="all_productSize">
          <ProductSizeTable
            data={data}
            onEditProductSize={handleEditProductSize} // Pass edit handler
          />
        </div>
      </div>
      <Dialog
        header={editProductSize ? "Edit Product Size" : "Add Product Size"}
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setVisible(false);
          method.reset();
          setEditProductSize(null);
        }}
      >
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <FormRow>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="productSize"
                required={true}
                label="Product size name"
                isEnable={true}
                placeholder="Enter product size name"
              />
            </FormColumn>
           
            <FormColumn>
              <Button label={editProductSize ? "Update" : "Add"} type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default ProductSize