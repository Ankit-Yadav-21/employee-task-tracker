import React, { useState } from "react";
import { Task, TaskStatus } from "../../../types";
import { Card } from "../../common/Card";
import { Badge } from "../../common/Badge";
import { Select } from "../../common/Select";
import { Button } from "../../common/Button";
import { taskService } from "../../../services/taskService";
import { formatDate } from "../../../utils/formatters";
import { handleApiError } from "../../../utils/errorHandler";
import { TASK_STATUS_OPTIONS } from "../../../config/constants";
import { ErrorMessage } from "../../common/ErrorMessage";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async () => {
    if (status === task.status) return;

    setIsLoading(true);
    setError(null);
    try {
      await taskService.updateTask(task.id, { status });
      onUpdate();
    } catch (err) {
      setError(handleApiError(err));
      setStatus(task.status); // Reset on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>
          <Badge status={task.status} />
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Due: {formatDate(task.due_date)}
        </div>

        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}

        <div className="flex items-center gap-3 pt-2">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            options={TASK_STATUS_OPTIONS.map((opt) => ({
              value: opt.value,
              label: opt.label,
            }))}
            className="flex-1"
          />
          <Button
            onClick={handleStatusUpdate}
            disabled={status === task.status}
            isLoading={isLoading}
          >
            Update
          </Button>
        </div>
      </div>
    </Card>
  );
};
