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

class ContractsTable extends Component {
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
            page: Math.ceil(this.props.contracts.length / this.state.rowsPerPage)
        })
    };

    render() {
        const { rowsPerPage, page } = this.state;
        return (
            <>
                <Paper elevation={5} style={{ backgroundColor: this.props.primaryColor }}>
                    <Container style={{height: "100%"}}>
                        <Row noGutters className="justify-content-center">
                            <Col>
                                <Typography style={{ marginTop: "8px" }} align="center" variant="h4">{this.props.title}</Typography>
                            </Col>
                            {this.props.withAddButton ?
                                <Col xs={1}>
                                    <IconButton
                                        onClick={this.props.onAdd}
                                        aria-label="add contract"

                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Col>
                                : null}
                        </Row>
                        <Row>
                            <Col>
                                {(this.state.rowsPerPage > 0
                                    ? this.props.contracts.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                    : this.props.contracts
                                ).map(contract => (
                                    <ExpansionPanel key={contract.id} style={{ backgroundColor: this.props.secondaryColor }}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id={contract.id}
                                        >
                                            <Typography style={{ width: "50%" }} align="center">{contract.realEstate.street + ", " + contract.realEstate.houseNr}</Typography>
                                            <Typography style={{ width: "50%" }} align="center">{contract.start.slice(0, 10)}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Container>
                                                <Row className="my-3">
                                                    <Table aria-label="simple table">
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>Contract Id</Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography>{contract.id}</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>Monthly price</Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography>{contract.price}€</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>Starting date</Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography>{contract.start.slice(0, 10)}</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>Duration in months</Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography>{contract.duration}</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>Tenant</Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography>{contract.tenant.firstName + " " + contract.tenant.lastName}</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography>Real estate Id</Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography>{contract.realEstate.id}</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Row>
                                                <Row style={{ textAlign: "right" }}>
                                                <Col>
                                                    {this.props.editable ?
                                                            <>
                                                                <Button className="mx-1" variant="warning" onClick={() => this.props.onEdit(contract)}>Edit</Button>

                                                                <Button className="mx-1" variant="danger" onClick={() => this.props.onDelete(contract)}>Delete</Button>
                                                                </>
                                                        :
                                                        null}
                                                        <Button className="mx-1" variant="primary" onClick={() => this.props.onManage(contract)}>Manage</Button>
                                                            </Col>
                                                
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
                    disabled={this.state.page >= Math.ceil(this.props.contracts.length / this.state.rowsPerPage)}
                    aria-label="next page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={this.state.page >= Math.ceil(this.props.contracts.length / this.state.rowsPerPage)}
                    aria-label="last page"
                >
                    <LastPageIcon />
                </IconButton>
            </>
        );
    }
}

export default ContractsTable;