import { Room, User } from "./video-room-types";
import axios from "axios";

export class VideoRoomApi {
    BASE_URL: string

    constructor() {
        this.BASE_URL = "http://127.0.0.1:5000";
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

    async removeRoom(roomId: number): Promise<void> {
        return axios.delete(this.BASE_URL + "/rooms/" + roomId).then(response => {
            return response.data;
        });
    }

    async createUser(name: string): Promise<User> {
        return axios.post(this.BASE_URL + "/users", {"name": name}).then(response => {
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
        //console.log(this.BASE_URL + "/rooms/" + roomId + "/users");
        return axios.get(this.BASE_URL + "/rooms/" + roomId + "/users").then(response => {
            return response.data;
        });
    }
}