import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: e.target.checked,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Login submitted:", formData);
        // Handle successful login here
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-2 text-center">
        <h1 className="mb-2 text-2xl font-bold text-primary">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Log in to start exploring and ordering products easily.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Email Input */}
        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          placeholder="example@host.com"
          errMessage={errors.email}
        />

        {/* Password Input */}
        <Input
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange("password")}
          placeholder="••••••••"
          errMessage={errors.password}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-input bg-background text-secondary focus:ring-2 focus:ring-secondary"
            />
            <span className="text-muted-foreground">Remember me</span>
          </label>

          <Link
            to="/forget-password"
            className="text-sm text-muted-foreground underline transition-colors hover:text-secondary/80"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Login Button */}
        <Button type="submit" isLoading={isLoading} className="mt-6" title="Login">
          Login
        </Button>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-secondary transition-colors hover:text-secondary/80"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
