"use client";
import BxTabs from "../BxTabs";
import EmployeeRoles from "./EmployeeRoles";
import Employees from "./Employees";

const EmployeeManagement = () => {
  return (
    <div className="border rounded-md p-4">
      <BxTabs
        defaultValue="employees"
        tabs={[
          {
            label: "Employees",
            value: "employees",
            content: <Employees />,
          },
          {
            label: "Employee Roles",
            value: "employee-roles",
            content: <EmployeeRoles />,
          },
        ]}
      />
    </div>
  );
};

export default EmployeeManagement;
