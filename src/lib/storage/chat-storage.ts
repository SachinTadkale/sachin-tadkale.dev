import { ChatHistory, StoredMessage } from "../../types/chat";

const STORAGE_KEY = "portfolio-chat-history";
const CURRENT_VERSION = 1;

/**
 * Loads the conversation history from localStorage.
 * Handles server-side rendering checks and potential parsing errors gracefully.
 */
export function loadHistory(): ChatHistory {
  if (typeof window === "undefined") {
    return { version: CURRENT_VERSION, updatedAt: new Date().toISOString(), messages: [] };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { version: CURRENT_VERSION, updatedAt: new Date().toISOString(), messages: [] };
    }

    const data = JSON.parse(raw) as ChatHistory;
    if (data.version !== CURRENT_VERSION || !Array.isArray(data.messages)) {
      throw new Error("Format or version mismatch");
    }

    return data;
  } catch (error) {
    // Reset to empty conversation on corruption
    const empty: ChatHistory = {
      version: CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    saveHistory(empty);
    return empty;
  }
}

/**
 * Saves the conversation history back to localStorage.
 */
export function saveHistory(history: ChatHistory): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Failed to write chat history to localStorage", e);
  }
}

/**
 * Deletes the conversation history from localStorage.
 */
export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to remove chat history from localStorage", e);
  }
}

/**
 * Appends a single message to the conversation history.
 */
export function appendMessage(role: "user" | "assistant", content: string): void {
  const history = loadHistory();
  const newMessage: StoredMessage = {
    role,
    content,
    timestamp: new Date().toISOString(),
  };

  history.messages.push(newMessage);
  history.updatedAt = new Date().toISOString();
  saveHistory(history);
}

/**
 * Trims the history keeping only the latest N messages.
 */
export function trimHistory(maxMessages = 12): void {
  const history = loadHistory();
  if (history.messages.length > maxMessages) {
    history.messages = history.messages.slice(-maxMessages);
    history.updatedAt = new Date().toISOString();
    saveHistory(history);
  }
}

export const chatStorage = {
  loadHistory,
  saveHistory,
  clearHistory,
  appendMessage,
  trimHistory,
};
