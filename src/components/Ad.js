import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Ad extends Component {

    render() {
        const {id, location, rooms, floor, price, img, description} = this.props.info

        return (
            <>
                <Card key={id} style={this.props.style} elevation={5} onClick={this.props.onClick}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={`${location} ${price}$`}
                        subheader={`Rooms: ${rooms} , Floor: ${floor}`}
                    />
                    <CardMedia
                        component="img"
                        image={img}
                        title="gfd"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </>
        )

    }
}

export default Ad;