import React from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import CDropdown from "../components/FormComponents/CDropDown";
import { FormColumn, FormRow } from "../components/layoutComponent";
const NewPurchase = () => {
  const method = useForm({
    defaultValues: {
      invoiceNo: 0,
      productName: "",
      category: "",
      productSize: "",
      productPrice: 0,
      supplierName: "",
      supplierContact: "",
      productQuantity: 0,
      paidAmount: 0,
      remainingAmount: 0,
      status: "",
      Note: "",
    },
  });
  const onsubmit = (data) => {
    console.log(data);
  };
  const category = [
    {
      label: "Category 1",
      value: "Cat1",
    },
    {
      label: "Category 2",
      value: "Cat2",
    },
  ];
  const productSize = [
    {
      label: "12 x 12",
      value: "12x12",
    },
    {
      label: "24 x 24",
      value: "24x24",
    },
  ];
  return (
    <>
      <div className="newpurchases">
        <div className="page_top">
          <h2>ADD PURCHASES</h2>
          <button className="btn">Add</button>
        </div>

        <div className="newpurchases_container">
          <form onSubmit={method.handleSubmit(onsubmit)}>
            <FormRow className="flex">
              <FormColumn sm={12} md={4} lg={2} xl={2}>
                <CustomTextInput
                  control={method.control}
                  name="invoiceNo"
                  required={true}
                  label="Invoice Number"
                  isEnable={true}
                  placeholder="Enter invoice number"
                />
              </FormColumn>
              <FormColumn sm={12} md={8} lg={8} xl={8}>
                <CustomTextInput
                  control={method.control}
                  name="productName"
                  required={true}
                  label="Product Name"
                  isEnable={true}
                  placeholder="Enter product name"
                />
              </FormColumn>
              <FormColumn sm={12} md={6} lg={2} xl={2}>
                <CDropdown
                  control={method.control}
                  name="category"
                  required={true}
                  label="Category"
                  optionLabel="label"
                  optionValue="value"
                  isEnable={true}
                  placeholder="Select category"
                  options={category}
                />
              </FormColumn>
              <FormColumn sm={12} md={6} lg={2} xl={2}>
                <CDropdown
                  control={method.control}
                  name="productSize"
                  required={true}
                  label="Product Size"
                  optionLabel="label"
                  optionValue="value"
                  isEnable={true}
                  placeholder="Select size"
                  options={productSize}
                />
              </FormColumn>
              <FormColumn sm={12} md={8} lg={8} xl={8}>
                <CustomTextInput
                  control={method.control}
                  name="supplierName"
                  required={true}
                  label="Supplier Name"
                  isEnable={true}
                  placeholder="Enter supplier name"
                />
              </FormColumn>
              <FormColumn sm={12} md={4} lg={4} xl={2}>
                <CustomTextInput
                  control={method.control}
                  name="supplierContact"
                  required={true}
                  label="Supplier Contact"
                  isEnable={true}
                  placeholder="Enter supplier contact"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="productPrice"
                  required={true}
                  label="Product Price"
                  isEnable={true}
                  placeholder="Enter price"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="productQuantity"
                  required={true}
                  label="product Quantity"
                  isEnable={true}
                  placeholder="Enter Quantity"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="paidAmount"
                  required={true}
                  label="Paid Amount"
                  isEnable={true}
                  placeholder="Enter Paid Amount"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="remainingAmount"
                  required={true}
                  label="Remaining Amount"
                  isEnable={true}
                  placeholder="Enter Remaining Amount"
                />
              </FormColumn>
              <FormColumn sm={12} md={12} lg={12} xl={12}>
                <CustomTextInput
                  control={method.control}
                  name="Note"
                  label="Note"
                  isEnable={true}
                  placeholder="Enter note"
                />
              </FormColumn>
            </FormRow>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPurchase;
