import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CategoryTable from "../components/tables/CategoryTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCategory, GetCategory } from "../services/Api";

const Categories = () => {
  // const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const method = useForm({
    defaultValues: {
      category: "",
    },
  });
  const addCategoryMutation = useMutation({
    mutationFn: (data) => AddCategory(data),
  });
  const onsubmit = (data) => {
    console.log(data);
    addCategoryMutation.mutate({ category: data.category });
  };
  const data = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategory,
  });
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  return (
    <>
      <div className="categorypage">
        <div className="page_top">
          <h2>category</h2>
          <button
            className="btn"
            onClick={() => {
              setVisible(true);
            }}
          >
            New category
          </button>
        </div>
        <div className="all_category">
          <CategoryTable data={data} />
        </div>
      </div>
      <Dialog
        header="Add Category"
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form onSubmit={method.handleSubmit(onsubmit)}>
          <FormRow>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="category"
                required={true}
                label="Category Name"
                isEnable={true}
                placeholder="Enter category name"
              />
            </FormColumn>
            <FormColumn>
              <Button label="Add" type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default Categories;
