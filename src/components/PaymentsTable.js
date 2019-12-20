import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';

import { Container, Row, Col } from "react-bootstrap";

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Modal } from 'react-bootstrap';

class PaymentsTable extends Component {
    state = {
        showModal: false,
        payment: {},
        rowsPerPage: 5,
        page: 1
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
            page: Math.ceil(this.props.payments.length / this.state.rowsPerPage)
        })
    };

    handleClose = () => this.setState({ showModal: false });
    handleShow = () => this.setState({ showModal: true });
    pay = (p) => {
        this.handleShow();
        this.setState({ payment: p });
    }

    useStyles = makeStyles({
        expanded: {
            margin: "0 auto"
        }
    });

    paypalOptions = {
        clientId: '12345',
        intent: 'capture'
    }

    buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
    }

    

    render() {
        const { rowsPerPage, page } = this.state;
        return (
            <>
                <Paper elevation={5} style={{backgroundColor: this.props.primaryColor}}>
                    <Container>
                        <Row className="justify-content-center" style={{ margin: "8px" }}>
                            <Col>
                            <Typography align="center" variant="h4">{this.props.title}</Typography>
                            </Col>
                            <Col xs={1}>
                            <IconButton
                    onClick={this.props.handleAdd}
                    aria-label="add payment"
                    
                >
                    <AddIcon />
                </IconButton>
                </Col>
                        </Row>
                        <Row>
                            <Col>
                                {(this.state.rowsPerPage > 0
                                    ? this.props.payments.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                    : this.props.payments
                                ).map(payment => (
                                    <ExpansionPanel key={payment.id} style={{backgroundColor: this.props.secondaryColor}}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id={payment.id}
                                        >
                                            <Typography>{payment.issueDate}</Typography>
                                            <Typography>{payment.status}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Table aria-label="simple table">
                                                <TableBody>
                                                    {payment.services.map(service => (
                                                        <TableRow key={service.id}>
                                                            <TableCell component="th" scope="row">
                                                                #{service.id}
                                                            </TableCell>
                                                            <TableCell>{service.description}</TableCell>
                                                            <TableCell align="right">{service.amount}€</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell colSpan={2} align="right">Sum:</TableCell>
                                                        <TableCell align="right">{payment.services.map(service => service.amount).reduce((a, b) => a + b, 0)}€</TableCell>
                                                    </TableRow>
                                                    {payment.status ? null :
                                                        <TableRow>
                                                            <TableCell colSpan={3} align="right">
                                                                <Button onClick={() => this.pay(payment)}>Pay here</Button>
                                                            </TableCell>
                                                        </TableRow>}
                                                </TableBody>
                                            </Table>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>))}
                            </Col>
                        </Row>
                        <Row className="justify-content-center align-items-center">
                            {this.paginator()}
                        </Row>
                    </Container>
                </Paper>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.payment.issueDate}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                  </Button>
                    </Modal.Footer>
                </Modal>
            </>
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
                    disabled={this.state.page === Math.ceil(this.props.payments.length / this.state.rowsPerPage)}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={this.state.page === Math.ceil(this.props.payments.length / this.state.rowsPerPage)}
                    aria-label="last page"
                >
                    <LastPageIcon />
                </IconButton>
            </>
        );
    }
}

export default PaymentsTable;