import React, { Component } from "react";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import { Container } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class AdvertsBoard extends Component {
    state = {
        page: 1,
        rowsPerPage: 5,
        anchorEl: null
    }

    handleFirstPageButtonClick = () => {
        this.setState({
            page: 1
        })
    };

    handleBackButtonClick = () => {
        this.setState({
            page: this.state.page - 1
        })
    };

    handleNextButtonClick = () => {
        this.setState({
            page: this.state.page + 1
        })
    };

    handleLastPageButtonClick = () => {
        this.setState({
            page: Math.ceil(this.props.adverts.length / this.state.rowsPerPage)
        })
    };

    render() {

        const { rowsPerPage, page } = this.state;

        return (
            <div>
                <Paper style={{ marginTop: "8px", backgroundColor: this.props.color, textAlign: "center" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell></TableCell> */}
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Rooms</TableCell>
                                <TableCell align="right">Price($)</TableCell>
                                <TableCell align="right">Floor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ textAlign: "center" }}>
                            {(this.state.rowsPerPage > 0
                                ? this.props.adverts.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                : this.props.adverts
                            ).map(row => (
                                <>
                                    <TableRow key={row.id} onClick={() => this.props.onRowClick(row.id)}>
                                        <Card>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe">
                                                        R
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                title="Shrimp and Chorizo Paella"
                                                subheader="September 14, 2016"
                                            />
                                            <CardMedia
                                                
                                                image="http://archtik.lt/wp-content/uploads/2018/09/Svedu-g.-interjeras-originalus-dydis-4-1024x683.jpg"
                                                title="gfd"
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                                </Typography>
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
                                            {/* <TableCell>
                                        <Avatar alt="R" style={{ width: "20px", height: "20px" }} />
                                    </TableCell> */}
                                            {/* <TableCell align="right">{row.location} </TableCell>
                                    <TableCell align="right">{row.rooms}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">{row.floor}</TableCell> */}
                                </TableRow>
                                </>
                                    ))}
                        </TableBody>

                    </Table>
                        <IconButton
                            onClick={this.handleFirstPageButtonClick}
                            disabled={this.state.page === 1}
                            aria-label="first page"
                        >
                            <FirstPageIcon />
                        </IconButton>
                        <IconButton
                            onClick={this.handleBackButtonClick}
                            disabled={this.state.page === 1}
                            aria-label="previous page"
                        >
                            <KeyboardArrowLeft />
                        </IconButton>
                        <IconButton
                            onClick={this.handleNextButtonClick}
                            disabled={this.state.page === Math.ceil(this.props.adverts.length / this.state.rowsPerPage)}
                            aria-label="next page"
                        >
                            <KeyboardArrowRight />
                        </IconButton>
                        <IconButton
                            onClick={this.handleLastPageButtonClick}
                            disabled={this.state.page === Math.ceil(this.props.adverts.length / this.state.rowsPerPage)}
                            aria-label="last page"
                        >
                            <LastPageIcon />
                        </IconButton>
                </Paper>
                    <Popover
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.setState({ anchorEl: null })}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                    >
                        dfsdsf
                </Popover>
            </div>
                );
            }
        }
        
export default AdvertsBoard;