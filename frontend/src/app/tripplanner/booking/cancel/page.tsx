import Link from "next/link";

export default function BookingCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
        <p className="mb-4">Your payment was cancelled. You can try again or contact support.</p>
        <div className="flex gap-3">
          <Link href="/tripplanner/booking" className="bg-blue-600 text-white px-4 py-2 rounded">Return to Booking</Link>
          <Link href="/" className="border px-4 py-2 rounded">Home</Link>
        </div>
      </div>
    </main>
  );
}
