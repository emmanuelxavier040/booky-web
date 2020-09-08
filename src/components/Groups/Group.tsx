import * as React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { CardContent, Tooltip, Button } from '@material-ui/core';

interface GroupProps {
    id: number,
    context: string
}

const LightTooltip = withStyles((theme: any) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
    root: {
        width: 200,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden"
    }

}));

function Group(props: GroupProps) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>

            <CardHeader
                classes={{
                    root: classes.cardHeaderRoot,
                    content: classes.cardHeaderContent
                }}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        G
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <LightTooltip title={props.context == null ? "" : props.context}>
                        <Typography noWrap gutterBottom variant="h6" component="h6">
                            {props.context}
                        </Typography>
                    </LightTooltip>
                }
            />
            <CardContent>                  
                    <Button href={'/groups/'.concat(props.id+'')} color="primary">View</Button>
                    <Button href={'#'} color="secondary">Edit</Button>
            </CardContent>

            <CardActions disableSpacing>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

            </CardActions>

        </Card>
    );
}

export default Group