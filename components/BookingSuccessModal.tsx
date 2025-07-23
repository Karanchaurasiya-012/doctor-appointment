"use client";

import React from "react";
import Image from "next/image";

type Props = {
  tokenNumber: number;
  onClose: () => void;
};

const BookingSuccessModal = ({ tokenNumber, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-lg relative">
        <Image
          src="/success.png"
          alt="Success"
          width={120}
          height={120}
          className="mx-auto mb-4"
        />

        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Appointment Booked
        </h2>
        <p className="text-lg font-medium text-gray-800 mb-2">Successfully!</p>

        <p className="text-gray-700 text-base">
          Token No <span className="text-teal-600 font-bold">{tokenNumber}</span>
        </p>

        <p className="text-sm text-gray-500 mt-2 px-3">
          You will receive a Notification of Before half hour for as reminder. Thank you...
        </p>

        <button
          onClick={onClose}
          className="mt-5 bg-teal-600 text-white px-5 py-2 rounded-full text-sm hover:bg-teal-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
