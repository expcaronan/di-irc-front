import { ChatMessage } from "./ChatMessage";

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
}