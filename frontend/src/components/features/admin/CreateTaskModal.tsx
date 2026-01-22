import React, { useState, useEffect } from "react";
import { Modal } from "../../common/Modal";
import { Input } from "../../common/Input";
import { Select } from "../../common/Select";
import { Button } from "../../common/Button";
import { ErrorMessage } from "../../common/ErrorMessage";
import { taskService } from "../../../services/taskService";
import { userService } from "../../../services/userService";
import { CreateTaskData, User } from "../../../types";
import { handleApiError } from "../../../utils/errorHandler";
import { TASK_STATUS_OPTIONS } from "../../../config/constants";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    assigned_to: 0,
    due_date: "",
    status: "pending",
  });
  const [employees, setEmployees] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadEmployees();
    }
  }, [isOpen]);

  const loadEmployees = async () => {
    try {
      const users = await userService.getAllEmployee();
      setEmployees(users);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await taskService.createTask(formData);
      onSuccess();
      onClose();
      resetForm();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      assigned_to: 0,
      due_date: "",
      status: "pending",
    });
  };

  const handleChange = (
    field: keyof CreateTaskData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}

        <Input
          label="Task Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter task title"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter task description"
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <Select
          label="Assign To"
          value={formData.assigned_to.toString()}
          onChange={(e) => handleChange("assigned_to", Number(e.target.value))}
          options={employees.map((emp) => ({
            value: emp.id,
            label: emp.name,
          }))}
          placeholder="Select employee"
          required
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={TASK_STATUS_OPTIONS.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
        />

        <Input
          type="date"
          label="Due Date"
          value={formData.due_date}
          onChange={(e) => handleChange("due_date", e.target.value)}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" isLoading={isLoading} className="flex-1">
            Create Task
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
