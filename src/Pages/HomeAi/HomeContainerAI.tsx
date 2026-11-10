import React, { useState } from 'react';
import './HomeContainerAI.css';
import { useCallAskAiMutation } from '../../Api/aiApi';
import { ChatMessage } from '../../Interfaces/chatModel/ChatMessage';
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel';

interface props {
  userDetails: EmployeeUserModel;
}

interface ChatMessageWithId extends ChatMessage {
  messageId: string;
}

function HomeContainerAI({ userDetails }: props) {
  const [messages, setMessages] = useState<ChatMessageWithId[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [createChatMessage] = useCallAskAiMutation();

  // Generate a stable ID when a message is created.
  const generateMessageId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const sendMessage = async () => {
    const question = input.trim();

    if (!question || isLoading) return;

    const userMessage: ChatMessageWithId = {
      id: userDetails.departmentId,
      messageId: generateMessageId(),
      question: question,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const data = await createChatMessage({
        id: userMessage.id,
        question: userMessage.question,
      }).unwrap();

      if (data) {
        const assistantMessage: ChatMessageWithId = {
          id: userDetails.departmentId,
          messageId: generateMessageId(),
          question: data.answer,
        };

        setMessages((previous) => [
          ...previous,
          assistantMessage,
        ]);
      }
    } catch (error) {
      console.error('AI chat error:', error);

      const errorMessage: ChatMessageWithId = {
        id: userDetails.departmentId,
        messageId: generateMessageId(),
        question:
          "Sorry, I couldn't process your request. Please try again.",
      };

      setMessages((previous) => [
        ...previous,
        errorMessage,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    if (isLoading) return;

    setMessages([]);
    setInput('');
  };

  return (
    <div>

   <aside className="ai-chat-sidebar">
        <button
          className="new-chat-button"
          onClick={handleNewChat}
          disabled={isLoading}
        >
          + New chat
        </button>

        {/* <div className="sidebar-label">
          Your AI Assistant
        </div> */}
      </aside>
    <div className="task-page">
      
      

      <main className="ai-chat-main">
        <header className="ai-chat-header">
          <span>My AI Assistant</span>
        </header>

        <section className="ai-chat-content">
          {messages.length === 0 ? (
            <div className="ai-chat-welcome">
              <h1>How can I help you today?</h1>
              <p>Ask a question to get started.</p>
            </div>
          ) : (
            <div className="ai-chat-messages">
              {messages.map((message) => (
                <div
                  key={message.messageId}
                  className="ai-message"
                >
                  <div className="ai-message-content">
                    {message.question}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-typing-indicator">
                  AI is thinking...
                </div>
              )}
            </div>
          )}

          <div className="ai-chat-input-container">
            <div className="ai-chat-input-wrapper">
              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Ask anything..."
                rows={1}
                disabled={isLoading}
              />

              <button
                onClick={() => void sendMessage()}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                ↑
              </button>
            </div>

            <small>
              AI-generated responses may not always be accurate.
            </small>
          </div>
        </section>
      </main>
    </div>
     </div>
  );
}

export default HomeContainerAI;
