import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28">
        {/* Left Side - Illustration (Hidden on mobile and tablet) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden items-center justify-center p-4 lg:p-6 xl:flex xl:w-1/2 xl:p-8"
        >
          <div className="w-full max-w-md lg:max-w-lg">
            {/* Medical Illustration - Replace with your extracted asset */}
            <img
              src="/icons/auth.svg"
              alt="Medical Illustration"
              className="h-auto w-full max-w-full"
            />
          </div>
        </motion.div>

        {/* Right Side - Auth Forms */}
        <div className="flex w-full items-center justify-center xl:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-xs py-6 sm:max-w-sm sm:py-8 md:max-w-md md:py-10 lg:max-w-lg lg:py-12 xl:max-w-sm"
          >
            {/* MedSol Logo */}
            <div className="mb-6 text-center sm:mb-8 md:mb-10 lg:mb-12">
              <Logo size="md" className="mb-2 sm:hidden" />
              <Logo size="lg" className="mb-2 hidden sm:block" />
            </div>

            {/* Auth Form Content */}
            <div className="space-y-4 sm:space-y-6">
              <Outlet />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
