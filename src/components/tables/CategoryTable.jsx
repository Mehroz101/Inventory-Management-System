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
import ActionsBtns from "../ActionsBtns";
const PurchaseData = [
  {
    id: 1,
    // productName: "Product1",
    category: "cat1",
    // categorySize: "12 x 12",
    // productPrice: 100,
    // Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t ert er  ert ",
  },
  {
    id: 2,
    // productName: "Product1",
    category: "cat1",
    // categorySize: "12 x 12",
    // productPrice: 100,
    // Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t ert er  ert ",
  },
];
export default function CategoryTable() {
  const [category, setCatogory] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const [statuses] = useState(["unpaid", "paid"]);

  const location = useLocation();
  const { saleId } = getQueryParams(location.search);
  useEffect(() => {
    setCatogory(PurchaseData);
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
  const handleEdit = (data) => {
    console.log('Edit clicked for:', data);
    // Custom edit logic here
  };

  const handleDelete = (data) => {
    console.log('Delete clicked for:', data);
    // Custom delete logic here
  };

  const handleView = (data) => {
    console.log('View clicked for:', data);
    // Custom view logic here
  };
  const actionBodyTemplate = (rowData) => {
    return (
     <ActionsBtns
         rowData={rowData}
         onEdit={handleEdit}
         onDelete={handleDelete}
         onView={handleView}
       />
    )
   };
  const header = renderHeader();
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  return (
    <div className="card">
      <DataTable
        value={category}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["category"]}
        header={header}
        emptyMessage="No category found."
      >
        <Column header="#" body={snoBodyTemplate} />
        <Column header="Action" body={actionBodyTemplate} style={{maxWidth:"140px"}} />
        <Column field="category" header="Category Name" filter />
        {/* <Column field="category" header="Category"  />
        <Column field="categoryize" header="Product Size"  />
        <Column field="productPrice" header="Product Price"  /> */}
      </DataTable>
    </div>
  );
}
