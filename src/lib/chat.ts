const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateResponse(user_message: string) {
  const response = await fetch(`${API_URL}/api/v1/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: user_message,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate Response");
  }

  return response.json();
}
