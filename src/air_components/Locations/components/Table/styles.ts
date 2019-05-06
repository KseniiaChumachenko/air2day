import {Theme} from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
    root: {
        width: '50%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto' as 'auto',
    },
    table: {
        minWidth: 700,
    },
})

export default styles;