import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';

import { Container, Row, Col } from "react-bootstrap";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from 'react-bootstrap';

class PaymentsTable extends Component {
    state = {
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

    render() {
        const { rowsPerPage, page } = this.state;
        return (
            <>
                <Paper elevation={5} style={{ backgroundColor: this.props.primaryColor }}>
                    <Container>
                        <Row noGutters className="justify-content-center">
                            <Col>
                                <Typography style={{ marginTop: "8px" }} align="center" variant="h4">{this.props.title}</Typography>
                            </Col>
                            {this.props.withAddButton ?
                                <Col xs={1}>
                                    <IconButton
                                        onClick={this.props.onAdd}
                                        aria-label="add payment"

                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Col>
                                : null}
                        </Row>
                        <Row noGutters>
                            <Col>
                                {(this.state.rowsPerPage > 0
                                    ? this.props.payments.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                    : this.props.payments
                                ).map(payment => (
                                    <ExpansionPanel key={payment.id} style={{ backgroundColor: (payment.status ? this.props.secondaryColor : this.props.accentColor) }}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id={payment.id}
                                        >
                                            <Typography style={{ width: "100%" }} align="center">{payment.issueDate.slice(0, 10)}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Container>
                                                <Row className="my-3">
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

                                                        </TableBody>
                                                    </Table>
                                                </Row>
                                                <Row style={{ textAlign: "right" }}>
                                                    {this.props.editable ?
                                                        <>
                                                            <Col>
                                                                <Button className="mx-1" variant="warning" onClick={() => this.props.onEdit(payment)}>Edit</Button>

                                                                <Button className="mx-1" variant="danger" onClick={() => this.props.onDelete(payment)}>Delete</Button>
                                                            </Col>
                                                        </>
                                                        :
                                                        null}
                                                    {payment.paymentStatus === 1 || !this.props.payable ? null :

                                                        <Button onClick={() => this.props.onPay(payment)}>Pay</Button>
                                                    }
                                                </Row>
                                            </Container>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>))}
                            </Col>
                        </Row>
                        <Row className="justify-content-center align-items-center">
                            {this.paginator()}
                        </Row>
                    </Container>
                </Paper>
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
                    disabled={this.state.page >= Math.ceil(this.props.payments.length / this.state.rowsPerPage)}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={this.state.page >= Math.ceil(this.props.payments.length / this.state.rowsPerPage)}
                    aria-label="last page"
                >
                    <LastPageIcon />
                </IconButton>
            </>
        );
    }
}

export default PaymentsTable;