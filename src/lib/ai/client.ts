import { env } from "../utils/env";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class AIClient {
  /**
   * Generates completion from active provider (Gemini or Groq) dynamically.
   *
   * @param messages List of chat messages
   * @returns Generated text content
   */
  static async generate(messages: ChatMessage[]): Promise<string> {
    const provider = env.PRIMARY_PROVIDER.toLowerCase();

    if (provider === "groq") {
      return this.generateGroq(messages);
    } else {
      return this.generateGemini(messages);
    }
  }

  private static async generateGemini(messages: ChatMessage[]): Promise<string> {
    const apiKey = env.GEMINI_API_KEY;
    const model = env.GEMINI_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const systemMessage = messages.find((m) => m.role === "system");
    const chatMessages = messages.filter((m) => m.role !== "system");

    const contents = chatMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const body: Record<string, any> = {
      contents,
      generationConfig: {
        temperature: env.TEMPERATURE,
        maxOutputTokens: env.MAX_OUTPUT_TOKENS,
      },
    };

    if (systemMessage) {
      body.systemInstruction = {
        parts: [{ text: systemMessage.content }],
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error("Invalid or empty response from Gemini API");
    }

    return content;
  }

  private static async generateGroq(messages: ChatMessage[]): Promise<string> {
    const apiKey = env.GROQ_API_KEY;
    const model = env.GROQ_MODEL;
    const url = "https://api.groq.com/openai/v1/chat/completions";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: env.TEMPERATURE,
        max_tokens: env.MAX_OUTPUT_TOKENS,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Invalid or empty response from Groq API");
    }

    return content;
  }
}
