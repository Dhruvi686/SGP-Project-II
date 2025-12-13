'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

export default function OtpInput({ 
  length = 6, 
  onComplete, 
  autoFocus = true,
  disabled = false,
  className = '',
  inputClassName = 'w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
}: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Focus first input on mount
  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    const pastedOtp = pastedData.slice(0, length).split('');

    if (pastedOtp.every(num => !isNaN(Number(num)))) {
      const newOtp = [...otp];
      pastedOtp.forEach((digit, index) => {
        if (index < length) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus on the next empty input or last one
      const nextIndex = Math.min(pastedOtp.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      // Trigger onComplete if all digits are filled
      if (newOtp.every(num => num !== '')) {
        onComplete(newOtp.join(''));
      }
    }
  }, [length, onComplete, otp]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only allow numbers and prevent spaces
    if (isNaN(Number(value)) || value === ' ' || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input if current input has a value
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(num => num !== '')) {
      onComplete(newOtp.join(''));
    }
  }, [length, onComplete, otp]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move left with arrow key
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      // Move right with arrow key
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  }, [length, otp]);

  return (
    <div className={`flex justify-center space-x-2 ${className}`.trim()}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className={`${inputClassName} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
        />
      ))}
    </div>
  );
}