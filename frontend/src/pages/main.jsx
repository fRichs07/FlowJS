import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpendingPage from "./SpendingPage.jsx";
import DonutChartPage from "./test.jsx"; // Crea una home di esempio

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../js_styles/Navbar_Style.js";
import Flow_colors from "../js_styles/colors.js";

import { FaWind } from "react-icons/fa";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Router>
            <div style={{ backgroundColor: Flow_colors.background_color, minHeight: "100vh" }}>
                {/* Navbar */}
                <div style={Navbar.container}>
                    <div style={Navbar.nav}>
                        <FaWind size={40} style={{ color: Flow_colors.secondary_color, marginLeft: "10px" }} />
                    </div>
                </div>

                {/* Definizione delle rotte */}
                <Routes>
                    <Route path="/" element={<SpendingPage />} />
                    <Route path="/test" element={<DonutChartPage />} />
                </Routes>
            </div>
        </Router>
    </StrictMode>
);
