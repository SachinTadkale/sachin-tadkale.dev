export async function generateResponse(user_message: string) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: user_message,
    }),
  });

  const resData = await response.json();
  if (!response.ok || !resData.success) {
    throw new Error(resData.error?.message || "Failed to generate Response");
  }

  return resData.data;
}
