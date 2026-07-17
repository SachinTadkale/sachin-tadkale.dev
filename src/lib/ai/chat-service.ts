import { SYSTEM_PROMPT } from "./prompts";
import { AIClient, ChatMessage } from "./client";
import portfolioData from "../../data/portfolio.json";

/**
 * Filter portfolio knowledge based on keywords in user message to minimize prompt tokens.
 */
function getFilteredKnowledge(userMessage: string): Record<string, any> {
  const msg = userMessage.toLowerCase();
  const filtered: Record<string, any> = {
    personal: portfolioData.personal,
  };

  if (/project|vyaro|sara|worklyn|build|built|develop|code/i.test(msg)) {
    filtered.projects = portfolioData.projects;
  }

  if (/skill|tech|stack|language|framework|database|python|java|react|next|angular|node/i.test(msg)) {
    filtered.skills = portfolioData.skills;
    filtered.experience_level = portfolioData.experience_level;
  }

  if (/experience|work|job|company|career|employ|intern|role/i.test(msg)) {
    filtered.experience = portfolioData.experience;
    filtered.career_objective = portfolioData.career_objective;
    filtered.summary = portfolioData.summary;
  }

  if (/education|degree|mca|bca|college|university|study|studied|graduat/i.test(msg)) {
    filtered.education = portfolioData.education;
  }

  if (/contact|email|phone|social|github|linkedin|twitter|reach|write/i.test(msg)) {
    filtered.contact = portfolioData.contact;
    filtered.socials = portfolioData.socials;
  }

  if (/resume|cv/i.test(msg)) {
    filtered.resume = portfolioData.resume;
  }

  if (
    Object.keys(filtered).length === 1 ||
    /who are you|who is|sara|hello|hi|hey|about|welcome/i.test(msg)
  ) {
    filtered.career_objective = portfolioData.career_objective;
    filtered.summary = portfolioData.summary;
    filtered.current_focus = portfolioData.current_focus;
  }

  return filtered;
}

import { StoredMessage } from "../../types/chat";

/**
 * Helper to build the message payload for completion, including conversation history.
 */
export function buildMessages(userMessage: string, history?: StoredMessage[]): ChatMessage[] {
  const dynamicKnowledge = JSON.stringify(getFilteredKnowledge(userMessage));
  const systemMsg: ChatMessage = {
    role: "system",
    content: `${SYSTEM_PROMPT}\n\nPortfolio Knowledge:\n${dynamicKnowledge}`,
  };

  if (history && history.length > 0) {
    const mappedHistory: ChatMessage[] = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    return [systemMsg, ...mappedHistory];
  }

  return [
    systemMsg,
    {
      role: "user",
      content: userMessage,
    },
  ];
}

/**
 * Helper to generate response from the model.
 */
export async function callModel(messages: ChatMessage[]): Promise<string> {
  return AIClient.generate(messages);
}

/**
 * Helper to format the final string output.
 */
export function formatResponse(rawResponse: string): string {
  return rawResponse.trim();
}

/**
 * Main service method to process user chat request.
 */
export async function getAIResponse(userMessage: string, history?: StoredMessage[]): Promise<string> {
  if (!userMessage.trim()) {
    throw new Error("User Message cannot be empty");
  }

  const messages = buildMessages(userMessage, history);
  const rawResponse = await callModel(messages);
  return formatResponse(rawResponse);
}
export const chatService = {
  getAIResponse,
  buildMessages,
  callModel,
  formatResponse,
};
