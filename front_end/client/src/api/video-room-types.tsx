/**
 * Represents the required properties of a Room.
 */
export interface Room {
    id: number;
    name: string;
    video_id: string;
    video_url: string;
    video_state: string;
    video_time: number;
    video_length: number;
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

/**
 * Represents the require properties of an Announcement Message
 */

export interface AnnouncementMessage {
    chat_message: string;
    message_time: string;
}