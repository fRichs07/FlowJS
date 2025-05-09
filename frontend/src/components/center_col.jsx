import Col from "react-bootstrap/Col";
import Card_Styles from "../js_styles/Card_style.js";
import React from "react";
import BarchartTag from "../charts/BarchartTag.jsx";
import MonthlyExpensesChart from "../charts/BarTime.jsx";


function center_col({tagsAggr, montTagsAggr}) {

    const showTagsChart = () => {
        if (tagsAggr) {

            return <BarchartTag data={tagsAggr} width={450} height={250}/>
        }
        return null
    }

    const showMonthTagsChart = () => {
        if (montTagsAggr) {

            return <MonthlyExpensesChart data={montTagsAggr} width={450} height={250}/>
        }
        return null
    }


    return (
        <Col xs={5}>
            {/*Chart "spese per metodo"*/}
            <div style={{...Card_Styles.cards, height: "41.5vh"}}>
                <h5>Spese per metodo</h5>
                {showTagsChart()}
            </div>

            {/*Chart "spese per categoria"*/}
            <div style={{...Card_Styles.cards, height: "41.7vh"}}>
                <h5>Spese per categoria</h5>
                {showMonthTagsChart()}
            </div>
        </Col>
    )
}

export default center_col;