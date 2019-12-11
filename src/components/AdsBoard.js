import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
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

import Ad from "./Ad";

class AdsBoard extends Component {
    state = {
        page: 1,
        rowsPerPage: 4,
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
            <Paper>
                <Container>
                    <Row>
                        {(this.state.rowsPerPage > 0
                            ? this.props.adverts.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                            : this.props.adverts
                        ).map(row => (
                            <Col lg={6} style={{ padding: "0px" }}>
                                <Ad style={{ margin: "2px" }} info={row}></Ad>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center">
                        {this.paginator()}
                    </Row>
                </Container>
            </Paper>

        );
    }

    paginator() {
        return (
            <>
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
            </>
        );
    }
}

export default AdsBoard;