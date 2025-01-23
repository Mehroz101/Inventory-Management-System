import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useForm } from "react-hook-form";
import { FormColumn, FormLabel, FormRow } from "./layoutComponent";
import CDatePicker from "./FormComponents/CDatePicker";
import { Button } from "primereact/button";
import { useMutation } from "@tanstack/react-query";
import { generateReport } from "../services/Api";
import { notify } from "../utils/notification";

function Report() {
  const [reportData, setReportData] = useState(null); // State to store report data

  const generatePDF = () => {
    try {
      console.log(reportData);
      if (!reportData) return; // Ensure there is data to generate PDF
      console.log("entered");
      const doc = new jsPDF();

      // Company Details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Webtech Inventory Solutions", 10, 20);
      doc.setFontSize(12);
      doc.text("Multan Cantt Punjab, Pakistan", 10, 30);
      doc.text(
        "Phone: +92-322-6671168 | Email: webtechssoultion@gmail.com",
        10,
        40
      );
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(10, 45, 200, 45);

      // Helper function to add tables
      const addTable = (title, data, yPosition) => {
        doc.setFontSize(14);
        doc.text(title, 10, yPosition);
        doc.autoTable({
          head: [data[0]], // Table Headers
          body: data.slice(1), // Table Body
          startY: yPosition + 5,
          theme: "grid",
          headStyles: { fillColor: [22, 160, 133] }, // Header background
          alternateRowStyles: { fillColor: [240, 248, 255] }, // Alternate row color
        });
      };
      console.log("near to generate");

      // Add Inventory Tables
      if (reportData.productStock && reportData.productStock.length > 0) {
        const productStockData = [
          ["Product Name", "Total Quantity", "Processing Quantity"],
          ...reportData.productStock.map((item) => [
            item.productName,
            item.quantity,
            item.inProcessing,
          ]),
        ];
        addTable("Product Stock", productStockData, 50);
      }

      if (reportData.purchases && reportData.purchases.length > 0) {
        const purchasesData = [
          [
            "Product Name",
            "Quantity",
            "Supplier Name",
            "Supplier Contact",
            "City",
            "Purchase Amount",
            "Paid Amount",
            "Remaining Amount",
            "Purchase Date",
            "Status",
          ],
          ...reportData.purchases.map((item) => [
            item.productName,
            item.productQuantity,
            item.supplierName,
            item.supplierContact,
            item.cityName,
            item.productPrice,
            item.paidAmount,
            item.remainingAmount,
            item.purchaseDate,
            item.status,
          ]),
        ];
        addTable("Purchases", purchasesData, doc.lastAutoTable.finalY + 10);
      }

      if (reportData.sales && reportData.sales.length > 0) {
        const salesData = [
          [
            "Product Name",
            "Quantity",
            "Customer Name",
            "Customer Contact",
            "City",
            "Purchase Amount",
            "Paid Amount",
            "Remaining Amount",
            "Sale Date",
            "Status",
          ],
          ...reportData.sales.map((item) => [
            item.productName,
            item.productQuantity,
            item.customerName,
            item.customerContact,
            item.cityName,
            item.productPrice,
            item.paidAmount,
            item.remainingAmount,
            item.saleDate,
            item.status,
          ]),
        ];
        addTable("Sales", salesData, doc.lastAutoTable.finalY + 10);
      }
      // Save PDF

      doc.save("Inventory_Report.pdf");
      notify("success", "Report generated successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const method = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const generateReportMutation = useMutation({
    mutationFn: generateReport,
    onSuccess: (data) => {
      if (data.success) {
        setReportData(data.data); // Store the report data
        // notify("success", "Report generated successfully");
      }
    },
  });
  useEffect(() => {
    if (generateReportMutation.isSuccess && reportData) {
      generatePDF(); // Generate PDF after data is received
    }
  }, [generateReportMutation.isSuccess, reportData]);
  const onsubmit = (data) => {
    console.log(data);
    generateReportMutation.mutate({
      startDate: data.startDate,
      endDate: data.endDate,
    });
  };

  return (
    <>
      <div className="top">
        <h2>Generate Report of Payable and Receivable</h2>
      </div>
      <form onSubmit={method.handleSubmit(onsubmit)}>
        <FormRow className="flex align-content-end">
          <FormColumn sm={12} md={4} lg={3} xl={3}>
            <CDatePicker
              control={method.control}
              name="startDate"
              isEnable={true}
              placeholder="Enter start date"
              label="Start Date"
            />
          </FormColumn>
          <FormColumn sm={12} md={4} lg={3} xl={3}>
            <CDatePicker
              control={method.control}
              name="endDate"
              isEnable={true}
              placeholder="Enter end date"
              label="End Date"
            />
          </FormColumn>
          <FormColumn sm={12} md={4} lg={3} xl={3} className="flex ">
            <Button
              label="Generate Report"
              type="submit"
              className="align-self-end"
            />
          </FormColumn>
        </FormRow>
      </form>
    </>
  );
}

export default Report;
