import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import CDropdown from "../components/FormComponents/CDropDown";
import { FormColumn, FormRow } from "../components/layoutComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddPurchase,
  GetCategory,
  GetCity,
  GetProduct,
  GetPurchaseData,
} from "../services/Api";
import { Button } from "primereact/button";
import { notify } from "../utils/notification";
import { useLocation, useNavigate } from "react-router-dom";
import CDatePicker from "../components/FormComponents/CDatePicker";
import { formatDate } from "../utils/CommonFunction";
const NewPurchase = () => {
  const location = useLocation();
  const [fieldEnabled,setFieldEnabled]= useState(true)
 const [ispurchaseId,setIsPurchaseId] = useState(null) // Get the ID from the query parameters
  const { data: editPurchaseData } = useQuery({
    queryKey: ["editPurchaseData"],
    queryFn: () => GetPurchaseData(ispurchaseId),
    enabled: ispurchaseId ? true : false,
  });
  const method = useForm({
    defaultValues: {
      purchaseId:null,
      invoiceNo: 0,
      productId: null,
      productName: "",
      categoryId: null,
      categoryName: "",
      cityId: null,
      cityName: "",
      productPrice: 0,
      supplierName: "",
      supplierContact: "",
      productQuantity: 0,
      paidAmount: 0,
      remainingAmount: 0,
      purchaseDate: null,
      Note: "",
    },
  });
  const navigate = useNavigate();
  const addPurchasesMutation = useMutation({
    mutationFn: AddPurchase,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        navigate("/purchases");
      }
    },
    onError: () => {
      notify("error", "Purchase not made");
    },
  });
  const onsubmit = (data) => {
    addPurchasesMutation.mutate({
      productId: data.productId,
      productName: data.productName,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      cityId: data.cityId,
      cityName: data.cityName,
      productPrice: parseInt(data.productPrice),
      supplierName: data.supplierName,
      supplierContact: data.supplierContact,
      productQuantity: parseInt(data.productQuantity),
      paidAmount: parseInt(data.paidAmount),
      remainingAmount: parseInt(data.remainingAmount),
      purchaseDate: formatDate(data.purchaseDate),
      Note: data.Note,
      purchaseId:method.getValues("purchaseId")
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
 useEffect(()=>{
  if(editPurchaseData && ispurchaseId){
    setFieldEnabled(false)
    method.setValue("purchaseId",editPurchaseData.purchaseID)
    method.setValue("invoiceNo",editPurchaseData.invoiceNo)
    method.setValue("productId",editPurchaseData.productId)
    method.setValue("productName",editPurchaseData.productName)
    method.setValue("categoryId",editPurchaseData.categoryId)
    method.setValue("categoryName",editPurchaseData.categoryName)
    method.setValue("cityId",editPurchaseData.cityId)
    method.setValue("cityName",editPurchaseData.cityName)
    method.setValue("supplierName",editPurchaseData.supplierName)
    method.setValue("supplierContact",editPurchaseData.supplierContact)
    method.setValue("productPrice",editPurchaseData.productPrice)
    method.setValue("productQuantity",editPurchaseData.productQuantity)
    method.setValue("paidAmount",editPurchaseData.paidAmount)
    method.setValue("remainingAmount",editPurchaseData.remainingAmount)
    method.setValue("purchaseDate",new Date(editPurchaseData.purchaseDate))
    method.setValue("Note",editPurchaseData.Note)
  }
 },[editPurchaseData,ispurchaseId])
 useEffect(()=>{
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  setIsPurchaseId(id)
 },[ispurchaseId])
  return (
    <>
      <div className="newpurchases">
        <div className="page_top">
          <h2>{ispurchaseId? "View":"New"} PURCHASES</h2>
          {/* {ispurchaseId && (
            <button className="btn" onClick={()=>setFieldEnabled(true)}>
            Enable
          </button>
          )} */}
          
        </div>

        <div className="newpurchases_container">
          <form onSubmit={method.handleSubmit(onsubmit)}>
            <FormRow className="flex">
              <FormColumn sm={12} md={2} lg={2} xl={2}>
                <CustomTextInput
                  control={method.control}
                  name="invoiceNo"
                  required={true}
                  label="Invoice No"
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
                  disabled={fieldEnabled?false:true}
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
                  disabled={fieldEnabled?false:true}

                  label="Category"
                  optionLabel="categoryName"
                  optionValue="categoryID"
                  placeholder="Select category"
                  onChange={(e) => {
                    method.setValue("categoryId", e.value);
                    method.setValue("categoryName", e.label);
                  }}
                  options={category}
                />
                </FormColumn>
              <FormColumn sm={12} md={5} lg={3} xl={3}>
                <CDropdown
                  control={method.control}
                  name="cityId"
                  required={true}
                  disabled={fieldEnabled?false:true}

                  label="City"
                  optionLabel="cityName"
                  optionValue="cityID"
                  placeholder="Select city"
                  onChange={(e) => {
                    method.setValue("cityId", e.value);
                    method.setValue("cityName", e.label);
                  }}
                  options={city}
                />
              </FormColumn>
              {/* <FormColumn sm={12} md={6} lg={2} xl={2}>
                <CDropdown
                  control={method.control}
                  name="productSize"
                  required={true}
                  label="Product Size"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select size"
                  options={productSize}
                />
              </FormColumn> */}
              <FormColumn sm={12} md={7} lg={3} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="supplierName"
                  required={true}
                  label="Supplier Name"
                  isEnable={fieldEnabled}
                  placeholder="Enter supplier name"
                />
              </FormColumn>
              <FormColumn sm={12} md={4} lg={3} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="supplierContact"
                  label="Supplier Contact"
                  isEnable={fieldEnabled}
                  placeholder="Enter supplier contact"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="productPrice"
                  required={true}
                  label="Product Price"
                  isEnable={fieldEnabled}
                  type="number"
                  placeholder="Enter price"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={4} xl={3}>
                <CustomTextInput
                  control={method.control}
                  name="productQuantity"
                  required={true}
                  label="product Quantity"
                  isEnable={fieldEnabled}
                  type="number"
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
                  label="Remaining Amount"
                  isEnable={fieldEnabled}
                  type="number"
                  placeholder="Enter Remaining Amount"
                />
              </FormColumn>
              <FormColumn sm={6} md={4} lg={3} xl={3}>
                <CDatePicker
                  control={method.control}
                  name="purchaseDate"
                  required={true}
                  isEnable={fieldEnabled}
                  placeholder="Enter purchase date"
                  label="Purchase Date"
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
              <Button type="submit" className="mt-2" label={`${ispurchaseId? "Edit":"Add"}`}  disabled={fieldEnabled?false:true || addPurchasesMutation.isPending} />
            </FormRow>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPurchase;
