import { Room, User } from "./video-room-types";
import axios from "axios";

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

    async getRoom(roomId: number): Promise<Room> {
        return axios.get(this.BASE_URL + "/rooms/" + roomId).then(response => {
            return response.data;
        })
    }

    async removeRoom(roomId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId).then(response => {
            return response.data;
        });
    }

    async updateRoom(roomId: number, name: string, videoId: string, videoUrl: string, videoState: string, videoTime: number, videoLength: number): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId, {
            "name": name,
            "video_id": videoId,
            "video_url": videoUrl,
            "video_state": videoState,
            "video_time": videoTime,
            "video_length": videoLength
        }).then(response => {
            //console.log("room updated succesfully")
            //console.log(response.data)
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