import React from "react";
import CDropdown from "../FormComponents/CDropDown";
import { useForm } from "react-hook-form";
import NumberInput from "../FormComponents/CNumberInput";
import CustomTextInput from "../FormComponents/CustomTextInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetProduct, UpdateProductStock } from "../../services/Api";
import { notify } from "../../utils/notification";

const UpdateStock = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: GetProduct,
  });
  const queryClient = useQueryClient();
  const method = useForm({
    productId: 0,
    quantity: 0,
  });
  const productsData = [
    {
      label: "Product1",
      value: 1,
    },
    {
      label: "Product2",
      value: 2,
    },
    {
      label: "Product3",
      value: 3,
    },
  ];
  const UpdateStockMutation = useMutation({
    mutationFn: UpdateProductStock,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        notify("success", data.message);
        method.reset();
      } else {
        notify("error", data.message);
      }
    },
  });
  const onsubmit = (data) => {
    UpdateStockMutation.mutate({
      productId: data.productId,
      quantity: parseInt(data.quantity),
    });
  };
  return (
    <>
      <div className="updatestock_container container w-full">
        <h3 className="container_title">Update Stock</h3>

        <form onSubmit={method.handleSubmit(onsubmit)}>
          <div className="input_box">
            <CDropdown
              control={method.control}
              name={"productId"}
              optionLabel="productName"
              optionValue="productID"
              options={products}
              required={true}
              label="Product"
              placeholder="Select product"
            />
          </div>
          <div className="input_box">
            <CustomTextInput
              control={method.control}
              label="Quantity"
              name="quantity"
              required={true}
              type="number"
              placeholder="Enter quantity"
            />
          </div>
          <div className="btn">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateStock;
