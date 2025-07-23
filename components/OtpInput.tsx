
import React, { useState, useRef, useEffect } from 'react';

export default function OtpInput() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Handle OTP change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Countdown logic
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      alert('Please enter a valid 4-digit OTP');
      return;
    }
    console.log('✅ Verified OTP:', enteredOtp);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2 text-center">OTP Code Verification</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Code has been sent to +91 111 ******99
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el!)}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              aria-label={`Digit ${idx + 1}`}
              className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          ))}
        </div>

        {/* Timer or Resend Button */}
        {timer > 0 ? (
          <p className="text-sm text-center mb-4">
            Resend code in <span className="text-blue-600 font-semibold">{timer} s</span>
          </p>
        ) : (
          <button
            onClick={() => setTimer(60)}
            className="text-sm text-blue-600 underline mb-4"
          >
            Resend Code
          </button>
        )}

        <button
          onClick={handleVerify}
          className="w-full py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
