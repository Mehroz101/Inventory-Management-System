import React, { useState } from "react";
import SalesTable from "../components/tables/SalesTable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetSales, UpdateSale } from "../services/Api";
import { Dialog } from "primereact/dialog";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import CDatePicker from "../components/FormComponents/CDatePicker";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { notify } from "../utils/notification";

const Sales = () => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const { data: sales, refetch: refetchSales } = useQuery({
    queryKey: ["sales"],
    queryFn: GetSales,
  });
  const method = useForm({
    defaultValues: {
      saleId: null,
      remainingAmount: 0,
      givenAmount: 0,
      updatedDate: null,
    },
  });
  const editSaleMutation = useMutation({
    mutationFn: UpdateSale,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", data.message);
        setVisible(false);
        method.reset();
        refetchSales();
      }
    },
  });
  const onSubmit = (data) => {
    if (method.getValues("remainingAmount") < data.givenAmount) {
      notify(
        "error",
        "remaining amount is " + method.getValues("remainingAmount")
      );
    } else {
      editSaleMutation.mutate({
        saleId: method.getValues("saleId"),
        updatedDate: data.updatedDate,
        givenAmount: parseInt(data.givenAmount),
      });
    }
  };
  const handleEdit = (data) => {
    // navigate(`newsale?id=${data.saleID}`)
    // Custom view logic here
    console.log(data);
    method.setValue("saleId", data.saleID);
    method.setValue("remainingAmount", data.remainingAmount);
    setVisible(true);
  };
  return (
    <>
      <div className="salespage">
        <div className="page_top">
          <h2>Sales</h2>
          <button className="btn" onClick={() => navigate(ROUTES.NEWSALES)}>
            New Sales
          </button>
        </div>
        <div className="all_sales">
          <SalesTable data={sales} handleEdit={handleEdit} />
        </div>
      </div>
      <Dialog
        header={"Update Amount"}
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setVisible(false);
          method.reset();
          setEditSale(null);
        }}
      >
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <FormRow>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="remainingAmount"
                label="Total Receivable"
                isEnable={false}
                type="number"
                placeholder="Enter sale name"
              />
            </FormColumn>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="givenAmount"
                required={true}
                label="Given Amount"
                isEnable={true}
                type="number"
                placeholder="Enter sale name"
              />
            </FormColumn>
            <FormColumn sm={12} md={12} lg={12} xl={12}>
              <CDatePicker
                control={method.control}
                name="updatedDate"
                required={true}
                isEnable={true}
                placeholder="Enter paying date"
                label="Pay Date"
              />
            </FormColumn>
            <FormColumn>
              <Button label="Pay" type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default Sales;
