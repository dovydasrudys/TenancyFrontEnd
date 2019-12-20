import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Ad from "./Ad";
import { Typography } from "@material-ui/core";

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
            <Paper elevation={5} style={{backgroundColor: this.props.primaryColor}}>
                <Container>
                    <Row className="justify-content-center" style={{margin: "4px"}}>
                        <Typography variant="h4">{this.props.title}</Typography>
                    </Row>
                    <Row>
                        {(this.state.rowsPerPage > 0
                            ? this.props.adverts.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                            : this.props.adverts
                        ).map(row => (
                            <Col key={row.id} lg={6} style={{ padding: "0px" }}>
                                <Ad style={{ margin: "4px", backgroundColor: this.props.secondaryColor }} info={row} onClick={() => this.props.onAdClick(row.id)}></Ad>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center align-items-center">
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
        <Typography variant="h6">{this.state.page}</Typography>
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