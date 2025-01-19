import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { FormColumn, FormRow } from "../components/layoutComponent";
import CustomTextInput from "../components/FormComponents/CustomTextInput";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import CityTable from "../components/tables/CityTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCity, GetCity, UpdateCity } from "../services/Api";
import { notify } from "../utils/notification";
const Cities = () => {
  const [visible, setVisible] = useState(false);
  const [editCity, setEditCity] = useState(null); // For editing a city
  const method = useForm({
    defaultValues: {
      city: "",
    },
  });

  const addCityMutation = useMutation({
    mutationFn: (data) => AddCity(data),
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "City added successfully");
        setVisible(false);
        refetch();
      }
    },
  });

  const editCityMutation = useMutation({
    mutationFn: UpdateCity,
    onSuccess: (data) => {
      if (data.success) {
        notify("success", "City updated successfully");
        setVisible(false);
        setEditCity(null);
        method.reset();

        refetch();
      }
    },
  });

  const onSubmit = (data) => {
    if (editCity) {
      editCityMutation.mutate({
        cityId: editCity.cityID,
        cityName: data.city,
      });
    } else {
      addCityMutation.mutate({ city: data.city });
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cities"],
    queryFn: GetCity,
  });

  const handleEditCity = (city) => {
    setEditCity(city);
    method.setValue("city", city.cityName);
    setVisible(true);
  };

  return (
    <>
      <div className="citypage">
        <div className="page_top flex flex-wrap mb-2">
          <h2>City</h2>
          <button
            className="btn"
            onClick={() => {
              setEditCity(null);
              setVisible(true);
            }}
          >
            New City
          </button>
        </div>
        <div className="all_city">
          <CityTable
            data={data}
            onEditCity={handleEditCity} // Pass edit handler
          />
        </div>
      </div>
      <Dialog
        header={editCity ? "Edit City" : "Add City"}
        visible={visible}
        style={{ maxWidth: "700px" }}
        onHide={() => {
          setVisible(false);
          method.reset();
          setEditCity(null);
        }}
      >
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <FormRow>
            <FormColumn>
              <CustomTextInput
                control={method.control}
                name="city"
                required={true}
                label="City Name"
                isEnable={true}
                placeholder="Enter city name"
              />
            </FormColumn>

            <FormColumn>
              <Button label={editCity ? "Update" : "Add"} type="submit" />
            </FormColumn>
          </FormRow>
        </form>
      </Dialog>
    </>
  );
};

export default Cities;
