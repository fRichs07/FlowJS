import '../css/App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarChart from '../charts/barchart.jsx';
import LeftCol from "../components/left_col.jsx";

import Card_Styles from "../js_styles/Card_style.js";
import GaugeChart from '../charts/GaugeChart.jsx';
import LineChart from "../charts/LineChart.jsx";

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


    const sampleData = [
        {date: '2023-1-01', value: 120},
        {date: '2023-1-05', value: 150},
        {date: '2024-1-02', value: 150},
        {date: '2025-2-03', value: 170},
        {date: '2025-3-04', value: 90},
        {date: '2026-4-05', value: 200},
        {date: '2026-5-06', value: 240},

    ];
// -------------------------------------------------------

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
                            <GaugeChart width={100} percentage={0.5}/>
                            <h6>Totali</h6>
                        </div>
                        <div>
                            <GaugeChart width={100} percentage={0.3}/>
                            <h6>Extra</h6>
                        </div>
                        <div>
                            <GaugeChart width={100} percentage={0.2}/>
                            <h6>Fisse</h6>
                        </div>

                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SpendingPage;
