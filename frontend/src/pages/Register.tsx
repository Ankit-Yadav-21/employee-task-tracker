import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Card } from "../components/common/Card";
import { ROUTES } from "../config/constants";
import { RegisterForm } from "../components/features/auth/RegisterForm";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(isAdmin() ? ROUTES.ADMIN_DASHBOARD : ROUTES.EMPLOYEE_DASHBOARD, {
        replace: true,
      });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Tracker</h1>
          <p className="text-gray-600 mt-2">Sign up to manage your tasks</p>
        </div>
        <RegisterForm />
      </Card>
    </div>
  );
};
