import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Row, Col } from 'react-bootstrap';
import { Colors } from "../Colors";

import AdsBoard from '../components/AdsBoard';

import { fetchAds, setAd } from "../actions/AdsActions";

class Home extends Component {
    state = {  }

    componentWillMount() {
        this.props.fetchAds();
    }

    handleAdClick = (ad) => {
        this.props.setAd(ad);
        this.props.history.push("/ad");
    }

    render() { 
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col>
                        <AdsBoard
                        title="Advertisements"
                        adverts={this.props.ads}
                        color={Colors.third}
                        onAdClick={(ad) => this.handleAdClick(ad)}
                        primaryColor={Colors.second}
                        secondaryColor={Colors.first}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
const mapStateToProps = state => {
    return { ads: state.adsReducer.ads };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchAds: () => dispatch(fetchAds()),
        setAd: (ad) => dispatch(setAd(ad)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));