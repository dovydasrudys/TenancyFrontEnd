import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Container, Row, Col } from "react-bootstrap";

import Typography from '@material-ui/core/Typography';

class ContractInfo extends Component {
    state = {
        rowsPerPage: 5,
        page: 1
    }

    render() {
        return (
            <>
                <Paper elevation={5} style={{ backgroundColor: this.props.primaryColor }}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col>
                                <Typography style={{ marginTop: "8px" }} align="center" variant="h4">{this.props.title}</Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Paper className="m-3" elevation={5} style={{ backgroundColor: this.props.secondaryColor }}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography >Address:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.contract.realEstate.street + " " + this.props.contract.realEstate.houseNr}</Typography>
                                                </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell>
                                                    <Typography>Start date:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.contract.start.slice(0,10)}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>Duration (months):</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.contract.duration}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>Area:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.contract.realEstate.area}</Typography>
                                                </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell>
                                                    <Typography>Rooms:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.contract.realEstate.rooms}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>Floor:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.contract.realEstate.floor}</Typography>
                                                </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell>
                                                    <Typography>Build year:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.contract.realEstate.buildYear}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    </Paper>
                            </Col>
                        </Row>
                    </Container>
                </Paper>
            </>
        );
    }
}

export default ContractInfo;