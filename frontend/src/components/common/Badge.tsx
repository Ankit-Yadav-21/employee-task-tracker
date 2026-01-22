import React from "react";
import { TaskStatus } from "../../types";
import { TASK_STATUS_COLORS } from "../../config/constants";
import { getStatusLabel } from "../../utils/formatters";

interface BadgeProps {
  status: TaskStatus;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${TASK_STATUS_COLORS[status]}`}
    >
      {getStatusLabel(status)}
    </span>
  );
};
