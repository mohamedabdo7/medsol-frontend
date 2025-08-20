import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

type TabType = "email" | "phone";

const ForgotPassword: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("email");
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    countryCode: "+966",
  });
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
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

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", phoneNumber: "" };

    if (activeTab === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else {
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = "Phone number is required";
      } else if (!/^\d{9,}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      }
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
        console.log("Forgot password submitted:", { activeTab, formData });
        // Handle successful submission here - redirect to verification page
      } catch (error) {
        console.error("Forgot password failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-primary">Forget Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email or your phone number, we will send you confirmation code.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex rounded-lg bg-muted p-1">
        <button
          type="button"
          onClick={() => setActiveTab("email")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeTab === "email"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("phone")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeTab === "phone"
              ? "bg-white text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Phone Number
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "email" ? (
          /* Email Input */
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="example@host.com"
            errMessage={errors.email}
          />
        ) : (
          /* Phone Number Input */
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Phone Number</label>
            <div className="flex space-x-2">
              {/* Country Code Dropdown */}
              <div className="relative">
                <select
                  value={formData.countryCode}
                  onChange={handleCountryCodeChange}
                  className="h-12 w-20 appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-foreground transition-all duration-200 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary/20"
                >
                  <option value="+966">🇸🇦</option>
                  <option value="+1">🇺🇸</option>
                  <option value="+44">🇬🇧</option>
                  <option value="+971">🇦🇪</option>
                  <option value="+20">🇪🇬</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              </div>

              {/* Phone Number Input */}
              <div className="flex-1">
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange("phoneNumber")}
                  placeholder="(+966) ---"
                  className={`h-12 w-full rounded-md border bg-background px-3 py-2 text-foreground transition-all duration-200 ${
                    errors.phoneNumber
                      ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/20"
                      : "border-input focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                  } focus:outline-none`}
                />
              </div>
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-destructive">{errors.phoneNumber}</p>
            )}
          </div>
        )}

        {/* Send OTP Button */}
        <Button type="submit" isLoading={isLoading} className="mt-6">
          Send OTP
        </Button>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
