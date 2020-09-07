import { Button } from "@material-ui/core";
import { PlaylistAdd } from "@material-ui/icons";
import React from "react";
import { BaseModal } from "../common/base-modal";
import "./help-modal.scss";

export interface Prop {
    onClose: () => void;
}

export const HelpModal = (props: Prop) => {
    return <BaseModal
        title="About Viewport"
        onClose={props.onClose}
        body={
            <div className="edit-user-modal">
                <p>Watch videos with others at the same time!</p>
                <p>1) Enter a name you want others to see you as</p>
                <p>2) Create or join an existing room</p>
                <p>3) Click the {<i className="material-icons"> <PlaylistAdd /></i>} button and enter the url of the video you want to watch</p>
                <p>4) Click the url that pops up below the searchbar to load the video and start watching</p>
                <p>If a url does not pop up, the url you entered may not be supported or valid</p>
                <form>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="edit-user-button"
                        onClick={props.onClose}
                    >
                        Close
                    </Button>
                </form>
            </div>
        }
    />
}