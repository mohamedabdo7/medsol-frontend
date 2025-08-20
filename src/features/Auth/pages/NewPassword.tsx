import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const NewPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const validateForm = () => {
    const newErrors = { password: "", confirmPassword: "" };

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

        console.log("Password reset successful:", formData);

        // Handle successful password reset - redirect to login or success page
        navigate("/login");
      } catch (error) {
        console.error("Password reset failed:", error);
        // Handle error
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-primary">New Password</h1>
        <p className="text-sm text-muted-foreground">You Can Set Your Password</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password Input */}
        <Input
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange("password")}
          placeholder="Enter your password"
          errMessage={errors.password}
          required
        />

        {/* Confirm Password Input */}
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          placeholder="Confirm your password"
          errMessage={errors.confirmPassword}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!formData.password || !formData.confirmPassword}
          className="mt-6"
        >
          Sign In
        </Button>
      </form>

      {/* Back Navigation */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => navigate("/verify-otp")}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to Verification
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
