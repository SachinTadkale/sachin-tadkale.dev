export const env = {
  get PRIMARY_PROVIDER(): string {
    return process.env.PRIMARY_PROVIDER || "gemini";
  },

  get GEMINI_API_KEY(): string {
    const value = process.env.GEMINI_API_KEY;
    if (!value) {
      throw new Error("Missing environment variable: GEMINI_API_KEY");
    }
    return value;
  },

  get GEMINI_MODEL(): string {
    return process.env.GEMINI_MODEL || "gemini-2.5-flash";
  },

  get GROQ_API_KEY(): string {
    const value = process.env.GROQ_API_KEY;
    if (!value) {
      throw new Error("Missing environment variable: GROQ_API_KEY");
    }
    return value;
  },

  get GROQ_MODEL(): string {
    return process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  },

  get TEMPERATURE(): number {
    const val = process.env.TEMPERATURE;
    return val ? parseFloat(val) : 0.4;
  },

  get MAX_OUTPUT_TOKENS(): number {
    const val = process.env.MAX_OUTPUT_TOKENS;
    return val ? parseInt(val, 10) : 1024;
  },

  get RESEND_API_KEY(): string {
    const value = process.env.RESEND_API_KEY;
    if (!value) {
      throw new Error("Missing environment variable: RESEND_API_KEY");
    }
    return value;
  },

  get CONTACT_RECEIVER_EMAIL(): string {
    const value = process.env.CONTACT_RECEIVER_EMAIL || process.env.CONTACT_EMAIL;
    if (!value) {
      throw new Error("Missing environment variable: CONTACT_RECEIVER_EMAIL or CONTACT_EMAIL");
    }
    return value;
  },

  get CONTACT_SENDER_EMAIL(): string {
    return process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev";
  },
};
