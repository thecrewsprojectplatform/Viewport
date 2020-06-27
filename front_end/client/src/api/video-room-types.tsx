/**
 * Represents the required properties of a Room.
 */
export interface Room {
    id: number;
    name: string;
}

/**
 * Represents the required properties of a VideoPlayer
 */
export interface Player {
    videoUrl: string;
    videoState: string;
    videoTime: number;
    videoLength: number;
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

export interface MessageDetail {
    chat_message: string;
    chat_username: string;
    message_time: string;
}