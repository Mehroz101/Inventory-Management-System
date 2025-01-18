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
import ActionsBtns from "../ActionsBtns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPrintingData, SpecificProducts, TransferPrintingToProduct, Transferproduct } from "../../services/Api";
import { formatDate } from "../../utils/CommonFunction";
import { FormColumn, FormRow } from "../layoutComponent";
import CustomTextInput from "../FormComponents/CustomTextInput";
import { Dialog } from "primereact/dialog";
import CDropdown from "../FormComponents/CDropDown";
import { useForm } from "react-hook-form";
import { notify } from "../../utils/notification";
const PrintingDate = [
  {
    id: 1,
    productName: "Product1",
    category: "cat1",
    productSize: "12 x 12",
    supplierName: "supplier name",
    productPrice: 100,
    productQuantity: 10,
    paidAmount: 345,
    reaminingAmount: 200,
    PrintingDate: "12-Dec-2024",
    invoiceNo: 12,
    supplierContact: "03017518822",
    status: "printed",
    Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t ert er  ert ",
  },
  {
    id: 2,
    productName: "Product2",
    category: "cat2",
    productSize: "12 x 12",
    supplierName: "supplier name",
    productPrice: 100,
    productQuantity: 10,
    paidAmount: 345,
    reaminingAmount: 200,
    PrintingDate: "12-Dec-2024",
    invoiceNo: 12,
    supplierContact: "03017518822",
    status: "processing",
    Note: "ls sd sd e fjfkjdoiwifeof ewr  et re t",
  },
];
export default function PrintingTable() {
  // const [printing, setPrinting] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    invoiceNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    supplierName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const queryClient = useQueryClient();
  const [isTransferVisible, setIsTransferVisible] = useState(false);

  const [statuses] = useState(["processing", "printed"]);
  const method = useForm({
    defaultValues: {
      quantity: 0,
      productId: null,
      createdProduct:null,
      // note:"",
    },
  });
  const getSeverity = (status) => {
    switch (status) {
      case "processing":
        return "info";

      case "printed":
        return "success";

      case "renewal":
        return null;
    }
  };

  useEffect(() => {
    // CustomerService.getCustomersMedium().then((data) => {
    //     setCustomers(getCustomers(data));
    //     setLoading(false);
    // });
    // setSales(getCustomers(salesDate))
    // setPrinting(PrintingDate);
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const transferProductMutation = useMutation({
    mutationFn: TransferPrintingToProduct,
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
      // note: data.note,
    });
  };
  const { data: printing } = useQuery({
    queryKey: ["printingData"],
    queryFn: GetPrintingData,
    // enabled:isTransferVisible
  });

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

  const handleEdit = (data) => {
    console.log("Edit clicked for:", data);
    // Custom edit logic here
  };const {data:productsData} = useQuery({
    queryKey:["specificProduct"],
    queryFn:SpecificProducts
  })

  const handleDelete = (data) => {
    console.log("Delete clicked for:", data);
    // Custom delete logic here
  };

  const handleTransfer = (data) => {
    console.log("View clicked for:", data);
    setIsTransferVisible(true)
    method.setValue("productId",data.productId)
    // Custom view logic here
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <ActionsBtns
        rowData={rowData}
        // onEdit={handleEdit}
        // onDelete={handleDelete}
        // onView={handleView}
        onTransfer={handleTransfer}
      />
    );
  };

  const header = renderHeader();
  const snoBodyTemplate = (rowData, options) => {
    return options.rowIndex + 1; // Row index starts from 0, so add 1 for 1-based numbering
  };
  return (
    <div className="card">
      <DataTable
        value={printing}
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
          "supplierName",
        ]}
        header={header}
        emptyMessage="No printing found."
      >
        <Column header="#" body={snoBodyTemplate} />
        <Column header="Action" body={actionBodyTemplate} />
        <Column
          field="productName"
          header="Product Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />

        <Column
          field="inProcessing"
          header="Quantity"
          style={{ minWidth: "11rem" }}
        />

        <Column
          body={(rowData) => {
            console.log(rowData.printingDate);
            return (
              <>
                <span>{formatDate(rowData.printingDate)}</span>
              </>
            );
          }}
          header="Printing Date"
          style={{ minWidth: "11rem" }}
        />

        <Column field="note" header="Note" style={{ minWidth: "14rem" }} />
        {/* <Column
          field="status"
          header="Status"
          showFilterMenu={false}
          filterMenuStyle={{ width: "6rem" }}
          style={{ minWidth: "6rem" }}
          body={statusBodyTemplate}
          filter
          filterElement={statusRowFilterTemplate}
        /> */}
      </DataTable>
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
            {/* <FormColumn>
              <CustomTextInput
                control={method.control}
                name="note"
                label="Note"
                isEnable={true}
                placeholder="Write note"
              />
            </FormColumn> */}
            <Button label="Transfer" type="submit" />
          </FormRow>
        </form>
      </Dialog>
    </div>
    
  );
}
