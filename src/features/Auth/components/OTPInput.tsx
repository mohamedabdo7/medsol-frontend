import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

function OTPInput({ value, setValue }: { value: string; setValue: (value: string) => void }) {
  // Updated styles to match Figma design
  const slotClassName = `
    h-12 w-12 rounded-lg border-2 border-gray-200 bg-blue-50 
    text-lg font-medium text-gray-900 transition-all
    focus-within:border-blue-500 focus-within:bg-white 
    focus-within:ring-2 focus-within:ring-blue-500/20
    data-[active]:border-blue-500 data-[active]:bg-white 
    data-[active]:ring-2 data-[active]:ring-blue-500/20
  `
    .trim()
    .replace(/\s+/g, " ");

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <InputOTP maxLength={6} value={value} onChange={handleValueChange}>
      <InputOTPGroup className="gap-3">
        <InputOTPSlot className={slotClassName} index={0} />
        <InputOTPSlot className={slotClassName} index={1} />
        <InputOTPSlot className={slotClassName} index={2} />
        <InputOTPSlot className={slotClassName} index={3} />
        <InputOTPSlot className={slotClassName} index={4} />
        <InputOTPSlot className={slotClassName} index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

export default OTPInput;
