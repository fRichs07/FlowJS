import '../css/App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarChart from '../charts/barchart.jsx';
import LeftCol from "../components/left_col.jsx";

import Card_Styles from "../js_styles/Card_style.js";
import GaugeChart from '../charts/GaugeChart.jsx';
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

function SpendingPage() {

// Dati simulati per rappresentare le spese nel tempo

    const data = [
        {label: 'Tabacco', value: 40},
        {label: 'Bollette', value: 80},
        {label: 'Casa', value: 45},
        {label: 'Cibo', value: 60},
        {label: 'Vestiti', value: 20},
        {label: 'Extra', value: 90},
        {label: 'Animali', value: 50},
    ];
// -------------------------------------------------------
    const [extraRatio, setExtraRatio] = React.useState(null);
    const [fixedRatio, setFixedRatio] = React.useState(null);
    const [totalRatio, setTotalRatio] = React.useState(null);

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
    }, [setTotalRatio]);

    return (
        <div style={Card_Styles.cards_container}>
            <Row className="w-100">
                {/*Prima colonna SX*/}
                <Col xs={4}>
                    <div style={Card_Styles.cards}>
                        <LeftCol/>
                    </div>
                </Col>

                {/*Colonna centrale*/}
                <Col xs={5}>
                    {/*Chart "spese per metodo"*/}
                    <div style={{...Card_Styles.cards, height: "49%"}}>
                        <h5>Spese per metodo</h5>
                        <BarChart data={data} width={450} height={250}/>
                    </div>

                    {/*Chart "spese per categoria"*/}
                    <div style={{...Card_Styles.cards, height: "49%"}}>
                        <h5>Spese per categoria</h5>
                        <BarChart data={data} width={450} height={250}/>
                    </div>
                </Col>

                {/*Terza colonna DX*/}
                <Col xs={3}>

                    <div style={Card_Styles.GaugeCards}>
                        <h4>Percentuali di spese e risparmi </h4>

                        <div>
                            <GaugeChart width={100} percentage={totalRatio}/>
                            <h6>Totali</h6>
                        </div>
                        <div>
                            <GaugeChart width={100} percentage={extraRatio}/>
                            <h6>Extra</h6>
                        </div>
                        <div>
                            <GaugeChart width={100} percentage={fixedRatio}/>
                            <h6>Fisse</h6>
                        </div>

                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SpendingPage;
