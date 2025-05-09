import {StrictMode, useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from "react-router";
import SpendingPage from "./SpendingPage.jsx";
import DonutChartPage from "./test.jsx";
import {IoMenu} from "react-icons/io5";
import Dropdown from 'react-bootstrap/Dropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../js_styles/Navbar_Style.js";
import Flow_colors from "../js_styles/colors.js";

import {FaWind} from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InsertTagPopup from "../components/InsertTagPopup.jsx";
import InsertUserPopup from "../components/InsertUserPopup.jsx";
import InsertAccountPopup from "../components/InsertAccountPopup.jsx";
import InsertMethodPopup from "../components/InsertMethodPopup.jsx";

function App() {

    const [activeModal, setActiveModal] = useState(null); // null | "tag" | "user" | "account" | etc.
    const handleShowModal = (eventKey) => {
        console.log(eventKey);
        if (eventKey === "1") setActiveModal("tag");
        else if (eventKey === "2") setActiveModal("account");
        else if (eventKey === "3") setActiveModal("user");
        else if (eventKey === "4") setActiveModal("method");

        else setActiveModal(null);
    };

    const handleCloseModal = () => setActiveModal(null);
    
    
    return (
        <Router>
            <div style={{backgroundColor: Flow_colors.background_color, minHeight: "100vh"}}>
                {/* Navbar */}
                <div style={Navbar.container}>
                    <div style={Navbar.nav}>
                        <Row>
                            <Col xs={11}>
                                <FaWind size={40} style={{color: Flow_colors.secondary_color, marginLeft: "10px"}}/>
                                <button style={Navbar.nav_button}>
                                    <a href="/spendings" style={{textDecoration: "underlined", color: "white"}}>
                                        Spese
                                    </a>
                                </button>
                                <button style={Navbar.nav_button}>
                                    <a href="/ownings" style={{textDecoration: "underlined", color: "white"}}>
                                        Averi
                                    </a>
                                </button>
                            </Col>
                            <Col xs={1}>
                                <Dropdown onSelect={handleShowModal}>
                                    <Dropdown.Toggle style={{
                                        backgroundColor: Flow_colors.primary_color,
                                        borderWidth: 0,
                                        color: Flow_colors.secondary_color
                                    }}>
                                        <IoMenu size={"2em"}/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{backgroundColor: Flow_colors.background_color}} variant="dark" >
                                        <Dropdown.Item eventKey="1">
                                            Registra tag spesa
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2">
                                            Registra conto</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">Registra utente</Dropdown.Item>
                                        <Dropdown.Item eventKey="4">Registra metodo di pagam.</Dropdown.Item>
                                        <Dropdown.Divider/>
                                        <Dropdown.Item eventKey="5">Separated link</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* Popup Modal */}
                <InsertTagPopup show={activeModal === "tag"} onHide={handleCloseModal} />
                <InsertUserPopup show={activeModal === "user"} onHide={handleCloseModal} />
                <InsertAccountPopup show={activeModal === "account"} onHide={handleCloseModal} />
                <InsertMethodPopup show={activeModal === "method"} onHide={handleCloseModal} />

                {/* Definizione delle rotte */}
                <Routes>
                    <Route path="/spendings" element={<SpendingPage/>}/>
                    <Route path="/ownings" element={<DonutChartPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App/>
    </StrictMode>
);
