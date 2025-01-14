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
import { DeleteCategory } from "../../services/Api";
import { confirmDialog } from "primereact/confirmdialog";
import { notify } from "../../utils/notification";
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
export default function CategoryTable({ data, onEditCategory }) {
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Category deleted successfully");
        queryClient.invalidateQueries(["categories"]);
      }
    },
  });

  const handleEdit = (rowData) => {
    onEditCategory(rowData); // Trigger parent's edit dialog
  };

  const handleDelete = (rowData) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteCategoryMutation.mutate({ categoryId: rowData.categoryID }),
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
        globalFilterFields={["category"]}
        emptyMessage="No category found."
      >
        <Column header="#" body={(rowData, options) => options.rowIndex + 1} />
        <Column field="categoryName" header="Category Name" />
        <Column header="Action" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
