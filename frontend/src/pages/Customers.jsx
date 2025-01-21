import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CustomerTable from "../components/tables/CustomerTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCustomer, GetCustomer, UpdateCustomer } from "../services/Api";
import { notify } from "../utils/notification";
const Customers = () => {
  const [visible, setVisible] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null); // For editing a customer
  const method = useForm({
    defaultValues: {
      customer: "",
    },
  });

  const addCustomerMutation = useMutation({
    mutationFn: (data) => AddCustomer(data),
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Customer added successfully");
        setVisible(false);
        method.reset();
        refetch();
      }
    },
  });

  const editCustomerMutation = useMutation({
    mutationFn: UpdateCustomer,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Customer updated successfully");
        setVisible(false);
        setEditCustomer(null);
        method.reset();
        refetch();
      }
    },
  });

  const onSubmit = (data) => {
    if (editCustomer) {
      editCustomerMutation.mutate({
        customerId: editCustomer.customerID,
        customerName: data.customer,
      });
    } else {
      addCustomerMutation.mutate({ customer: data.customer });
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCustomer,
  });

  const handleEditCustomer = (customer) => {
    setEditCustomer(customer);
    method.setValue("customer", customer.customerName);
    setVisible(true);
  };

  return (
    <>
      <div className="customerpage">
        <div className="page_top flex flex-wrap mb-2">
          <h2>Customer</h2>
          <button
            className="btn"
            onClick={() => {
              setEditCustomer(null);
              setVisible(true);
            }}
          >
            New Customer
          </button>
        </div>
        <div className="all_customer">
          <CustomerTable
            data={data}
            onEditCustomer={handleEditCustomer} // Pass edit handler
          />
        </div>
      </div>
      <Dialog
        header={editCustomer ? "Edit Customer" : "Add Customer"}
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setVisible(false);
          method.reset();
          setEditCustomer(null);
        }}
      >
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <FormRow>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="customer"
                required={true}
                label="Customer Name"
                isEnable={true}
                placeholder="Enter customer name"
              />
            </FormColumn>

            <FormColumn>
              <Button label={editCustomer ? "Update" : "Add"} type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default Customers;
