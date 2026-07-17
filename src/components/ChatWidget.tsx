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
import { useChat } from "@/hooks/useChat";

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
  const { messages: historyMessages, isLoading, sendMessage, addMessage, clearChat } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fullResponseRef = useRef("");

  // Map default welcome message with history messages
  const welcomeMessage = {
    role: "assistant" as const,
    content: "Hi! I'm Sara, Sachin's AI assistant. Ask me anything about Sachin's background, skills, or portfolio!",
  };
  const messages = [welcomeMessage, ...historyMessages];

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
        // Finished typing -> save to history
        addMessage("assistant", fullText);
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
      addMessage("assistant", displayedResponse + " [Response paused by user]");
    } else if (isLoading) {
      addMessage("assistant", "[Response cancelled]");
    }

    setDisplayedResponse("");
    setIsTyping(false);
  };

  // Send Message
  async function chat() {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");

    // Set up AbortController for request cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const responseText = await sendMessage(userMessage, controller.signal);
      if (responseText) {
        typeResponse(responseText);
      }
    } catch (error) {
      // Error is handled inside useChat hook, fallback UI message appended
      addMessage("assistant", "Sorry, I encountered an error. Please try again.");
    } finally {
      abortControllerRef.current = null;
    }
  }

  // Clear Chat History
  const handleClearChat = () => {
    handleStopResponse();
    clearChat();
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
              onClick={handleClearChat}
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
