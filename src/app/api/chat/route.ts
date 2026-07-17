import { NextRequest } from "next/server";
import { chatRequestSchema } from "@/lib/validation/chat";
import { chatService } from "@/lib/ai/chat-service";
import { successResponse, errorResponse } from "@/lib/utils/response";
import { isRateLimited } from "@/lib/security/rate-limit";
import { logger } from "@/lib/utils/logger";

export async function POST(request: NextRequest) {
  try {
    // Basic rate limit check (10 requests per minute)
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip, 10, 60 * 1000)) {
      return errorResponse("Too many requests. Please try again later.", "RATE_LIMIT_EXCEEDED", 429);
    }

    // Parse request body
    const body = await request.json().catch(() => ({}));

    // Validate request input
    const result = chatRequestSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || "Invalid request body";
      return errorResponse(errorMsg, "VALIDATION_ERROR", 400);
    }

    // Call service to get response
    const aiResponse = await chatService.getAIResponse(result.data.message, result.data.history);

    // Return structured success response
    return successResponse({ response: aiResponse });
  } catch (error: any) {
    logger.error("Error in POST /api/chat", error);
    const isDev = process.env.NODE_ENV !== "production";
    const message = isDev && error instanceof Error ? error.message : "An unexpected error occurred while generating a response.";
    return errorResponse(message, "INTERNAL_SERVER_ERROR", 500);
  }
}
