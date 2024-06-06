"use client";
import { useState } from "react";
import React from "react";

const Page = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendSMS = async () => {
    const response = await fetch("/api/msg", {
      method: "POST",
      body: JSON.stringify({ phone: phone, message: message }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    alert(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(event) => setPhone(event.target.value)}
        />
        <textarea
          id="Body"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Message Body"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendSMS}
          className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Page;
