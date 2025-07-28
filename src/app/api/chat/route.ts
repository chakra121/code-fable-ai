// src/app/api/chat/route.ts

// Define the URL of your Spring Boot backend
const SPRING_BOOT_BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// Handle POST requests to /api/chat
export async function POST(request: Request) {
  try {
    const { userId, message } = await request.json(); // Get userId and message from the frontend request

    if (!userId || !message) {
      return new Response("Missing userId or message in request body", {
        status: 400,
      });
    }

    // Make a POST request to your Spring Boot backend's /api/chat/message endpoint
    const response = await fetch(
      `${SPRING_BOOT_BACKEND_URL}/api/chat/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, message }), // Send userId and message to backend
      }
    );

    // Check if the backend response was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", response.status, errorText);
      return new Response(`Backend error: ${response.status} - ${errorText}`, {
        status: response.status,
      });
    }

    // Get the JSON response from your Spring Boot backend
    const data = await response.json(); // Expecting JSON: { "assistantMessage": "..." }

    // Return the backend's response to the frontend
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing chat message:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
