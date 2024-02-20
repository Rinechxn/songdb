// components/ErrorDisplay.tsx

import React from 'react';
import { useError } from '@/libs/ErrorContext';

const ErrorDisplay: React.FC = () => {
  const { error } = useError();

  if (!error) {
    return null;
  }

  // Customize your error display
  const message = error.response?.data?.message || error.message;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-md mt-2 mb-4">Something went wrong:</p>
        <pre className="text-gray-800 bg-gray-200 rounded p-3 overflow-auto">{message}</pre>
      </div>
    </div>
  );
};

export default ErrorDisplay;
