import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${apiUrl}/api/v1/contact`, {
      method: "POST",
      body: JSON.stringify({ name, email, subject, message }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      return NextResponse.json({ success: true, message: data.message || "Message sent successfully." });
    } else {
      let errorMessage = "Unable to send your message.";
      if (Array.isArray(data.detail)) {
        errorMessage = data.detail.map((err: any) => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join(", ");
      } else if (typeof data.detail === "string") {
        errorMessage = data.detail;
      } else if (data.message) {
        errorMessage = data.message;
      }
      
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error("Error in contact forwarding:", error);
    return NextResponse.json({ success: false, message: "Unable to send your message." }, { status: 500 });
  }
}
