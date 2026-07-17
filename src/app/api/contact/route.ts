import { NextRequest } from "next/server";
import { contactRequestSchema } from "@/lib/validation/contact";
import { EmailService } from "@/lib/email/email-service";
import { successResponse, errorResponse } from "@/lib/utils/response";
import { isRateLimited } from "@/lib/security/rate-limit";
import { sanitizeString } from "@/lib/security/sanitize";
import { logger } from "@/lib/utils/logger";

export async function POST(request: NextRequest) {
  try {
    // Prevent spam (3 submissions per 5 minutes per IP)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip, 3, 5 * 60 * 1000)) {
      return errorResponse("Too many contact submissions. Please try again later.", "RATE_LIMIT_EXCEEDED", 429);
    }

    // Parse body
    const body = await request.json().catch(() => ({}));

    // Validate body input
    const result = contactRequestSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || "Invalid request body";
      return errorResponse(errorMsg, "VALIDATION_ERROR", 400);
    }

    // Sanitize string inputs to prevent injection issues
    const name = sanitizeString(result.data.name);
    const email = result.data.email.trim().toLowerCase();
    const subject = sanitizeString(result.data.subject);
    const message = sanitizeString(result.data.message);

    // Call service to send email
    await EmailService.sendContactInquiry(name, email, subject, message);

    // Return standardized success response
    return successResponse({ message: "Message sent successfully." });
  } catch (error: any) {
    logger.error("Error in POST /api/contact", error);
    const isDev = process.env.NODE_ENV !== "production";
    const message = isDev && error instanceof Error ? error.message : "Unable to send your message.";
    return errorResponse(message, "INTERNAL_SERVER_ERROR", 500);
  }
}
