"use client";
import { useState } from "react";
import BxTabs from "../BxTabs";
import EmployeeRoles from "./EmployeeRoles";
import Employees from "./Employees";

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="border rounded-md p-4">
      <BxTabs
        value={activeTab}
        onValueChange={setActiveTab}
        tabs={[
          {
            label: "employees",
            value: "employees",
            content: (
              <Employees onGoToRoles={() => setActiveTab("employee-roles")} />
            ),
          },
          {
            label: "employeeRoles",
            value: "employee-roles",
            content: <EmployeeRoles />,
          },
        ]}
      />
    </div>
  );
};

export default EmployeeManagement;