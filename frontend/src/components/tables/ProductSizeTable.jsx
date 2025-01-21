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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProductSize } from "../../services/Api";
import { confirmDialog } from "primereact/confirmdialog";
import { notify } from "../../utils/notification";

export default function ProductSizeTable({ data, onEditProductSize }) {
  const queryClient = useQueryClient();

  const deleteProductSizeMutation = useMutation({
    mutationFn: DeleteProductSize,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Product Size deleted successfully");
        queryClient.invalidateQueries(["productsizes"]);
      }
    },
  });

  const handleEdit = (rowData) => {
    onEditProductSize(rowData); // Trigger parent's edit dialog
  };

  const handleDelete = (rowData) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteProductSizeMutation.mutate({ productSizeId: rowData.productSizeID }),
    });
  };

  const actionBodyTemplate = (rowData) => (
    <ActionsBtns
      rowData={rowData}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );

  return (
    <div className="card">
      <DataTable
        value={data}
        paginator
        rows={10}
        dataKey="id"
        globalFilterFields={["productSize"]}
        emptyMessage="No product size found."
      >
        <Column header="#" body={(rowData, options) => options.rowIndex + 1} />
        <Column field="productSizeName" header="ProductSize Name" />
        <Column header="Action" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
