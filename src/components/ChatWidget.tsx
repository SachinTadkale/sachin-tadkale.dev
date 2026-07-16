"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiamond,
  faXmark,
  faPaperPlane,
  faStop,
  faTrash,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./ChatWidget.css";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function parseMarkdown(content: string) {
  // Normalize triple backticks for active typing simulation
  let normalizedContent = content;
  const occurrences = (content.match(/```/g) || []).length;
  if (occurrences % 2 !== 0) {
    normalizedContent += "\n```";
  }

  return (
    <div className="markdown-text">
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isInline = !match;

            if (isInline) {
              return (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="code-block-container" data-lenis-prevent>
                {language && (
                  <div className="code-block-header">
                    <span>{language}</span>
                  </div>
                )}
                <pre>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          p({ children }) {
            return (
              <p className="m-0 min-h-[1em] text-sm leading-relaxed my-1">
                {children}
              </p>
            );
          },
          ul({ children }) {
            return (
              <ul className="pl-4 my-1 list-disc text-sm leading-relaxed flex flex-col gap-1">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="pl-4 my-1 list-decimal text-sm leading-relaxed flex flex-col gap-1">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return <li className="my-0.5">{children}</li>;
          },
          strong({ children }) {
            return (
              <strong className="font-semibold text-accent">{children}</strong>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-link"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sara, Sachin's AI assistant. Ask me anything about Sachin's background, skills, or portfolio!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fullResponseRef = useRef("");

  // Scroll to bottom when messages or typing updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedResponse, isTyping]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  // Simulate premium word-by-word typing effect
  const typeResponse = (fullText: string) => {
    setIsTyping(true);
    setDisplayedResponse("");
    fullResponseRef.current = fullText;

    const words = fullText.split(" ");
    let currentWordIndex = 0;
    let currentText = "";

    const typeNextWord = () => {
      if (currentWordIndex < words.length) {
        currentText +=
          (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
        setDisplayedResponse(currentText);
        currentWordIndex++;
        // Natural speed variation for premium feel
        const delay = 40 + Math.random() * 60;
        typingTimerRef.current = setTimeout(typeNextWord, delay);
      } else {
        // Finished typing
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fullText },
        ]);
        setDisplayedResponse("");
        setIsTyping(false);
      }
    };

    typeNextWord();
  };

  // Stop/Pause Response Generation or Typing
  const handleStopResponse = () => {
    // 1. Abort network request if in flight
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // 2. Stop typing animation if active
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    // 3. Save whatever was generated/typed so far
    if (isTyping && displayedResponse.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: displayedResponse + " [Response paused by user]",
        },
      ]);
    } else if (isLoading) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "[Response cancelled]" },
      ]);
    }

    setDisplayedResponse("");
    setIsLoading(false);
    setIsTyping(false);
  };

  // Send Message
  async function chat() {
    if (!message.trim()) return;

    const userMessage = message;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setIsLoading(true);

    // Set up AbortController for request cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://api.sachin-tadkale.dev"}/api/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
          signal: controller.signal,
        },
      );

      if (!data.ok) throw new Error("Failed to generate response");

      const reader = data.body?.getReader();
      if (!reader) throw new Error("No response body reader");

      const decoder = new TextDecoder();
      let done = false;
      let accumulatedResponse = "";
      let displayedResponseText = "";
      let isFirstChunk = true;

      // Simple character-by-character print loop
      const printNextChar = () => {
        if (displayedResponseText.length < accumulatedResponse.length) {
          displayedResponseText +=
            accumulatedResponse[displayedResponseText.length];
          setDisplayedResponse(displayedResponseText);

          if (isFirstChunk) {
            setIsLoading(false);
            setIsTyping(true);
            isFirstChunk = false;
          }

          setTimeout(printNextChar, 10); // Print next character in 10ms
        } else if (!done) {
          // Wait for more data to stream in
          setTimeout(printNextChar, 50);
        } else {
          // Finished streaming and printing
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: accumulatedResponse },
          ]);
          setDisplayedResponse("");
          setIsTyping(false);
        }
      };

      // Start printing loop
      printNextChar();

      try {
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          if (doneReading) {
            done = true;
            break;
          }
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            accumulatedResponse += chunk;
          }
        }
      } catch (err) {
        done = true;
        throw err;
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request aborted by user");
        return;
      }
      console.error(error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      abortControllerRef.current = null;
    }
  }

  // Clear Chat History
  const clearChat = () => {
    handleStopResponse();
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm Sara, Sachin's AI assistant. Ask me anything about Sachin's background, skills, or portfolio!",
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className={`chat-toggle-btn flex items-center justify-center ${isOpen ? "chat-toggle-btn--hidden" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat widget"
      >
        <div className={`chat-toggle-icon-wrapper ${isOpen ? "active" : ""}`}>
          <FontAwesomeIcon icon={faDiamond} className="icon-diamond w-4 h-4" />
          <FontAwesomeIcon icon={faXmark} className="icon-close w-4 h-4" />
        </div>
      </button>

      {/* Chat Widget Window */}
      <div
        className={`chat-widget-container ${isOpen ? "open-state" : "hidden-state"}`}
        data-lenis-prevent
      >
        {/* Header */}
        <div className="chat-header flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faDiamond}
              className={`w-3 h-3 text-accent`}
            />
            <div>
              <h3 className="chat-title text-sm m-0">Chat with Sara</h3>
              <p
                className="text-xs text-secondary m-0"
                style={{ fontSize: "0.6875rem" }}
              >
                Portfolio Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="chat-clear-btn p-1.5 flex items-center justify-center border-0 bg-transparent cursor-pointer"
              onClick={clearChat}
              title="Clear Chat"
            >
              <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
            </button>
            <button
              className="chat-close-btn p-1.5 flex items-center justify-center border-0 bg-transparent cursor-pointer"
              onClick={() => setIsOpen(false)}
              title="Close Chat"
            >
              <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div
          className="chat-messages-container flex-1 p-4 flex flex-col gap-4"
          data-lenis-prevent
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "w-full"}`}
            >
              <div
                className={`chat-bubble ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}`}
              >
                {msg.role === "user" ? (
                  <p className="m-0 whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  parseMarkdown(msg.content)
                )}
              </div>
            </div>
          ))}

          {/* Simulated Typing Response Container */}
          {isTyping && displayedResponse && (
            <div className="w-full">
              <div className="chat-bubble chat-bubble-assistant">
                {parseMarkdown(displayedResponse)}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 py-1 select-none">
              <FontAwesomeIcon
                icon={faDiamond}
                className="w-3.5 h-3.5 text-accent spinning-diamond"
              />
              <span className="text-xs text-secondary">thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="chat-input-wrapper p-3 flex gap-2 items-center">
          <input
            type="text"
            className="chat-input-field flex-1 px-3 py-2 border border-solid"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !isLoading && !isTyping && chat()
            }
            placeholder="Type your message..."
            disabled={isLoading || isTyping}
          />

          {isLoading || isTyping ? (
            <button
              className="chat-stop-btn w-9 h-9 flex items-center justify-center border-0 cursor-pointer"
              onClick={handleStopResponse}
              title="Stop response"
            >
              <FontAwesomeIcon icon={faStop} className="w-4 h-4" />
            </button>
          ) : (
            <button
              className="chat-send-btn w-9 h-9 flex items-center justify-center border-0 cursor-pointer"
              onClick={chat}
              disabled={!message.trim()}
              title="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
