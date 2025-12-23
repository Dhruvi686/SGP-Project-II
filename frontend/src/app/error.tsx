'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for debugging
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
        <p className="text-sm text-gray-600 mt-2">Please try again.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 w-full h-10 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
