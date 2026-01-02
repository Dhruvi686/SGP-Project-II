import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    console.log('Frontend API: Received email parameter:', email);

    // Fetch bookings from backend, optionally filtered by email
    const baseBackendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");
    const backendUrl = email
      ? `${baseBackendUrl}/api/bookings?email=${encodeURIComponent(email)}`
      : `${baseBackendUrl}/api/bookings`;

    console.log('Frontend API: Calling backend URL:', backendUrl);

    const response = await fetch(backendUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch bookings from backend");
    }

    const data = await response.json();
    console.log('Frontend API: Received bookings:', data.bookings?.length || 0);
    return NextResponse.json(data.bookings || []);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}