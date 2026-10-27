import React, { useState } from 'react';
import './HomeContainerAI.css';
import { useCallAskAiMutation } from '../../Api/aiApi';
import { ChatMessage } from '../../Interfaces/chatModel/ChatMessage';
import { userModel } from '../../Interfaces/BaseModel/userModel';
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel';
interface props{
  userDetails: EmployeeUserModel
}
function HomeContainerAI({userDetails}:props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 const [keyId, setKeyId]= useState(0);
const [createChatMessage] = useCallAskAiMutation();
  const sendMessage = async () => {
    const question = input.trim();
    setKeyId(prev => prev + 1);
    if (!question || isLoading) return;

    const userMessage: ChatMessage = {
      id: userDetails.departmentId,
      //ole: "user",
      question: question,
      //createdAt: new Date(),
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsLoading(true);

    
    try {
      // Connect your ASP.NET Core AI endpoint here.
      // Replace this placeholder with your actual API call.

      const data = await createChatMessage(userMessage).unwrap();

      if(data){
        //console.log(data);
     
      
      const assistantMessage: ChatMessage = {
        id: userDetails.departmentId,
        question: data.answer,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    }
    } catch (error) {
      console.error("AI chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          id: userDetails.departmentId,
          question:
            "Sorry, I couldn't process your request. Please try again.",
         
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };



        
  return (
    // <div className="ai-chat-layout">
    <div className="task-page">
      <aside className="ai-chat-sidebar">
        <button
          className="new-chat-button"
          onClick={() => setMessages([])}
        >
          + New chat
        </button>

        <div className="sidebar-label">Your AI Assistant</div>
      </aside>

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
                 key={crypto.randomUUID()}
                  className={`ai-message`}
                >
                  <div className="ai-message-role">
                    {/* {message.role === "user" ? "You" : "AI"} */}
                  </div>

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
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
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
  )
}

export default HomeContainerAI