import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react'
import { FormColumn, FormRow } from '../components/layoutComponent';
import CustomTextInput from '../components/FormComponents/CustomTextInput';
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CategoryTable from '../components/tables/CategoryTable';

const Categories = () => {
    // const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const method = useForm({
      defaultValues:{
          category:""
      }})
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
          <CategoryTable />
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
            <Button
            label="Add"
            />
          </FormColumn>
        </FormRow>
      </Dialog>
    </>
  )
}

export default Categories