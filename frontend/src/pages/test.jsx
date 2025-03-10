import React from "react";
import DonutChartLabels from "../charts/BarTime.jsx"; // Assicurati del percorso corretto

const DonutChartPage = () => {
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Donut Chart</h1>
            <DonutChartLabels width={600} height={400} />
        </div>
    );
};

export default DonutChartPage;
