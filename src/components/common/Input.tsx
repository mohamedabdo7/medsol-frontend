import { cn } from "@/lib/utils";
import { InputProps } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, useCallback, useRef, useState } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      type = "text",
      required,
      className = "",
      errMessage,
      onChange,
      subText,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const localRef = useRef<HTMLInputElement>(null);
    const inputRef = useMergedRef(ref, localRef);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const effectiveType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className={cn(styles.container, containerClassName)}>
        {/* Label above input */}
        {label && (
          <label htmlFor={id} className={styles.label(props.disabled, !!errMessage)}>
            {label}
            {required && <span className={styles.requiredAsterisk}>*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            id={id}
            type={effectiveType}
            className={`${styles.input(type === "password", !!errMessage)} ${className}`}
            onChange={handleInputChange}
            {...props}
          />

          {type === "password" && (
            <PasswordToggle showPassword={showPassword} onToggle={togglePasswordVisibility} />
          )}
        </div>

        {/* Sub text and error message */}
        {(subText || errMessage) && (
          <div className="mt-1 flex w-full justify-between">
            {subText && <p className="text-xs text-muted-foreground">{subText}</p>}
            {errMessage && <p className={styles.errorMessage}>{errMessage}</p>}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

const styles = {
  container: "relative w-full space-y-1",
  inputWrapper: "relative",
  input: (isPassword: boolean, hasError: boolean) => `
      w-full
      h-12
      px-3
      py-2
      rounded-md
      border
      ${
        hasError
          ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive/20"
          : "border-input focus:border-secondary focus:ring-1 focus:ring-secondary/20"
      }
      focus:outline-none
      transition-all
      duration-200
      text-foreground
      bg-background
      disabled:cursor-not-allowed
      disabled:opacity-50
      placeholder:text-muted-foreground
      ${isPassword ? "pr-10" : ""}
    `,
  label: (disabled?: boolean, hasError?: boolean) => `
      block
      text-sm
      font-medium
      mb-1
      ${disabled ? "opacity-50" : ""}
      ${hasError ? "text-destructive" : "text-[#7C8391]"}
    `,
  requiredAsterisk: "ml-1 text-destructive",
  toggleButton: `
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      text-muted-foreground
      hover:text-foreground
      focus:outline-none
      transition-colors
      duration-200
      p-1
    `,
  errorMessage: "text-destructive text-xs",
};

interface PasswordToggleProps {
  showPassword: boolean;
  onToggle: () => void;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({ showPassword, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={styles.toggleButton}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
);

function useMergedRef<T>(...refs: React.Ref<T>[]) {
  return useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<T>).current = element;
        }
      });
    },
    [refs]
  );
}
