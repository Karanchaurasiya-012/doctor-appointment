import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

const schema = yup.object({
  identifier: yup
    .string()
    .required('Email or mobile is required')
    .matches(/^(\d{10}|\S+@\S+\.\S+)$/, 'Enter a valid email or 10-digit number'),
  rememberMe: yup.boolean(),
});

type FormValues = {
  identifier: string;
  rememberMe: boolean;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('✅ Submitted data:', data);
  };

  const handleGoogleLogin = () => {
    alert('Google login coming soon...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <p className="text-sm text-gray-500 mb-1">
          Hi there welcome too{' '}
          <span className="text-sky-400 font-medium">Shedula</span>
        </p>
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mobile / Email
            </label>
            <input
              {...register('identifier')}
              placeholder="login with email or mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-1">{errors.identifier.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                {...register('rememberMe')}
              />
              Remember Me
            </label>
            <button type="button" className="text-pink-500 hover:underline text-sm">
              Forgot Password
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md text-sm"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">Or login With</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <FcGoogle className="text-xl mr-2" />
          <span className="text-sm">Continue with Google</span>
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-sky-400 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
