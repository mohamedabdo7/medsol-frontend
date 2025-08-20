import Button from "@/components/common/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "../components/OTPInput";

type VerificationType = "email" | "phone";

const VerifyCode: React.FC = () => {
  const [otpValue, setOtpValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(59);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();

  // Get verification type and contact info from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const type = (searchParams.get("type") || "email") as VerificationType;
  const email = searchParams.get("email") || "example@domain.com"; // Default email for UI testing
  const phone = searchParams.get("phone") || "123456789"; // Default phone for UI testing
  const countryCode = searchParams.get("countryCode") || "+966";

  // Determine contact info based on type
  const contactInfo = type === "email" ? email : phone;

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Remove the redirect effect for UI testing
  // useEffect(() => {
  //   if (!contactInfo) {
  //     navigate("/forgot-password");
  //   }
  // }, [contactInfo, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpValue.length !== 6) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for OTP verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const verificationData = {
        otp: otpValue,
        type,
        ...(type === "email" ? { email } : { phone, countryCode }),
      };

      console.log("OTP verified:", verificationData);

      // Handle successful verification - redirect to reset password page
      navigate(`/reset-password?type=${type}&${type}=${contactInfo}`);
    } catch (error) {
      console.error("OTP verification failed:", error);
      // Handle error - show error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) {
      return;
    }

    setIsResending(true);

    try {
      // Simulate API call for resending OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const resendData = type === "email" ? { email, type } : { phone, countryCode, type };

      console.log("OTP resent:", resendData);

      // Reset timer and OTP value
      setTimeLeft(59);
      setOtpValue("");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      // Handle error
    } finally {
      setIsResending(false);
    }
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Dynamic content based on verification type
  const title = type === "email" ? "Verify Email" : "Verify Phone Number";
  const description =
    type === "email"
      ? "We have sent the verification code to your email"
      : "We have sent the verification code to your Phone Number";

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-primary">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
        {/* Show masked contact info */}
        <p className="mt-1 text-xs text-muted-foreground">
          {type === "email"
            ? `${email?.substring(0, 2)}***@${email?.split("@")[1]}`
            : `${countryCode} ***${phone?.slice(-3)}`}
        </p>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* OTP Input */}
        <div className="flex justify-center">
          <OTPInput value={otpValue} setValue={setOtpValue} />
        </div>

        {/* Timer */}
        {timeLeft > 0 && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{formatTime(timeLeft)}</p>
          </div>
        )}

        {/* Resend Section */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0 || isResending}
              className="font-medium text-secondary underline transition-colors hover:text-secondary/80 disabled:cursor-not-allowed disabled:text-muted-foreground"
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={otpValue.length !== 6}
          className="mt-6"
          title="Submit"
        >
          Submit
        </Button>
      </form>

      {/* Back Navigation */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to Forgot Password
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;

// import Button from "@/components/common/Button";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import OTPInput from "../components/OTPInput";

// type VerificationType = "email" | "phone";

// const VerifyCode: React.FC = () => {
//   const [otpValue, setOtpValue] = useState("");
//   const [timeLeft, setTimeLeft] = useState(59);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isResending, setIsResending] = useState(false);

//   const navigate = useNavigate();

//   // Get verification type and contact info from URL params
//   const searchParams = new URLSearchParams(window.location.search);
//   const type = (searchParams.get("type") || "email") as VerificationType;
//   const email = searchParams.get("email");
//   const phone = searchParams.get("phone");
//   const countryCode = searchParams.get("countryCode") || "+966";

//   // Determine contact info based on type
//   const contactInfo = type === "email" ? email : phone;

//   // Countdown timer effect
//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => {
//         setTimeLeft(timeLeft - 1);
//       }, 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [timeLeft]);

//   // Redirect if no contact info provided
//   useEffect(() => {
//     if (!contactInfo) {
//       navigate("/forgot-password");
//     }
//   }, [contactInfo, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (otpValue.length !== 6) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Simulate API call for OTP verification
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       const verificationData = {
//         otp: otpValue,
//         type,
//         ...(type === "email" ? { email } : { phone, countryCode }),
//       };

//       console.log("OTP verified:", verificationData);

//       // Handle successful verification - redirect to reset password page
//       navigate(`/reset-password?type=${type}&${type}=${contactInfo}`);
//     } catch (error) {
//       console.error("OTP verification failed:", error);
//       // Handle error - show error message
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (!contactInfo || timeLeft > 0) {
//       return;
//     }

//     setIsResending(true);

//     try {
//       // Simulate API call for resending OTP
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const resendData = type === "email" ? { email, type } : { phone, countryCode, type };

//       console.log("OTP resent:", resendData);

//       // Reset timer and OTP value
//       setTimeLeft(59);
//       setOtpValue("");
//     } catch (error) {
//       console.error("Failed to resend OTP:", error);
//       // Handle error
//     } finally {
//       setIsResending(false);
//     }
//   };

//   // Format time display
//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };

//   // Don't render if no contact info
//   if (!contactInfo) {
//     return null;
//   }

//   // Dynamic content based on verification type
//   const title = type === "email" ? "Verify Email" : "Verify Phone Number";
//   const description =
//     type === "email"
//       ? "We have sent the verification code to your email"
//       : "We have sent the verification code to your Phone Number";

//   return (
//     <div className="mx-auto w-full max-w-md">
//       {/* Header */}
//       <div className="mb-8 text-center">
//         <h1 className="mb-2 text-2xl font-bold text-primary">{title}</h1>
//         <p className="text-sm text-muted-foreground">{description}</p>
//         {/* Show masked contact info */}
//         <p className="mt-1 text-xs text-muted-foreground">
//           {type === "email"
//             ? `${email?.substring(0, 2)}***@${email?.split("@")[1]}`
//             : `${countryCode} ***${phone?.slice(-3)}`}
//         </p>
//       </div>

//       {/* OTP Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* OTP Input */}
//         <div className="flex justify-center">
//           <OTPInput value={otpValue} setValue={setOtpValue} />
//         </div>

//         {/* Timer */}
//         {timeLeft > 0 && (
//           <div className="text-center">
//             <p className="text-sm text-muted-foreground">{formatTime(timeLeft)}</p>
//           </div>
//         )}

//         {/* Resend Section */}
//         <div className="text-center">
//           <p className="text-sm text-muted-foreground">
//             Didn't receive code?{" "}
//             <button
//               type="button"
//               onClick={handleResend}
//               disabled={timeLeft > 0 || isResending}
//               className="font-medium text-secondary underline transition-colors hover:text-secondary/80 disabled:cursor-not-allowed disabled:text-muted-foreground"
//             >
//               {isResending ? "Sending..." : "Resend"}
//             </button>
//           </p>
//         </div>

//         {/* Submit Button */}
//         <Button
//           type="submit"
//           isLoading={isLoading}
//           disabled={otpValue.length !== 6}
//           className="mt-6"
//           title="Submit"
//         >
//           Submit
//         </Button>
//       </form>

//       {/* Back Navigation */}
//       <div className="mt-6 text-center">
//         <button
//           type="button"
//           onClick={() => navigate("/forgot-password")}
//           className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//         >
//           ← Back to Forgot Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerifyCode;
