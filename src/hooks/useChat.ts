import { useState, useCallback } from "react";
import { useChatHistory } from "./useChatHistory";
import { chatStorage } from "../lib/storage/chat-storage";

/**
 * Custom hook to orchestrate the chat request lifecycle.
 * Coordinates user input append, history trimming, API call, loading/error states.
 * Leaves the typewriter animation commit step to the UI.
 */
export function useChat() {
  const { messages, addMessage, trim, clear } = useChatHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string, signal?: AbortSignal): Promise<string | null> => {
    if (!userMessage.trim()) return null;

    setError(null);
    setIsLoading(true);

    try {
      // 1. Append user message to history
      addMessage("user", userMessage);

      // 2. Trim history to the latest 12 messages before sending
      trim(12);

      // 3. Load trimmed messages to attach as context
      const currentHistory = chatStorage.loadHistory().messages;

      // 4. Submit to route handler
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: currentHistory,
        }),
        signal,
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error?.message || "Failed to generate response");
      }

      return resData.data.response;
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("Request aborted by user");
        return null;
      }
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, trim]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    addMessage,
    clearChat: clear,
  };
}
