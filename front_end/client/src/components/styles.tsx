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
        height: '80vh',
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
    },
    joinRoom: {
        flex: 1
    },
    chatApp: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexBasis: '20%',
        height: '87vh',
        border: '1px solid #E0E0E0',
        borderRadius: '10px',
        overflow: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    chatHeader: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: theme.spacing(1),
        height: theme.spacing(5),
        flex: 'none',
        borderBottom: '1px solid #E0E0E0',
        background: '#E3E3E3',
        fontSize: '100%',
    },
    displayMessage: {
        flex: 'auto',
        background: '#F9F9F9',
        overflowY: 'scroll',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    typingSection: {
        flex: 'none',
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    formControl: {
        width: '100%',
        fontSize: '90%',
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    textField: {
        height: theme.spacing(4),
    },
    videoPlayer: {
        marginLeft: '1%',
        marginRight: '1%',
        flex: 1,
        flexBasis: '60%',
        textAlign: 'center',
    },
    searchBar: {
        width: '70%'
    },
    userList: {
        display: 'block',
        flex: 'none',
        height: '50vh',
        width: '200px',
        marginBottom: '3%',
        border: '1px solid #E0E0E0',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        overflowX: 'scroll',
    },
    userListHeader: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: theme.spacing(1),
        height: theme.spacing(3.5),
        background: '#E3E3E3',
        borderBottom: '1px solid #E0E0E0',
        fontSize: '100%',
    },
    userListContent: {
        background: '#F9F9F9',
        overflowY: 'scroll',
        height: '90%',
    },
    userName: {
        minWidth: 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '80%%',
        marginLeft: '1%',
        marginRight: '1%',
    },
    user: {
        overflow: 'hidden',
        minWidth: 0,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default useStyles;