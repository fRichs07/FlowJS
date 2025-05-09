import Card_Styles from "../js_styles/Card_style.js";
import GaugeChart from "../charts/GaugeChart.jsx";
import Col from "react-bootstrap/Col";
import React from "react";

function right_col({totalRatio, extraRatio, fixedRatio}) {


    return (
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
    )
}

export default right_col;