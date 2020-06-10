import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    login: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    form2: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
    },
    videoRoom: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
    },
    chatApp: {
        flexBasis: 0,
        flexGrow: 3
    },
    formControl: {
        width: '90%',
        height: 20,
        fontSize: '90%'
    },
    videoPlayer: {
        flexGrow: 10,
        textAlign: 'center'
    },
    userList: {
        flexBasis: 0,
        flexGrow: 2
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default useStyles;