import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    container: {
        width: '50%',

        [theme.breakpoints.down("sm")]: {
            width: '100%',
            height: '40%'
        },
    },
})

export default styles;