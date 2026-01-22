import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { TaskCard } from "../components/features/employee/TaskCard";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { useAuthStore } from "../store/authStore";
import { taskService } from "../services/taskService";
import { Task } from "../types";
import { handleApiError } from "../utils/errorHandler";

export const EmployeeDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      // Use getUserTasks to get only this employee's tasks
      const data = await taskService.getUserTasks(user.id);
      setTasks(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const tasksByStatus = {
    pending: tasks.filter((t) => t.status === "pending"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    completed: tasks.filter((t) => t.status === "completed"),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
          <p className="text-gray-600 mt-1">
            View and update your assigned tasks
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any tasks assigned yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                Pending ({tasksByStatus.pending.length})
              </h3>
              {tasksByStatus.pending.map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={loadTasks} />
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                In Progress ({tasksByStatus.in_progress.length})
              </h3>
              {tasksByStatus.in_progress.map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={loadTasks} />
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                Completed ({tasksByStatus.completed.length})
              </h3>
              {tasksByStatus.completed.map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={loadTasks} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
