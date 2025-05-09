import '../css/App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LeftCol from "../components/left_col.jsx";
import CenterCol from "../components/center_col.jsx";
import RightCol from "../components/right_col.jsx";

import Card_Styles from "../js_styles/Card_style.js";

import axios from "axios";
import React, {useEffect} from "react";

function fetchExtraRatio() {

    return axios(
        {
            method: 'get',
            url: 'http://localhost:5000/chart/extrap/',
        })
        .then(res => {
            return res;
        })

}

function fetchFixedRatio() {

    return axios(
        {
            method: 'get',
            url: 'http://localhost:5000/chart/fixedp/',
        })
        .then(res => {
            return res;
        })

}

function fetchTotalRatio() {

    return axios(
        {
            method: 'get',
            url: 'http://localhost:5000/chart/totalp/',
        })
        .then(res => {
            return res;
        })

}

function fetchAggregateTags() {

    return axios(
        {
            method: 'get',
            url: 'http://localhost:5000/chart/tags/',
        })
        .then(res => {
            return res;
        })

}

function fetchAggregateMonthlyTags() {

    return axios(
        {
            method: 'get',
            url: 'http://localhost:5000/chart/monthly_tags/',
        })
        .then(res => {
            return res;
        })

}

function SpendingPage() {

    const [extraRatio, setExtraRatio] = React.useState(null);
    const [fixedRatio, setFixedRatio] = React.useState(null);
    const [totalRatio, setTotalRatio] = React.useState(null);
    const [tagsAggr, setTagsAggr] = React.useState(null);
    const [montTagsAggr, setMontTagsAggr] = React.useState(null);


    useEffect(() => {
        const fetchData = async () => {
            if (extraRatio == null) { // da problemi se il ds è vuoto!
                try {
                    const response = await fetchExtraRatio();
                    setExtraRatio(response.data);
                } catch (error) {
                    console.error("Errore nel fetch:", error);
                    setExtraRatio(0)
                }
            }
        };

        fetchData();
    }, [extraRatio]);

    useEffect(() => {
        const fetchData = async () => {
            if (fixedRatio == null) { // da problemi se il ds è vuoto!
                try {
                    const response = await fetchFixedRatio();
                    setFixedRatio(response.data);
                } catch (error) {
                    console.error("Errore nel fetch:", error);
                    setFixedRatio(0)
                }
            }
        };

        fetchData();
    }, [fixedRatio]);

    useEffect(() => {
        const fetchData = async () => {
            if (totalRatio == null) { // da problemi se il ds è vuoto!
                try {
                    const response = await fetchTotalRatio();
                    setTotalRatio(response.data);
                } catch (error) {
                    console.error("Errore nel fetch:", error);
                    setTotalRatio(0)
                }
            }
        };

        fetchData();
    }, [totalRatio]);

    useEffect(() => {
        const fetchData = async () => {
            if (tagsAggr == null) { // da problemi se il ds è vuoto!
                try {
                    const response = await fetchAggregateTags();
                    setTagsAggr(response.data);
                } catch (error) {
                    console.error("Errore nel fetch:", error);
                    setTagsAggr(0)
                }
            }
        };

        fetchData();
        console.log(tagsAggr)
    }, [tagsAggr]);

    useEffect(() => {
        const fetchData = async () => {
            if (montTagsAggr == null) { // da problemi se il ds è vuoto!
                try {
                    const response = await fetchAggregateMonthlyTags();
                    setMontTagsAggr(response.data);
                } catch (error) {
                    console.error("Errore nel fetch:", error);
                    setMontTagsAggr([])
                }
            }
        };

        fetchData();
        console.log(montTagsAggr)
    }, [montTagsAggr]);

    return (
        <div style={Card_Styles.cards_container}>
            <Row className="w-100">

                <Col xs={4}>
                    <div style={Card_Styles.cards}>
                        <LeftCol/>
                    </div>
                </Col>
                <CenterCol montTagsAggr={montTagsAggr} tagsAggr={tagsAggr}/>
                <RightCol fixedRatio={fixedRatio} extraRatio={extraRatio} totalRatio={totalRatio}/>

            </Row>
        </div>
    );
}

export default SpendingPage;
