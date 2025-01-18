import React, { useEffect, useState } from "react";
import { DatePicker } from "antd"; // Ant Design for date picker
import jsPDF from "jspdf"; // For PDF export
import "jspdf-autotable"; // For tables in PDF
import "./Reports.css";

const { RangePicker } = DatePicker;

const ReportPage = () => {
  // Mock Data for Testing
  const mockReport = {
    totalExpenses: 5000,
    totalDues: 1200,
    customerDues: [
      { name: "Customer A", dueAmount: 500, overdueDays: 10 },
      { name: "Customer B", dueAmount: 700, overdueDays: 5 },
    ],
    creditPayments: [
      { name: "Supplier A", creditAmount: 2000 },
      { name: "Supplier B", creditAmount: 1500 },
    ],
    inventory: [
      { _id: "Product 1", totalQuantity: 50 },
      { _id: "Product 2", totalQuantity: 100 },
    ],
    totalRevenue: 15000,
    profit: 8000,
  };

  const [report, setReport] = useState(mockReport); // Defaulting to mock data
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchReport = () => {
    const queryParams = {};
    if (startDate) queryParams.startDate = startDate;
    if (endDate) queryParams.endDate = endDate;

    // Uncomment the following to fetch data from backend when ready
    /*
    axios
      .get("/api/report/summary", { params: queryParams })
      .then((response) => setReport(response.data))
      .catch((error) => console.error("Error fetching report:", error));
    */
  };

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Business Summary Report", 10, 10);

    if (report) {
      // Add Total Expenses and Dues
      doc.text(`Total Expenses: ${report.totalExpenses}`, 10, 20);
      doc.text(`Remaining Dues: ${report.totalDues}`, 10, 30);

      // Add Customer Dues with Overdue Days
      doc.text("Customer Dues:", 10, 40);
      const customerRows = report.customerDues.map((customer) => [
        customer.name,
        customer.dueAmount,
        customer.overdueDays,
      ]);
      doc.autoTable({
        head: [["Customer Name", "Due Amount", "Overdue Days"]],
        body: customerRows,
        startY: 50,
      });

      // Add Credit Payments
      doc.text("Credit Payments:", 10, 100);
      const creditRows = report.creditPayments.map((payment) => [
        payment.name,
        payment.creditAmount,
      ]);
      doc.autoTable({
        head: [["Supplier Name", "Credit Amount"]],
        body: creditRows,
        startY: 110,
      });

      // Add Inventory
      doc.text("Inventory Status:", 10, 150);
      const inventoryRows = report.inventory.map((item) => [
        item._id,
        item.totalQuantity,
      ]);
      doc.autoTable({
        head: [["Product Name", "Total Quantity"]],
        body: inventoryRows,
        startY: 160,
      });

      // Add Revenue and Profit
      doc.text(`Total Revenue: ${report.totalRevenue}`, 10, 200);
      doc.text(`Profit: ${report.profit}`, 10, 210);
    }

    doc.save("Business_Summary_Report.pdf");
  };

  return (
    <div className="report-page">
      <h2>Business Summary Report</h2>

      {/* Filters */}
      <div className="filters">
        <label>Select Date Range: </label>
        <RangePicker
          onChange={(dates) => {
            setStartDate(dates[0] ? dates[0].format("YYYY-MM-DD") : null);
            setEndDate(dates[1] ? dates[1].format("YYYY-MM-DD") : null);
          }}
        />
        <button className="btn-refresh" onClick={fetchReport}>
          Refresh
        </button>
      </div>

      {/* Report Content */}
      {report ? (
        <div>
          <div className="report-section">
            <h3>Total Expenses</h3>
            <p>Total Payment: {report.totalExpenses}</p>
            <p>Remaining Dues: {report.totalDues}</p>
          </div>

          <div className="report-section">
            <h3>Remaining Dues</h3>
            <ul>
              {report.customerDues.map((customer, index) => (
                <li key={index}>
                  {customer.name}: {customer.dueAmount} (Overdue:{" "}
                  {customer.overdueDays} days)
                </li>
              ))}
            </ul>
          </div>

          <div className="report-section">
            <h3>Credit Payments</h3>
            <ul>
              {report.creditPayments.map((payment, index) => (
                <li key={index}>
                  {payment.name}: {payment.creditAmount}
                </li>
              ))}
            </ul>
          </div>

          <div className="report-section">
            <h3>Inventory Status</h3>
            <ul>
              {report.inventory.map((item, index) => (
                <li key={index}>
                  {item._id}: {item.totalQuantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="report-section">
            <h3>Revenue and Profit</h3>
            <p>Total Revenue: {report.totalRevenue}</p>
            <p>Profit: {report.profit}</p>
          </div>

          <button className="btn-export" onClick={exportToPDF}>
            Export to PDF
          </button>
        </div>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default ReportPage;
