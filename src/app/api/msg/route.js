import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const { phone, message } = await request.json();

    if (!phone || !message) {
      return NextResponse.json(
        { message: "Phone number and message are required" },
        { status: 400 }
      );
    }

    console.log("Sending message to:", phone);
    console.log("Message:", message);

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    console.log("Message sent:", result.sid);

    return NextResponse.json(
      { message: "Message sent successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      {
        message: "Failed to send message",
        error: error.message,
        details: error,
      },
      { status: 500 }
    );
  }
}
