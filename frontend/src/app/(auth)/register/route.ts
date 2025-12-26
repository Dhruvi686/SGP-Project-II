import { NextResponse } from "next/server";
// TODO: Adjust these imports to match your project structure
import { dbConnect as connect } from "@/lib/db"; 
import Booking from "@/lib/models/Booking"; 

export async function GET(request: Request) {
  try {
    // Ensure database is connected
    await connect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Filter bookings by the email provided in the query params
    const bookings = await Booking.find({ email: email }).sort({ createdAt: -1 });

    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}