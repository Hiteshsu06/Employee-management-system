import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./UserTable.css";

const UserTable = ({
  tableData,
  loader,
  actionBodyTemplate,
  imageBodyTemplate,
}) => {
  return (
    <div>
      <DataTable
        value={tableData}
        showGridlines
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "40rem", marginTop: "100px" }}
        loading={loader}
      >
        <Column field="name" header="Name"></Column>
        <Column field="image" header="Image" body={imageBodyTemplate}></Column>
        <Column field="email" header="Email"></Column>
        <Column field="address" header="Address"></Column>
        <Column field="salary.annual_package" header="Salary"></Column>
        <Column
          field="action"
          header="Actions"
          body={actionBodyTemplate}
        ></Column>
      </DataTable>
    </div>
  );
};

export default UserTable;
