import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import CDropdown from "../components/FormComponents/CDropDown";
import { FormColumn, FormRow } from "../components/layoutComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddSale,
  GetCategory,
  GetCity,
  GetProduct,
  GetSaleData,
} from "../services/Api";
import CDatePicker from "../components/FormComponents/CDatePicker";
import { Button } from "primereact/button";
import { formatDate } from "../utils/CommonFunction";
import { notify } from "../utils/notification";
const NewSales = () => {
  const location = useLocation();
  const [fieldEnabled, setFieldEnabled] = useState(true);
  const [isSaleId, setIsSaleId] = useState(null); // Get the ID from the query parameters
  const { data: EditSaleData } = useQuery({
    queryKey: ["editsaledata"],
    queryFn: () => GetSaleData(isSaleId),
    enabled: isSaleId ? true : false,
  });
  const method = useForm({
    defaultValues: {
      saleId: null,
      invoiceNo: 0,
      productId: null,
      productName: "",
      categoryId: null,
      categoryName: "",
      cityId: null,
      cityName: "",
      productPrice: 0,
      customerName: "",
      customerContact: "",
      productQuantity: 0,
      paidAmount: 0,
      remainingAmount: 0,
      status: "",
      saleDate: null,
      Note: "",
    },
  });
  const navigate = useNavigate();
  const addSalesMutation = useMutation({
    mutationFn: AddSale,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        navigate("/sales");
      } else {
        notify("error", data.message);
      }
    },
    onError: (data) => {},
  });
  const onsubmit = (data) => {
    addSalesMutation.mutate({
      productId: data.productId,
      productName: data.productName,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      cityId: data.cityId,
      cityName: data.cityName,
      productPrice: parseInt(data.productPrice),
      customerName: data.customerName,
      customerContact: data.customerContact,
      productQuantity: parseInt(data.productQuantity),
      paidAmount: parseInt(data.paidAmount),
      remainingAmount: parseInt(data.remainingAmount),
      saleDate: formatDate(data.saleDate),
      Note: data.Note,
      saleId: method.getValues("saleId"),
    });
  };
  const { data: category } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategory,
  });
  const { data: city } = useQuery({
    queryKey: ["cities"],
    queryFn: GetCity,
  });
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: GetProduct,
  });
  useEffect(() => {
    if (EditSaleData && isSaleId) {
      setFieldEnabled(false);
      method.setValue("saleId", EditSaleData.saleID);
      method.setValue("invoiceNo", EditSaleData.invoiceNo);
      method.setValue("productId", EditSaleData.productId);
      method.setValue("productName", EditSaleData.productName);
      method.setValue("categoryId", EditSaleData.categoryId);
      method.setValue("categoryName", EditSaleData.categoryName);
      method.setValue("cityId", EditSaleData.cityId);
      method.setValue("cityName", EditSaleData.cityName);
      method.setValue("customerName", EditSaleData.customerName);
      method.setValue("customerContact", EditSaleData.customerContact);
      method.setValue("productPrice", EditSaleData.productPrice);
      method.setValue("productQuantity", EditSaleData.productQuantity);
      method.setValue("paidAmount", EditSaleData.paidAmount);
      method.setValue("remainingAmount", EditSaleData.remainingAmount);
      method.setValue("saleDate", new Date(EditSaleData.saleDate));
      method.setValue("Note", EditSaleData.Note);
    }
  }, [EditSaleData, isSaleId]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    setIsSaleId(id);
  }, [isSaleId]);
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
      <div className="newsales">
        <div className="page_top">
          <h2>{isSaleId ? "View" : "New"} Sale</h2>
          {/* {isSaleId && (
            <button className="btn" onClick={() => setFieldEnabled(true)}>
              Enable
            </button>
          )} */}
        </div>

        <div className="newsales_container">
          <form onSubmit={method.handleSubmit(onsubmit)}>
            <FormRow className="flex">
              <FormColumn sm={12} md={2} lg={2} xl={2}>
                <CustomTextInput
                  control={method.control}
                  name="invoiceNo"
                  required={true}
                  label="Invoice No."
                  isEnable={false}
                  placeholder="Enter invoice number"
                />
              </FormColumn>
              <FormColumn sm={12} md={5} lg={3} xl={3}>
                <CDropdown
                  control={method.control}
                  name="productId"
                  required={true}
                  label="Product"
                  disabled={fieldEnabled ? false : true}
                  optionLabel="productName"
                  optionValue="productID"
                  placeholder="Select product"
                  onChange={(e) => {
                    method.setValue("productId", e.value);
                    method.setValue("productName", e.label);
                  }}
                  options={products}
                />
              </FormColumn>
              <FormColumn sm={12} md={5} lg={3} xl={3}>
                <CDropdown
                  control={method.control}
                  name="categoryId"
                  required={true}
                  label="Category"
                  optionLabel="categoryName"
                  optionValue="categoryID"
                  placeholder="Select category"
                  options={category}
                  disabled={fieldEnabled ? false : true}
                  onChange={(e) => {
                    method.setValue("categoryId", e.value);
                    method.setValue("categoryName", e.label);
                  }}
                />
              </FormColumn>
              <FormColumn sm={12} md={5} lg={3} xl={3}>
                <CDropdown
                  control={method.control}
                  name="cityId"
                  required={true}
                  label="City"
                  optionLabel="cityName"
                  optionValue="cityID"
                  placeholder="Select city"
                  options={city}
                  disabled={fieldEnabled ? false : true}
                  onChange={(e) => {
                    method.setValue("cityId", e.value);
                    method.setValue("cityName", e.label);
                  }}
                />
              </FormColumn>

              <FormColumn sm={12} md={7} lg={3} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="customerName"
                  required={true}
                  label="Customer Name"
                  isEnable={fieldEnabled}
                  placeholder="Enter customer name"
                />
              </FormColumn>
              <FormColumn sm={12} md={4} lg={3} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="customerContact"
                  required={true}
                  label="Customer Contact"
                  isEnable={fieldEnabled}
                  placeholder="Enter customer contact"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="productPrice"
                  required={true}
                  label="Product Price"
                  type="number"
                  isEnable={fieldEnabled}
                  placeholder="Enter price"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="productQuantity"
                  required={true}
                  label="product Quantity"
                  type="number"
                  isEnable={fieldEnabled}
                  placeholder="Enter Quantity"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="paidAmount"
                  required={true}
                  label="Paid Amount"
                  type="number"
                  isEnable={fieldEnabled}
                  placeholder="Enter Paid Amount"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="remainingAmount"
                  required={true}
                  type="number"
                  label="Remaining Amount"
                  isEnable={fieldEnabled}
                  placeholder="Enter Remaining Amount"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={3} xl={3}>
                <CDatePicker
                  control={method.control}
                  name="saleDate"
                  required={true}
                  isEnable={fieldEnabled}
                  placeholder="Enter sale date"
                  label="Sales Date"
                />
              </FormColumn>
              <FormColumn sm={12} md={12} lg={12} xl={12}>
                <CustomTextInput
                  control={method.control}
                  name="Note"
                  label="Note"
                  isEnable={fieldEnabled}
                  placeholder="Enter note"
                />
              </FormColumn>
            </FormRow>
            <FormRow>
              <Button
                className="mt-2"
                type="submit"
                label={`${isSaleId ? "Edit" : "Add"}`}
                disabled={
                  fieldEnabled ? false : true || addSalesMutation.isPending
                }
              />
            </FormRow>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSales;
