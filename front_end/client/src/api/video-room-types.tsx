/**
 * Represents the require properties of an Announcement Message
 */
export interface AnnouncementMessage {
    chat_message: string;
    message_time: string;
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
 * Represents the required properties of a VideoPlayer
 */
export interface Player {
    videoUrl: string;
    videoState: string;
    videoTime: number;
    videoLength: number;
    videoVolume: number;
}

/**
 * Represents the required properties of a Room.
 */
export interface Room {
    id: number;
    name: string;
}

/**
 * Represents the required properties of a User.
 */
export interface User {
    id: number;
    name: string;
}

export interface Video {
    id?: number;
    userId: number;
    url: string;
}

export interface PlaylistItem {
    id: number;
    room_id: number;
    video_id: number;
}