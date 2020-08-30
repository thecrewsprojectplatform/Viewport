import { Button, Dialog, DialogTitle, List } from '@material-ui/core';
import React, { useState } from 'react';
import { Room } from '../../api/video-room-types';
import "./create-room.scss";
import { RoomListItem } from './room-list-item';

interface Prop {
    availableRooms: Room[];
    onJoinRoomClick: (roomId: string) => void;
}

export const AvailableRoomList = (props: Prop) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="available-room">
            <Button className="room-list-title" onClick={handleClickOpen}>
                Available Rooms
            </Button>
            <Dialog onClose={handleClose} open={open} scroll='body'>
                <DialogTitle>
                    Available Rooms
                </DialogTitle>
                <List className="room-list-item">
                    {
                        (() => {
                            return props.availableRooms.map((room) => {
                                return (
                                    <RoomListItem
                                        key={room.id}
                                        currentRoom={room}
                                        onJoinClick={props.onJoinRoomClick}
                                    />
                                )
                            })

                        })()
                    }
                </List>
            </Dialog>
        </div>
    )
}
