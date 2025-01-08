import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEye,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParams } from "../../utils/CommonFunction";
const PurchaseData = [
  {
    id: 1,
    saleId:23,
    productName: "Product1",
    category: "cat1",
    productSize: "12 x 12",
    customerName: "supplier name",
    productPrice: 100,
    productQuantity: 10,
    paidAmount: 345,
    reaminingAmount: 200,
    soldDate: "12-Dec-2024",
    invoiceNo: 12,
    customerContact: "03017518822",
    status: "paid",
    Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t ert er  ert ",
  },
  {
    id: 2,
    saleId:20,
    productName: "Product2",
    category: "cat2",
    productSize: "12 x 12",
    customerName: "supplier name",
    productPrice: 100,
    productQuantity: 10,
    paidAmount: 345,
    reaminingAmount: 200,
    soldDate: "12-Dec-2024",
    invoiceNo: 12,
    customerContact: "03017518822",
    status: "unpaid",
    Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t",
  },
];
export default function SalesTable() {
  const [purchases, setPurchases] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    customerName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const [statuses] = useState(["unpaid", "paid"]);

  const getSeverity = (status) => {
    switch (status) {
      case "unpaid":
        return "danger";

      case "paid":
        return "success";

      case "renewal":
        return null;
    }
  };
  const location = useLocation();
  const { saleId } = getQueryParams(location.search);
// useEffect(()=>{},[saleId])
  useEffect(() => {
    console.log("saleId")
    console.log(saleId)
    setPurchases(PurchaseData);
    setLoading(false);
  }, [saleId]); // eslint-disable-line react-hooks/exhaustive-deps


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

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <div className="actionbtn flex justify-content-center align-content-center gap-1">
          <Button
            icon={() => (
              <FontAwesomeIcon
                icon={faPencil}
                onClick={() => {
                    console.log("call",rowData)
                  navigate(`/sales/newsales?saleId=${rowData.saleId}`);
                }}
              />
            )}
            className="p-button p-button-success mr-2"
          />
          <Button
            icon={() => <FontAwesomeIcon icon={faTrash} />}
            className="p-button p-button-danger mr-2"
          />
          <Button
            icon={() => <FontAwesomeIcon icon={faEye} />}
            className="p-button p-button-info mr-2"
          />
        </div>
      </>
    );
  };
  const header = renderHeader();
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  return (
    <div className="card">
      <DataTable
        value={purchases}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          "invoiceNo",
          "productName",
          "category",
          "customerName",
        ]}
        header={header}
        emptyMessage="No purchases found."
      >
        <Column header="#" body={snoBodyTemplate} />
        <Column header="Action" body={actionBodyTemplate} />
        <Column
          field="invoiceNo"
          header="Invoice No"
          filter
          style={{ minWidth: "10rem" }}
          filterPlaceholder="Search by name"
        />
        <Column
          field="productName"
          header="Product Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="customerName"
          header="Customer Name"
          filter
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          filterPlaceholder="Search by name"
        />
        <Column
          field="category"
          header="category"
          filter
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "14rem" }}
          filterPlaceholder="Search by name"
        />
        <Column
          field="productSize"
          header=" Size"
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="productPrice"
          header="Product Price"
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="productQuantity"
          header="Quantity"
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="paidAmount"
          header="Paid Amount"
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="reaminingAmount"
          header="Remaining Amount"
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="soldDate"
          header="Sold Date"
          style={{ minWidth: "11rem" }}
        />
        <Column
          field="customerContact"
          header="Customer Contact"
          style={{ minWidth: "11rem" }}
        />
        <Column field="Note" header="Note" style={{ minWidth: "14rem" }} />
        <Column
          field="status"
          header="Status"
          showFilterMenu={false}
          filterMenuStyle={{ width: "6rem" }}
          style={{ minWidth: "6rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusRowFilterTemplate}
        />
      </DataTable>
    </div>
  );
}
