import React, { Component } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Colors } from "../Colors";
import { Table, Paper, Typography, TableBody, TableCell, TableRow, Modal } from '@material-ui/core';

import { deleteAd } from "../actions/AdsActions";
import AdEdit from './AdEdit';

class AdDetails extends Component {
    state = {
        adModal: false
    }

    handleAdModal = () => {
        if (this.state.adModal) {
            this.setState({ adModal: false });
        } else {
            this.setState({ adModal: true });
        }
    }

    handleDelete = () => {
        this.props.deleteAd(this.props.ad);
        this.props.history.push("/myhub");
    }

    render() { 

        return (
            <>
            <Container>
                <Row>
                    <Col lg={6} className="my-2">
                        <Paper elevation={5} className="p-3" style={{backgroundColor: Colors.second, height: "100%", display: "flex"}}>
                            <Image style={{maxWidth: "100%", alignSelf: "center"}} src={this.props.ad.realEstate.imageUrl}/>
                        </Paper>
                    </Col>
                    <Col lg={6} className="my-2">
                    <Paper elevation={5} style={{ backgroundColor: Colors.second }}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography >Country:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.country}</Typography>
                                                </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell>
                                                    <Typography>City:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.city}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>Street:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.street}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>House Nr:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.houseNr}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>Area:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.area}</Typography>
                                                </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell>
                                                    <Typography>Rooms:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.rooms}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>Floor:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.floor}</Typography>
                                                </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell>
                                                    <Typography>Build year:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.realEstate.buildYear}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>Loan price:</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography align="left">{this.props.ad.loanPrice}€</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                    </Col>
                </Row>
                <Row className="justify-content-center my-3">
                    <Col>
                        <Paper className="py-3" elevation={5} style={{ backgroundColor: Colors.second }}>
                            <Typography variant="h5" align="center">Description</Typography>
                            <Typography className="m-5">{this.props.ad.description}</Typography>
                        </Paper>
                    </Col>
                </Row>
                {
                    this.props.user.id === this.props.ad.ownerId ?
                    <Row className="justify-content-center my-3 align-items-center">
                            <Paper className="py-3" elevation={5} style={{ backgroundColor: Colors.second }}>
                                <Button onClick={ () => this.handleAdModal()} className="m-3" variant="warning">Edit</Button>
                                <Button onClick={() => this.handleDelete()} className="m-3" variant="danger">Delete</Button>
                            </Paper>
                    </Row>
                    :
                    null
                }
            </Container>

            <Modal
                aria-labelledby="adsModal"
                aria-describedby="adsModal-description"
                open={this.state.adModal}
                onClose={this.handleAdModal}
                style={{overflowY: "auto", justifyContent: "center"}}
                >
                <div style={{margin: "5%"}}>
                    <AdEdit onSubmit={() => {this.handleAdModal(); this.props.history.push("/myhub");}}/>
                </div>
            </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        ad: state.adsReducer.ad
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteAd: (ad) => dispatch(deleteAd(ad))
    };
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdDetails));