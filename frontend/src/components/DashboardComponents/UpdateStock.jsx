import React from 'react'
import CDropdown from '../FormComponents/CDropDown'
import { useForm } from 'react-hook-form';
import NumberInput from '../FormComponents/CNumberInput';

const UpdateStock = () => {
    const method = useForm({
        productId: 0,
        CustomerName: "",
        Quantity: 0,
      });
    const productsData = [
        {
          label: "Product1",
          value: 1,
        },
        {
          label: "Product2",
          value: 2,
        },
        {
          label: "Product3",
          value: 3,
        },
      ];
      const onsubmit = (data) => {
        console.log(data);
      };
  return (
    <>
        <div className="updatestock_container container w-full">
        <h3 className="container_title">Update Stock</h3>

            <form onSubmit={method.handleSubmit(onsubmit)}>
            <div className="input_box">
            
            <CDropdown
              control={method.control}
              name={"productId"}
              optionLabel="label"
              optionValue="value"
              options={productsData}
              required={true}
              label="Product"
              placeholder="Select product"
            />
          </div>
          <div className="input_box">
            <NumberInput
              control={method.control}
              label="Quantity"
              name="Quantity"
              required={true}
              placeholder="Enter quantity"
              rules={{ require: true }}
            />
          </div>
          <div className="btn">
            <button type="submit">Update</button>
          </div>
            </form>
        </div>
    </>
  )
}

export default UpdateStock