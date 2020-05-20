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

export interface ChatMessage {
    author: string;
    message: string;
  }
  
export interface ChatState {
    input: string;
    messages: ChatMessage[];
  }