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
import BookView from './BookView';
import LinkIcon from '@material-ui/icons/Link';


interface BookProps {
    id: number,
    title: string,
    url: string,
    shortUrl: string
    
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

function Book(props: BookProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);


    const handleView = () => {
        setOpen(!open)                
    }
    
    return (
        <Card className={classes.root}>
        <BookView open={open} setOpen={setOpen} {...props} />

            <CardHeader
                classes={{
                    root: classes.cardHeaderRoot,
                    content: classes.cardHeaderContent
                }}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        B
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <LightTooltip title={props.title == null ? "" : props.title}>
                        <Typography noWrap gutterBottom variant="h6" component="h6">
                            {props.title}
                        </Typography>
                    </LightTooltip>
                }
            />
            <CardContent>                  
                    <Button onClick={handleView} color="primary" style={{outline: 'none'}}>View</Button>
                    <Button  href={'#'} color="secondary">Edit</Button>

            </CardContent>

            <CardActions disableSpacing>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <LinkIcon />
                </IconButton>
                

            </CardActions>

        </Card>
    );
}

export default Book