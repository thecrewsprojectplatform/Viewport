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

    async updateRoomName(roomId: number, name: string) : Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId, {
            "name": name
        }).then(response => {
            console.log("updated room name to: " + name)
        }).catch((err) => {
            console.log(err)
        })
    }

    async updateRoomVideoUrl(roomId: number, name: string, video_url: string) : Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId, {
            "video_url": video_url
        }).then(response => {
            console.log("updated room video url to: " + video_url)
        }).catch((err) => {
            console.log(err)
        })
    }

    async updateRoomVideoState(roomId: number, name: string, video_state: string) : Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId, {
            "video_state": video_state
        }).then(response => {
            console.log("updated room video_state to: " + video_state)
        }).catch((err) => {
            console.log(video_state)
            console.log(err)
        })
    }

    async updateRoom(roomId: number, name: string, video_id: string, video_url: string, video_state: string, video_time: number): Promise<void> {
        return axios.put(this.BASE_URL + "/rooms/" + roomId, {
            "name": name,
            "video_id": video_id,
            "video_url": video_url,
            "video_state": video_state,
            "video_time": video_time
        }).then(response => {
            //console.log("room updated succesfully")
            //console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    async createUser(name: string): Promise<User> {
        console.log("Creating User...")
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