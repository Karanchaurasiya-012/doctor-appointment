"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Head from "next/head";
import BookingSuccessModal from "@/components/BookingSuccessModal";

type FormValues = {
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  problem: string;
  relation: string;
  mobile: string;
};

export default function PatientDetailsPage() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      gender: "Male",
    },
  });

  const gender = watch("gender");
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setShowModal(true); // 👈 Modal show after form submit
  };

  return (
    <>
      <Head><title>Patient Details</title></Head>
      <div className="min-h-screen bg-white p-4 max-w-md mx-auto font-sans">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <button>&larr;</button>
          <h2 className="text-lg font-semibold text-cyan-600">Patient Details (Optional)</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold">Full name</label>
            <input
              {...register("name")}
              placeholder="Patient Name"
              className="w-full border rounded-md px-4 py-2 mt-1"
              required
            />
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block font-semibold">Age</label>
              <input
                type="number"
                {...register("age")}
                className="w-16 border rounded-md px-2 py-2 mt-1 text-center"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block font-semibold">Gender</label>
              <div className="flex gap-2 mt-1">
                {["Male", "Female", "Other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setValue("gender", option as FormValues["gender"])}
                    className={`px-3 py-2 border rounded-md text-sm w-full ${
                      gender === option
                        ? "bg-cyan-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold">Write your problem</label>
            <textarea
              {...register("problem")}
              placeholder="write your problem"
              className="w-full border rounded-md px-4 py-2 mt-1"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold">Relation with Patient</label>
            <input
              {...register("relation")}
              placeholder="Brother/sister/mother"
              className="w-full border rounded-md px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-semibold">Patient Mobile Number</label>
            <input
              {...register("mobile")}
              placeholder="Mobile number"
              className="w-full border rounded-md px-4 py-2 mt-1"
              required
            />
          </div>

          {/* Buttons */}
          <button
            type="button"
            className="w-full border border-cyan-500 text-cyan-500 rounded-md py-2 font-semibold"
          >
            Make Payment
          </button>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white rounded-md py-2 font-semibold"
          >
            Add Patient Details
          </button>
        </form>
      </div>

      {showModal && (
        <BookingSuccessModal
          tokenNumber={1234}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
