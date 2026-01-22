import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { authService } from "../../../services/authService";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ErrorMessage } from "../../common/ErrorMessage";
import { handleApiError } from "../../../utils/errorHandler";
import { ROLE_OPTIONS, ROUTES } from "../../../config/constants";
import { RegisterCredentials } from "../../../types";
import { Select } from "../../common/Select";

export const RegisterForm: React.FC = () => {
  const [form, setFrom] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.register(form);
      setAuth(response.user, response.token);

      // Redirect based on role
      if (response.user.role === "admin") {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        navigate(ROUTES.EMPLOYEE_DASHBOARD);
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      <Input
        type="text"
        label="Name"
        value={form?.name}
        onChange={(e) => setFrom({ ...form, name: e.target.value })}
        placeholder="Your Name"
        required
      />

      <Input
        type="email"
        label="Email Address"
        value={form?.email}
        onChange={(e) => setFrom({ ...form, email: e.target.value })}
        placeholder="your@email.com"
        required
        autoComplete="email"
      />

      <Input
        type="password"
        label="Password"
        value={form?.password}
        onChange={(e) => setFrom({ ...form, password: e.target.value })}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

      <Select
        label="Status"
        value={form?.role}
        onChange={(e) => setFrom({ ...form, role: e.target.value })}
        options={ROLE_OPTIONS.map((opt) => ({
          value: opt.value,
          label: opt.label,
        }))}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign Up
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => navigate(ROUTES.LOGIN)}
      >
        Sign In
      </Button>
    </form>
  );
};
