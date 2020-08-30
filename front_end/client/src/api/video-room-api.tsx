import axios from "axios";
import { PlaylistItem, Room, User, Video } from "./video-room-types";

export class VideoRoomApi {
    BASE_URL: string

    constructor() {
        this.BASE_URL = process.env.REACT_APP_API_BASE_URL;
    }

    async createRoom(name: string): Promise<Room> {
        return axios.post(this.BASE_URL + "/rooms", {"name": name}).then(response => {
            return response.data;
        });
    }

    async getRooms(): Promise<Room[]> {
        return axios.get(this.BASE_URL + "/rooms").then(response => {
            return response.data;
        });
    }

    async getRoom(roomId: string): Promise<any> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId).then(response => {
            return response.data;
        })
    }

    async removeRoom(roomId: string): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId).then(response => {
            return response.data;
        });
    }

    async createUser(name: string): Promise<User> {
        return axios.post(this.BASE_URL + "/users", {"name": name}).then(response => {
            return response.data;
        });
    }

    async updateUser(userId: number, newName: string): Promise<User> {
        return axios.put(`${this.BASE_URL}/users/${userId}`, {"name": newName}).then(response => {
            return response.data;
        });
    }

    async addUserToRoom(roomId: string, userId: number): Promise<void> {
        return axios.post(this.BASE_URL + "/rooms/" + roomId + "/users", {"user_id": userId}).then(response => {
            return response.data;
        });
    }

    async removeUser(userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/users/" + userId).then(response => {
            return response.data;
        });
    } 

    async removeUserFromRoom(roomId: string, userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId + "/users/" + userId).then(response => {
            return response.data;
        });
    }

    async getUsersInRoom(roomId: string): Promise<User[]> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/users").then(response => {
            return response.data;
        });
    }

    async createVideo(userId: number, url: string): Promise<Video> {
        return axios.post(this.BASE_URL + "/videos", {
            "user_id": userId,
            "url": url
        }).then(response => {
            return response.data;
        })
    }

    async getVideo(videoId: number): Promise<Video> {
        return axios.get(`${this.BASE_URL}/videos/${videoId}`).then(response => {
            return response.data;
        })
    }

    async removeVideo(videoId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/videos/" + videoId).then(response => {
            return response.data;
        })
    }

    async createPlaylist(roomId: string, videoId: number): Promise<number> {
        return axios.post(this.BASE_URL + "/rooms/" + roomId +  "/playlist", {
            "video_id": videoId
        }).then(response => {
            return response.data;
        })
    }

    async getPlaylist(roomId: string): Promise<PlaylistItem[]> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/playlist").then(response => {
            return response.data;
        })
    }

    async removePlaylist(roomId: string, video_id: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId + "/playlist/" + video_id).then(response => {
            return response.data;
        })
    }

    async getVideoState(roomId: string): Promise<string> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/video_state").then(response => {
            return response.data;
        });
    }

    async updateVideoState(roomId: string, videoState: string): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId + "/video_state", {
            "video_state": videoState
        }).then(response => {

        }).catch((err) => {
            console.log(err)
        })
    }

    async getVideoTime(roomId: string): Promise<number> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/video_time").then(response => {
            return response.data;
        });
    }

    async updateVideoTime(roomId: string, videoTime: number): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId + "/video_time", {
            "video_time": videoTime
        }).then(response => {

        }).catch((err) => {
            console.log(err)
        })
    }

    async getVideoUrl(roomId: string): Promise<string> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/video_url").then(response => {
            return response.data;
        });
    }

    async updateVideoUrl(roomId: string, videoUrl: string): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId + "/video_url", {
            "video_url": videoUrl
        }).then(response => {

        }).catch((err) => {
            console.log(err)
        })
    }

    
}