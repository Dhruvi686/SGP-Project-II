import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Page not found</h2>
        <p className="text-sm text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
        <Link
          href="/"
          className="mt-4 inline-flex w-full h-10 items-center justify-center rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
