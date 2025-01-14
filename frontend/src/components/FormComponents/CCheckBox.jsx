import { Checkbox } from "primereact/checkbox";
import React from "react";
import { Controller } from "react-hook-form";

const CCheckBox = ({
  control,
  name,
  required=false,
  defaultValue = "",
  label = "",
  isEnable = true,
  errorMessage = "This field is required!",
  showErrorMessage = true,
  autoFocus = false,
  ...props
}) => {
  return (
    <>
      <div className="custom-input-container">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={required ? { required: errorMessage } : {}}
          render={({ field, fieldState: { error } }) => (
            <>
               <label htmlFor={field.name} className={`custom-label `}>
              {label}
              {required && <span className="text-red-700 fw-bold ">*</span>}
            </label>
              <Checkbox
                {...field}
                id={field.name}
                name={field.name}
                checked={field.value}
                disabled={!isEnable}
                autoFocus={autoFocus}
              />
              {showErrorMessage && error && (
                <span className="error-message">{errorMessage}</span>
              )}
            </>
          )}
        />
      </div>
    </>
  );
};

export default CCheckBox;
