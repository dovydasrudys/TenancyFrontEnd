import React, { Component } from 'react';
import { connect } from "react-redux";

import { Container, Paper, Modal } from "@material-ui/core";
import { Row, Col, Image } from "react-bootstrap";
import { Colors } from "../../Colors";

import { fetchContractsPayments } from "../../actions/PaymentsActions";
import { fetchContractsFailures, setFailure, createFailure, updateFailure, deleteFailure } from "../../actions/FailuresActions";

import ContractInfo from "../../components/ContractInfo";
import PaymentsTable from "../../components/PaymentsTable";
import FailuresTable from "../../components/FailuresTable";
import FailureEdit from '../../components/FailureEdit';

class Contract extends Component {
    state = {
        failureModal: false,
        paymentModal: false
    }

    componentWillMount() {
        this.props.fetchContractsPayments(this.props.contract.id);
        this.props.fetchContractsFailures(this.props.contract.id);
    }

    handleFailureModal = () => {
        if (this.state.failureModal) {
            this.setState({ failureModal: false });
            this.props.setFailure({});
        } else {
            this.setState({ failureModal: true });
        }
    }

    handleFailureEdit = (failure) => {
        this.props.setFailure(failure);
        this.handleFailureModal();
    }

    handleFailureDelete = (failure) => {
        this.props.deleteFailure(failure);
    }

    render() { 
        const {contract, payments, failures} = this.props;

        return (
            <>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6} className="my-2">
                        <Paper elevation={5} className="p-3" style={{backgroundColor: Colors.second, height: "100%", display: "flex"}}>
                            <Image style={{maxWidth: "100%", alignSelf: "center"}} src={contract.realEstate.imageUrl}/>
                        </Paper>
                    </Col>
                    <Col lg={6} className="my-2">
                        <ContractInfo
                            title="Summary"
                            contract={contract}
                            primaryColor={Colors.second}
                            secondaryColor={Colors.first}
                            accentColor={Colors.third}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={6} className="my-2">
                        <PaymentsTable
                            title="Payments"
                            payments={payments}
                            primaryColor={Colors.second}
                            secondaryColor={Colors.first}
                            accentColor={Colors.third}
                            withAddButton={this.props.user.role === "landlord"}
                            payable={this.props.user.role === "tenant"}
                            onAdd={() => console.log("add")}
                            onPay={(id) => console.log("pay")}
                            editable={this.props.user.role === "landlord"}
                            onEdit={(id) => console.log("edit")}
                            onDelete={(id) => console.log("delete")}
                        />
                    </Col>
                    <Col lg={6} className="my-2">
                        <FailuresTable
                            title="Failures"
                            failures={failures}
                            primaryColor={Colors.second}
                            secondaryColor={Colors.first}
                            accentColor={Colors.third}
                            withAddButton={this.props.user.role === "tenant"}
                            onAdd={this.handleFailureModal}
                            editable={this.props.user.role === "tenant"}
                            onEdit={(failure) => this.handleFailureEdit(failure)}
                            onDelete={(failure) => this.handleFailureDelete(failure)}
                        />
                    </Col>
                </Row>
            </Container>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.failureModal}
                onClose={this.handleFailureModal}
                style={{overflowY: "auto", justifyContent: "center"}}
                >
                <div style={{margin: "5%"}}>
                    <FailureEdit onSubmit={this.handleFailureModal}/>
                </div>
            </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        contract: state.contractsReducer.contract,
        payments: state.paymentsReducer.contractsPayments,
        failures: state.failuresReducer.contractsFailures,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchContractsPayments: (contractId) => dispatch(fetchContractsPayments(contractId)),
        fetchContractsFailures: (contractId) => dispatch(fetchContractsFailures(contractId)),

        setFailure: (failure) => dispatch(setFailure(failure)),
        createFailure: (failure) => dispatch(createFailure(failure)),
        updateFailure: (failure) => dispatch(updateFailure(failure)),
        deleteFailure: (failure) => dispatch(deleteFailure(failure))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps) (Contract);