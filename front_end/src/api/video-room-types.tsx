/**
 * Represents the required properties of a Room.
 */
export interface Room {
    id: number;
    name: string;
    video_id: string;
}

/**
 * Represents the required properties of a User.
 */
export interface User {
    id: number;
    name: string;
}

/**
 * Represents the required properties of a ChatMessage.
 */
export interface ChatMessage {
    author: User[];
    chat_message: string;
}
  
  /**
 * Represents the required properties of a ChatSendBox.
 */
export interface ChatHistory {
    message_history: ChatMessage[];
}