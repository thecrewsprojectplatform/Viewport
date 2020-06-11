import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createUser } from "../../store/video-room/video-room";
import { ApiContext } from "..";
import { VideoRoomApi } from "../../api/video-room-api";
import { store } from "../../store";
import { TextField, CssBaseline, Button } from "@material-ui/core";
import useStyles from "../styles";

/**
 * Represents the required properties of the LoginPage.
 */
export interface Prop {
    setPage: () => void;
}

/**
 * Represents the login page. Users input their username in a textbox and
 * go to the join/create room page.
 * 
 * @param {Object} props An object representing the require properties of
 *                 the login page. Contains a setPage function.
 * @returns {JSX.Element} The JSX representing the login page.
 */

export const LoginPage = (props: Prop) => {
    const classes = useStyles();
    const [newUserName, setNewUserName] = useState("");
    const api = useContext<VideoRoomApi>(ApiContext);

    const createNewUserClick = (): void => {
        store.dispatch(createUser(api, newUserName));
    }

    const handleChange = (event): void => {
        setNewUserName(event.target.value);
    }

    const handleSubmit = (event): void => {
        createNewUserClick();
        props.setPage();
        event.preventDefault();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.login}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Multimedia Platform
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="off"
                        autoFocus
                    
                        type="text" 
                        onChange={handleChange}
                        value={newUserName}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    )
}

/**
 * Used to connect the state of the overall front end to the LoginPage.
 * 
 * @param {Object} state The current state of the LoginPage.
 */
const mapStateToProps = state => {
    return {
        
    }
}

export const LoginPageR = connect(mapStateToProps)(LoginPage);