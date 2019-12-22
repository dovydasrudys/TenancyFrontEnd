import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import { fetchMyContracts, setContract, deleteContract } from "../../actions/ContractActions";
import { fetchMyRealEstates, setRealEstate, deleteRealEstate } from "../../actions/RealEstateActions";
import { fetchMyAds, setAd } from "../../actions/AdsActions";

import ContractsTable from "../../components/ContractsTable";
import RealEstatesTable from "../../components/RealEstatesTable";
import AdsBoard from "../../components/AdsBoard";
import RealEstateEdit from "../../components/RealEstateEdit";

import { Colors } from "../../Colors";
import { Modal } from '@material-ui/core';
import ContractEdit from '../../components/ContractEdit';
import AdEdit from '../../components/AdEdit';

class MyHub extends Component {
    state = {
        realEstateModal: false,
        contractModal: false,
        adModal: false
    }

    componentWillMount() {
        this.updateData();
    }

    updateData = () => {
        this.props.fetchMyContracts();
        this.props.fetchMyRealEstates();
        this.props.fetchMyAds();
    }

    handleContractManage = (contract) => {
        this.props.setContract(contract);
        this.props.history.push("/contract");
    }

    handleAdClick = (ad) => {
        this.props.setAd(ad);
        this.props.history.push("/ad");
    }

    handleRealEstateModal = () => {
        if (this.state.realEstateModal) {
            this.setState({ realEstateModal: false });
            this.props.setRealEstate({});
        } else {
            this.setState({ realEstateModal: true });
        }
    }

    handleRealEstateEdit = (realEstate) => {
        this.props.setRealEstate(realEstate);
        this.handleRealEstateModal();
    }

    handleRealEstateDelete = (id) => {
        this.props.deleteRealEstate(id);
    }

    handleContractModal = () => {
        if (this.state.contractModal) {
            this.setState({ contractModal: false });
            this.props.setContract({});
        } else {
            this.setState({ contractModal: true });
        }
    }

    handleContractEdit = (contract) => {
        this.props.setContract(contract);
        this.handleContractModal();
    }

    handleContractDelete = (contract) => {
        this.props.deleteContract(contract);
    }

    handleAdModal = () => {
        if (this.state.adModal) {
            this.setState({ adModal: false });
            this.props.setAd({});
        } else {
            this.setState({ adModal: true });
        }
    }

    render() {
        return (
            <>
                <Container style={{ marginBottom: "50px" }}>
                    <Row className="justify-content-center">
                        <Col lg={6} style={{ marginTop: "50px" }}>
                            <ContractsTable
                                title="My contracts"
                                contracts={this.props.myContracts}
                                primaryColor={Colors.second}
                                secondaryColor={Colors.first}
                                accentColor={Colors.third}
                                withAddButton={this.props.user.role === "landlord"}
                                onAdd={() => this.handleContractModal()}
                                editable={this.props.user.role === "landlord"}
                                onEdit={(contract) => this.handleContractEdit(contract)}
                                onDelete={(contract) => this.handleContractDelete(contract)}
                                onManage={(contract) => this.handleContractManage(contract)}
                            />

                        </Col>
                        <Col lg={6} style={{ marginTop: "50px" }}>
                            <RealEstatesTable
                                title="My real estates"
                                realEstates={this.props.myRealEstates}
                                primaryColor={Colors.second}
                                secondaryColor={Colors.first}
                                accentColor={Colors.third}
                                withAddButton={this.props.user.role === "landlord"}
                                onAdd={() => this.handleRealEstateModal()}
                                editable={this.props.user.role === "landlord"}
                                onEdit={(realEstate) => this.handleRealEstateEdit(realEstate)}
                                onDelete={(id) => this.handleRealEstateDelete(id)}
                            ></RealEstatesTable>
                        </Col>
                    </Row>

                    <Row className="justify-content-center" style={{ marginTop: "50px" }}>
                        <Col>
                            <AdsBoard
                                title="My advertisements"
                                adverts={this.props.myAds}
                                onAdClick={(ad) => this.handleAdClick(ad)}
                                primaryColor={Colors.second}
                                secondaryColor={Colors.first}
                                withAddButton
                                onAdd={() => this.handleAdModal()}
                            >
                            </AdsBoard>
                        </Col>
                    </Row>

                </Container>

                <Modal
                    aria-labelledby="realEstatesModal"
                    aria-describedby="realEstatesModal-description"
                    open={this.state.realEstateModal}
                    onClose={this.handleRealEstateModal}
                    style={{overflowY: "auto", justifyContent: "center"}}
                >
                    <div style={{margin: "5%"}}>
                        <RealEstateEdit onSubmit={this.handleRealEstateModal}/>
                    </div>
                </Modal>

                <Modal
                    aria-labelledby="contractsModal"
                    aria-describedby="contractsModal-description"
                    open={this.state.contractModal}
                    onClose={this.handleContractModal}
                    style={{overflowY: "auto", justifyContent: "center"}}
                >
                    <div style={{margin: "5%"}}>
                        <ContractEdit onSubmit={this.handleContractModal}/>
                    </div>
                </Modal>

                <Modal
                    aria-labelledby="adsModal"
                    aria-describedby="adsModal-description"
                    open={this.state.adModal}
                    onClose={this.handleAdModal}
                    style={{overflowY: "auto", justifyContent: "center"}}
                >
                    <div style={{margin: "5%"}}>
                        <AdEdit onSubmit={this.handleAdModal}/>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        myContracts: state.contractsReducer.myContracts,
        myRealEstates: state.realEstatesReducer.myRealEstates,
        myAds: state.adsReducer.myAds,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMyContracts: () => dispatch(fetchMyContracts()),
        setContract: (contract) => dispatch(setContract(contract)),
        deleteContract: (contract) => dispatch(deleteContract(contract)),

        fetchMyRealEstates: () => dispatch(fetchMyRealEstates()),
        setRealEstate: (realEstate) => dispatch(setRealEstate(realEstate)),
        deleteRealEstate: (id) => dispatch(deleteRealEstate(id)),

        fetchMyAds: () => dispatch(fetchMyAds()),
        setAd: (ad) => dispatch(setAd(ad)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyHub));