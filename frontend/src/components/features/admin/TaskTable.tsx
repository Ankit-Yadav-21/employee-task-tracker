import React, { useState } from "react";
import { Task } from "../../../types";
import { Table } from "../../common/Table";
import { Badge } from "../../common/Badge";
import { Button } from "../../common/Button";
import { formatDate } from "../../../utils/formatters";
import { EditTaskModal } from "./EditTaskModal";

interface TaskTableProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onTaskUpdate,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const columns = [
    {
      header: "Title",
      accessor: "title" as keyof Task,
      className: "font-medium text-gray-900",
    },
    {
      header: "Description",
      accessor: (row: Task) => (
        <span className="text-gray-600 max-w-xs truncate block">
          {row.description}
        </span>
      ),
    },
    {
      header: "Assigned To",
      accessor: (row: Task) => (
        <span className="text-gray-900">{row.assignedUser?.name || "N/A"}</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: Task) => <Badge status={row.status} />,
    },
    {
      header: "Due Date",
      accessor: (row: Task) => (
        <span className="text-gray-600">{formatDate(row.due_date)}</span>
      ),
    },
    {
      header: "Actions",
      accessor: (row: Task) => (
        <Button
          variant="secondary"
          onClick={() => handleEdit(row)}
          className="text-sm"
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table data={tasks} columns={columns} emptyMessage="No tasks found" />

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          task={selectedTask}
          onSuccess={onTaskUpdate}
        />
      )}
    </>
  );
};
