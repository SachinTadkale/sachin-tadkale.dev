export interface StoredMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatHistory {
  version: number;
  updatedAt: string;
  messages: StoredMessage[];
}

export interface ChatRequest {
  message: string;
  history?: StoredMessage[];
}

export interface ChatResponseData {
  response: string;
}
