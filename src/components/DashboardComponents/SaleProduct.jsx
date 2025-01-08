import React from "react";
import CustomTextInput from "../FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import CDropdown from "../FormComponents/CDropDown";
import NumberInput from "../FormComponents/CNumberInput";

const SaleProduct = () => {
  const method = useForm({
    productId: 0,
    CustomerName: "",
    Quantity: 0,
  });
  // control,
  // name,
  // rules,
  // required,
  // defaultValue = "",
  // label = "",
  // isEnable = true,
  // type = "text",
  // placeholder = "",
  // errorMessage = "This field is required!",
  // showErrorMessage = true,
  // autoFocus = false,
  // onChange = () => {},
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
  const onsubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="add_sale_container container">
        <h3 className="container_title">New Sale</h3>
        <div className="new_sale_form">
          <form onSubmit={method.handleSubmit(onsubmit)}>
          <div className="input_box">
          
            <CDropdown
              control={method.control}
              name={"productId"}
              optionLabel="label"
              optionValue="value"
              options={productsData}
              required={true}
              label="Product"
              placeholder="Select product"
            />
          </div>
          <div className="input_box mt-2">
            <CustomTextInput
              control={method.control}
              name={"CustomerName"}
              required={true}
              label="Customer Name"
              placeholder="Enter customer name"
            />
          </div>
          <div className="input_box">
            <NumberInput
              control={method.control}
              label="Quantity"
              name="Quantity"
              required={true}
              placeholder="Enter quantity"
              rules={{ require: true }}
            />
          </div>
          <div className="btn">
            <button type="submit">Add</button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SaleProduct;
