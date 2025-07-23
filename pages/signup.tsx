
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  identifier: yup
    .string()
    .required('Email or mobile is required')
    .matches(/^(\d{10}|\S+@\S+\.\S+)$/, 'Enter a valid email or 10-digit number'),
  password: yup.string().required('Password is required').min(6, 'Minimum 6 characters')
}).required();

type FormValues = {
  identifier: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormValues) => {
    console.log('✅ Signup Data:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <p className="text-sm text-gray-500 mb-1">
          Create your <span className="text-sky-400 font-medium">Shedula</span> account
        </p>
        <h1 className="text-2xl font-bold mb-6">Signup</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mobile / Email
            </label>
            <input
              {...register('identifier')}
              placeholder="Enter email or mobile"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.identifier ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter password"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
