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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct } from "../../services/Api";

export default function ProductsTable({ data, onEditProduct }) {
  const [products, setProducts] = useState(data);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(data);
    setLoading(false);
  }, [ data]);

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
        queryClient.invalidateQueries(["products"]);
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
        accept: () => deleteProductMutation.mutate({ productId: rowData.productID }),
    });
  };

  const handleView = (rowData) => {
    console.log("View clicked for:", rowData);
    // Custom view logic here
  };

  const actionBodyTemplate = (rowData) => (
    <ActionsBtns
      rowData={rowData}
      onEdit={handleEdit}
      onDelete={handleDelete}
      // onView={handleView}
    />
  );

  const snoBodyTemplate = (rowData, options) => options.rowIndex + 1;

  const header = renderHeader();

  return (
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
        <Column
          header="Action"
          body={actionBodyTemplate}
          style={{ maxWidth: "140px" }}
        />
      </DataTable>
    </div>
  );
}
