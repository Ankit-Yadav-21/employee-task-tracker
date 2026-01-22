import React, { useEffect, useState } from "react";
import { userService } from "../../../services/userService";
import { User } from "../../../types";
import { Card } from "../../common/Card";
import { LoadingSpinner } from "../../common/LoadingSpinner";
import { ErrorMessage } from "../../common/ErrorMessage";
import { handleApiError } from "../../../utils/errorHandler";

export const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const users = await userService.getAllEmployee();
      setEmployees(users);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Employees</h2>
      <div className="space-y-3">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No employees found</p>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{employee.name}</p>
                <p className="text-sm text-gray-600">{employee.email}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Employee
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
