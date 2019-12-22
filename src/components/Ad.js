import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Ad extends Component {

    render() {
        const {id, description, loanPrice, realEstate} = this.props.info

        return (
            <>
                <Card key={id} style={this.props.style} elevation={5} onClick={this.props.onClick}>
                    <CardHeader
                        title={`${realEstate.street},${realEstate.houseNr} ${loanPrice}$`}
                        subheader={`Rooms: ${realEstate.rooms} , Floor: ${realEstate.floor}`}
                    />
                    <CardMedia
                        component="img"
                        image={realEstate.imageUrl}
                        title="Image"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{description.length > 40 ? description.slice(0, 35)+"..." : description}</Typography>
                    </CardContent>
                </Card>
            </>
        )

    }
}

export default Ad;