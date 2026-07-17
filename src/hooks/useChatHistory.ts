import { useState, useEffect, useCallback } from "react";
import { StoredMessage } from "../types/chat";
import { chatStorage } from "../lib/storage/chat-storage";

/**
 * Custom hook to manage synchronization and state of chat messages in localStorage.
 */
export function useChatHistory() {
  const [messages, setMessages] = useState<StoredMessage[]>([]);

  useEffect(() => {
    const history = chatStorage.loadHistory();
    setMessages(history.messages);
  }, []);

  const addMessage = useCallback((role: "user" | "assistant", content: string) => {
    chatStorage.appendMessage(role, content);
    setMessages(chatStorage.loadHistory().messages);
  }, []);

  const trim = useCallback((maxMessages = 12) => {
    chatStorage.trimHistory(maxMessages);
    setMessages(chatStorage.loadHistory().messages);
  }, []);

  const clear = useCallback(() => {
    chatStorage.clearHistory();
    setMessages([]);
  }, []);

  return {
    messages,
    addMessage,
    trim,
    clear,
  };
}
