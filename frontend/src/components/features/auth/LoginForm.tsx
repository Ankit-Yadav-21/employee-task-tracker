import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { authService } from "../../../services/authService";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { ErrorMessage } from "../../common/ErrorMessage";
import { handleApiError } from "../../../utils/errorHandler";
import { ROUTES } from "../../../config/constants";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.login({ email, password });
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
        type="email"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        autoComplete="email"
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign In
      </Button>
    </form>
  );
};
