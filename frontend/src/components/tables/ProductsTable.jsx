import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useNavigate } from "react-router-dom";
import { getQueryParams } from "../../utils/CommonFunction";
import ActionsBtns from "../ActionsBtns";
import { confirmDialog } from "primereact/confirmdialog";
import { notify } from "../../utils/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct, SpecificProducts, Transferproduct } from "../../services/Api";
import { Tag } from "primereact/tag";
import { FormColumn, FormRow } from "../layoutComponent";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CustomTextInput from "../FormComponents/CustomTextInput";
import CDropdown from "../FormComponents/CDropDown";

export default function ProductsTable({ data, onEditProduct }) {
  const [products, setProducts] = useState(data);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const queryClient = useQueryClient();
  const [isTransferVisible, setIsTransferVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const method = useForm({
    defaultValues: {
      quantity: 0,
      productId: null,
      createdProduct:null,
      note:"",
    },
  });
  useEffect(() => {
    setProducts(data);
    setLoading(false);
  }, [data]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const handleEdit = (rowData) => {
    onEditProduct(rowData); // Trigger parent's edit dialog or action
  };
  const deleteProductMutation = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Product deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      }
    },
  });
  const handleDelete = (rowData) => {
    confirmDialog({
      message: "Do you want to delete this product?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () =>
        deleteProductMutation.mutate({ productId: rowData.productID }),
    });
  };
  const transferProductMutation = useMutation({
    mutationFn: Transferproduct,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        setIsTransferVisible(false);
        method.reset();
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } else {
      }
    },
  });
  const onsubmit = (data) => {
    console.log(data);
    transferProductMutation.mutate({
      productId: method.getValues("productId"),
      transferQuantity: parseInt(data.quantity),
      createdProduct: data.createdProduct,
      note: data.note,
    });
  };
  const handleTransfer = (rowData) => {
    console.log("View clicked for:", rowData);
    // Custom view logic here
    method.setValue("productId", parseInt(rowData.productID));
    setIsTransferVisible(true);
  };
const {data:productsData} = useQuery({
  queryKey:["specificProduct"],
  queryFn:SpecificProducts
})
  const actionBodyTemplate = (rowData) => (
    <ActionsBtns
      rowData={rowData}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onTransfer={rowData.isRawData === true ? handleTransfer : null}
      // onView={handleView}
    />
  );
  const RawDataStatusTemplate = (rowData) => (
    <>
      <Tag
        severity={rowData.isRawData === true ? "warning" : "success"}
        value={rowData.isRawData === true ? "Raw" : "Product"}
      ></Tag>
    </>
  );

  const snoBodyTemplate = (rowData, options) => options.rowIndex + 1;

  const header = renderHeader();

  return (
    <>
      <div className="card">
        <DataTable
          value={products}
          paginator
          rows={10}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          globalFilterFields={["productName"]}
          header={header}
          // rowClassName={(rowData)=>{
          //   return rowData.isRawData === true ? "rawDataLine":"productDataLine"
          // }}
          emptyMessage="No products found."
        >
          <Column header="#" body={snoBodyTemplate} />
          <Column
            field="productName"
            header="Product Name"
            filter
            style={{ minWidth: "240px" }}
          />
          <Column field="quantity" header="Quantity" />
          <Column field="inProcessing" header="Printing Dept Quantity" />
          <Column body={RawDataStatusTemplate} header="RawData" />
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{ maxWidth: "140px" }}
          />
        </DataTable>
      </div>
      <Dialog
        header={"Tranfer Product"}
        visible={isTransferVisible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setIsTransferVisible(false);
          method.reset();
          // isTransferVisible(null);
        }}
      >
        <form onSubmit={method.handleSubmit(onsubmit)}>
          <FormRow>
            <FormColumn>
            <CDropdown
              control={method.control}
              name={"createdProduct"}
              optionLabel="productName"
              optionValue="productID"
              options={productsData}
              required={true}
              label="Created Product"
              placeholder="Select product"
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
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="note"
                label="Note"
                isEnable={true}
                placeholder="Write note"
              />
            </FormColumn>
            <Button label="Transfer" type="submit" />
          </FormRow>
        </form>
      </Dialog>
    </>
  );
}
