export interface Room {
    id: number;
    name: string;
    video_id: string;
}

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