import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { TaskTable } from "../components/features/admin/TaskTable";
import { CreateTaskModal } from "../components/features/admin/CreateTaskModal";
import { EmployeeList } from "../components/features/admin/EmployeeList";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { taskService } from "../services/taskService";
import { Task } from "../types";
import { handleApiError } from "../utils/errorHandler";

export const AdminDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = () => {
    loadTasks();
    setIsCreateModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Task Management
            </h2>
            <p className="text-gray-600 mt-1">Manage all tasks and employees</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            + Create Task
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                All Tasks
              </h3>
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} onClose={() => setError(null)} />
              ) : (
                <TaskTable tasks={tasks} onTaskUpdate={loadTasks} />
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <EmployeeList />
          </div>
        </div>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleTaskUpdate}
      />
    </DashboardLayout>
  );
};
