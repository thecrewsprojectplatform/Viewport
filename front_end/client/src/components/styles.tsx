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
        flexGrow: 3,
        maxWidth: '15%',
        height: 'calc(75vh - 300px)',
        border: '1px solid #E0E0E0',
    },
    chatHeader: {
        paddingBottom: theme.spacing(2),
        borderBottom: '1px solid #E0E0E0',
        height: '10%',
    },
    displayMessage: {
        background: '#F9F9F9',
        overflowY: 'scroll',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',

        height: '90%',
        padding: '0%',
    },
    formControl: {
        width: '100%',
        height: 20,
        fontSize: '90%'
    },
    videoPlayer: {
        flexGrow: 10,
        textAlign: 'center'
    },
    searchBar: {
        width: '60%'
    },
    userList: {
        flexBasis: 0,
        flexGrow: 2,
        height: 'calc(75vh - 300px)',
        border: '1px solid #E0E0E0',
        maxWidth: '15%',

        overflow: 'hidden',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    userListHeader: {
        paddingBottom: theme.spacing(2),
        borderBottom: '1px solid #E0E0E0',
        height: '10%',
    },
    userListContent: {
        background: '#F9F9F9',
        overflowY: 'scroll',
        height: '90%',
        padding: '0%',
    },
    user: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: 0,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default useStyles;