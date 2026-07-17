import { Resend } from "resend";
import { env } from "../utils/env";
import { buildContactEmail } from "./templates";
import { logger } from "../utils/logger";

export class EmailService {
  private static resendClient: Resend | null = null;

  private static getClient(): Resend {
    if (!this.resendClient) {
      this.resendClient = new Resend(env.RESEND_API_KEY);
    }
    return this.resendClient;
  }

  /**
   * Sends portfolio contact inquiry using Resend.
   *
   * @param name Sender name
   * @param email Sender email (for replyTo)
   * @param subject Submission subject
   * @param message Submission message
   */
  static async sendContactInquiry(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Promise<void> {
    const receiverEmail = env.CONTACT_RECEIVER_EMAIL;
    const senderEmail = env.CONTACT_SENDER_EMAIL;
    const submittedTime = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";

    const { text, html } = buildContactEmail(name, email, subject, message, submittedTime);

    const client = this.getClient();
    const result = await client.emails.send({
      from: `Sachin Portfolio <${senderEmail}>`,
      to: receiverEmail,
      subject: `Inquiry: ${subject}`,
      text,
      html,
      replyTo: email,
    });

    if (result.error) {
      logger.error("Failed to send contact inquiry email", result.error);
      throw new Error(`Resend service error: ${result.error.message}`);
    }

    logger.info(`Successfully sent contact inquiry from ${name} (${email})`);
  }
}
