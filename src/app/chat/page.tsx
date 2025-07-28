// src/app/chat/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Define message type for state
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

// Custom component for rendering inline code (e.g., `variable`)
const CodeRenderer = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <code
      className="px-1 py-0.5 rounded bg-dark-code-bg text-dark-text-light text-sm"
      {...props}
    />
  );
};

// Custom component for rendering code blocks (e.g., ```python\nprint("hello")\n```)
const PreRenderer = (props: React.HTMLAttributes<HTMLPreElement>) => {
  // Check if it's a code block (node.children[0].tagName === 'code')
  // and apply styling to the <pre> tag itself
  return (
    <pre
      className="p-3 my-2 rounded-lg bg-dark-code-bg overflow-x-auto"
      {...props}
    />
  );
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem("codefable_user_id");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("codefable_user_id", storedUserId);
    }
    setUserId(storedUserId);

    setMessages([
      {
        id: uuidv4(),
        role: "assistant",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessageContent = inputMessage.trim();
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: userMessageContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, message: userMessageContent }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Backend error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const assistantResponse: Message = {
        id: uuidv4(),
        role: "assistant",
        content: data.assistantMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          role: "assistant",
          content: `Oops! My AI brain hit a snag: ${errorMessage}. Could you try asking again?`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSendMessage(e); // Send message
    }
  };

  return (
    // Outermost container: Centers the chat window horizontally, uses a darker background
    <div
      className="flex justify-center min-h-screen "
    >
      {/* Main chat window wrapper: Wider, with a slightly rounded top and bottom */}
      <div className="flex flex-col h-[90vh] w-full max-w-4xl rounded-lg shadow-xl my-auto overflow-hidden">
        {/* Chat Area: Flex-1 to take available space, overflow for scrolling */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && ( // AI Assistant avatar only for assistant messages
                <div className="w-10 h-10 rounded-full bg-dark-bg-tertiary flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-dark-text-light opacity-80"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9.342 15.41a3.03 3.03 0 010-4.243l.5-.5a3.03 3.03 0 014.243 0l.5.5a3.03 3.03 0 010 4.243l-.5.5a3.03 3.03 0 01-4.243 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.625 15.904L18.154 15.41a3.03 3.03 0 010-4.243l.5-.5a3.03 3.03 0 014.243 0l.5.5a3.03 3.03 0 010 4.243l-.5.5a3.03 3.03 0 01-4.243 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.375 15.904L3.904 15.41a3.03 3.03 0 010-4.243l.5-.5a3.03 3.03 0 014.243 0l.5.5a3.03 3.03 0 010 4.243l-.5.5a3.03 3.03 0 01-4.243 0z"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                } max-w-[70%]`}
              >
                <div className="text-sm text-dark-text-muted mb-1">
                  {msg.role === "user" ? "You" : "AI Assistant"}
                  <time className="text-xs ml-2">{msg.timestamp}</time>
                </div>
                {/* Apply prose classes for general markdown styling */}
                <div
                  className={`p-3 rounded-xl text-base leading-relaxed ${
                    msg.role === "user"
                      ? "bg-dark-bubble-user"
                      : "bg-dark-bubble-ai"
                  } prose dark:prose-invert`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    // Custom components for code blocks and inline code
                    components={{
                      code: CodeRenderer, // For inline code `like this`
                      pre: PreRenderer, // For code blocks ```like this```
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
              {msg.role === "user" && ( // User avatar only for user messages
                <div className="w-10 h-10 rounded-full bg-dark-bg-tertiary flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-dark-text-light opacity-80"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-10 h-10 rounded-full bg-dark-bg-tertiary flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-dark-text-light opacity-80"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9.342 15.41a3.03 3.03 0 010-4.243l.5-.5a3.03 3.03 0 014.243 0l.5.5a3.03 3.03 0 010 4.243l-.5.5a3.03 3.03 0 01-4.243 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.625 15.904L18.154 15.41a3.03 3.03 0 010-4.243l.5-.5a3.03 3.03 0 014.243 0l.5.5a3.03 3.03 0 010 4.243l-.5.5a3.03 3.03 0 01-4.243 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.375 15.904L3.904 15.41a3.03 3.03 0 010-4.243l.5-.5a3.03 3.03 0 014.243 0l.5.5a3.03 3.03 0 010 4.243l-.5.5a3.03 3.03 0 01-4.243 0z"
                  />
                </svg>
              </div>
              <div className="p-3 rounded-xl bg-dark-bubble-ai text-base leading-relaxed animate-pulse">
                <p>Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-dark-bg-primary">
          <form
            onSubmit={handleSendMessage}
            className="flex items-end gap-2 mx-auto w-full max-w-2xl  bg-gray-800/45 backdrop-filter backdrop-glass glass rounded-xl shadow-lg p-2"
          >
            <textarea
              placeholder="Ask me anything..."
              className="flex-1 resize-none bg-transparent border-none focus:outline-none text-dark-text-light leading-relaxed h-12 min-h-[48px] max-h-[150px] p-2"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={isLoading}
            ></textarea>
            <button
              type="submit"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-dark-bg-tertiary text-dark-text-light hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-dark-text-light"></span>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              )}
            </button>
          </form>
          <p className="text-xs text-dark-text-muted text-center mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
