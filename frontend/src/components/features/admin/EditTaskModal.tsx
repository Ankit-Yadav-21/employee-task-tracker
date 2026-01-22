import React, { useState } from "react";
import { Modal } from "../../common/Modal";
import { Input } from "../../common/Input";
import { Select } from "../../common/Select";
import { Button } from "../../common/Button";
import { ErrorMessage } from "../../common/ErrorMessage";
import { taskService } from "../../../services/taskService";
import { Task, UpdateTaskData } from "../../../types";
import { handleApiError } from "../../../utils/errorHandler";
import { TASK_STATUS_OPTIONS } from "../../../config/constants";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSuccess: () => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UpdateTaskData>({
    title: task.title,
    description: task.description,
    status: task.status,
    due_date: task.due_date.split("T")[0],
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await taskService.updateTask(task.id, formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof UpdateTaskData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}

        <Input
          label="Task Title"
          value={formData.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <Select
          label="Status"
          value={formData.status || ""}
          onChange={(e) => handleChange("status", e.target.value)}
          options={TASK_STATUS_OPTIONS.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
        />

        <Input
          type="date"
          label="Due Date"
          value={formData.due_date || ""}
          onChange={(e) => handleChange("due_date", e.target.value)}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" isLoading={isLoading} className="flex-1">
            Update Task
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
