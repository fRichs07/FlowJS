import Card_Styles from "../js_styles/Card_style.js";
import GaugeChart from "../charts/GaugeChart.jsx";
import Col from "react-bootstrap/Col";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function right_col({totalRatio, extraRatio, fixedRatio}) {


    return (
        <Container >
            <Row style={{...Card_Styles.cards, height: "41.5vh", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                <Col>
                    <div style={{flexDirection: "column", alignItems: "center" }}>
                        <h6>Totali</h6>

                        <GaugeChart width={120} percentage={totalRatio} />
                    </div>
                </Col>
                <Col>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <GaugeChart width={100} percentage={extraRatio} />
                        <h6>Extra</h6>
                    </div>
                </Col>
                <Col>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <GaugeChart width={100} percentage={fixedRatio} />
                        <h6>Fisse</h6>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default right_col;