import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CategoryTable from "../components/tables/CategoryTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCategory, GetCategory, UpdateCategory } from "../services/Api";
import { notify } from "../utils/notification";
const Categories = () => {
  const [visible, setVisible] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // For editing a category
  const method = useForm({
    defaultValues: {
      category: "",
    },
  });

  const addCategoryMutation = useMutation({
    mutationFn: (data) => AddCategory(data),
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Category added successfully");
        setVisible(false);
        refetch();
      }
    },
  });

  const editCategoryMutation = useMutation({
    mutationFn: UpdateCategory,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "Category updated successfully");
        setVisible(false);
        setEditCategory(null);
        refetch();
      }
    },
  });

  const onSubmit = (data) => {
    if (editCategory) {
      editCategoryMutation.mutate({
        categoryId: editCategory.categoryID,
        categoryName: data.category,
      });
    } else {
      addCategoryMutation.mutate({ category: data.category });
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategory,
  });

  const handleEditCategory = (category) => {
    setEditCategory(category);
    method.setValue("category", category.categoryName);
    setVisible(true);
  };

  return (
    <>
      <div className="categorypage">
        <div className="page_top flex flex-wrap mb-2">
          <h2>Category</h2>
          <button
            className="btn"
            onClick={() => {
              setEditCategory(null);
              setVisible(true);
            }}
          >
            New Category
          </button>
        </div>
        <div className="all_category">
          <CategoryTable
            data={data}
            onEditCategory={handleEditCategory} // Pass edit handler
          />
        </div>
      </div>
      <Dialog
        header={editCategory ? "Edit Category" : "Add Category"}
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setVisible(false);
          method.reset();
          setEditCategory(null);
        }}
      >
        <form onSubmit={method.handleSubmit(onSubmit)}>
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
              <Button label={editCategory ? "Update" : "Add"} type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default Categories