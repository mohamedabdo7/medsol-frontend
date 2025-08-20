import React, { ButtonHTMLAttributes } from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Spinner } from "../ui/Spinner";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  gradientBorder?: boolean;
  borderVariant?: "primary" | "secondary" | "danger" | "warning";
  isLoading?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
};

const Button: React.FC<Props> = ({
  children,
  buttonClassName,
  className,
  gradientBorder,
  borderVariant,
  isLoading,
  size = "md",
  variant = "default",
  ...props
}: Props) => {
  const borderClasses = {
    primary: "from-[#1671e2] to-[#08e4d2]",
    secondary: "from-[#1671e2] to-[#08e4d2]",
    danger: "from-red-500 to-red-600",
    warning: "from-yellow-500 to-orange-500",
  };

  const sizeClasses = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-white";
      case "secondary":
        return "bg-muted text-muted-foreground hover:bg-muted/80";
      case "ghost":
        return "bg-transparent text-secondary hover:bg-secondary/10";
      case "destructive":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "link":
        return "bg-transparent text-secondary underline-offset-4 hover:underline";
      default:
        return "bg-primary text-white hover:bg-secondary/90";
    }
  };

  return (
    <div className={cn("group relative", className)}>
      {!props.disabled && (gradientBorder || borderVariant) && !isLoading && (
        <div
          className={cn(
            "absolute -inset-0.5 rounded-lg bg-gradient-to-r opacity-75 transition duration-300 group-hover:opacity-100",
            borderClasses[borderVariant || "primary"]
          )}
        />
      )}

      <ShadcnButton
        className={cn(
          "relative w-full rounded-lg font-semibold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:ring-offset-2",
          "bg-black disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size],
          getVariantStyles(),
          gradientBorder && "bg-background",
          buttonClassName
        )}
        {...props}
        disabled={props.disabled || isLoading}
      >
        <div className="flex items-center justify-center space-x-2">
          {isLoading && <Spinner />}
          <span>{children}</span>
        </div>
      </ShadcnButton>
    </div>
  );
};

export default Button;
