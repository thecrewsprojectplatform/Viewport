import axios from "axios";
import { Room, User, Video } from "./video-room-types";

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

    async getRoom(roomId: number): Promise<any> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId).then(response => {
            return response.data;
        })
    }

    async removeRoom(roomId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId).then(response => {
            return response.data;
        });
    }

    async createPlaylist(roomId: number, userId: number, video_url: string): Promise<Video> {
        return axios.post(this.BASE_URL + "/rooms/" + roomId +  "/playlist", {
            "user_id": userId,
            "video_url": video_url
        }).then(response => {
            return response.data;
        })
    }

    async getPlaylist(roomId: number): Promise<Video[]> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/playlist").then(response => {
            return response.data;
        })
    }

    async removePlaylist(roomId: number, video_url: string): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId + "/playlist", {
            "video_url": video_url
        }).then(response => {
            return response.data;
        })
    }

    async getVideoState(roomId: number): Promise<string> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/video_state").then(response => {
            return response.data;
        });
    }

    async updateVideoState(roomId: number, videoState: string): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId + "/video_state", {
            "video_state": videoState
        }).then(response => {

        }).catch((err) => {
            console.log(err)
        })
    }

    async getVideoTime(roomId: number): Promise<number> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/video_time").then(response => {
            return response.data;
        });
    }

    async updateVideoTime(roomId: number, videoTime: number): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId + "/video_time", {
            "video_time": videoTime
        }).then(response => {

        }).catch((err) => {
            console.log(err)
        })
    }

    async getVideoUrl(roomId: number): Promise<string> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/video_url").then(response => {
            return response.data;
        });
    }

    async updateVideoUrl(roomId: number, videoUrl: string): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId + "/video_url", {
            "video_url": videoUrl
        }).then(response => {

        }).catch((err) => {
            console.log(err)
        })
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

    async addUserToRoom(roomId: number, userId: number): Promise<void> {
        return axios.post(this.BASE_URL + "/rooms/" + roomId + "/users", {"user_id": userId}).then(response => {
            return response.data;
        });
    }

    async removeUser(userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/users/" + userId).then(response => {
            return response.data;
        });
    } 

    async removeUserFromRoom(roomId: number, userId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId + "/users/" + userId).then(response => {
            return response.data;
        });
    }

    async getUsersInRoom(roomId: number): Promise<User[]> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/users").then(response => {
            return response.data;
        });
    }
}