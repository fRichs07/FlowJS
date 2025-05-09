import React, {useEffect} from "react";
import Card_Styles from "../js_styles/Card_style.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LineChart from "../charts/LineChart.jsx";
import ButtonGroup_style from "../js_styles/ButtonGroup.js";
import DataTable from "react-data-table-component";
import Dataset_style from "../js_styles/Dataset_style.js";
import Container from "react-bootstrap/Container";
import Flow_colors from "../js_styles/colors.js"; // Assicurati del percorso corretto

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


const fakeData1 = [
    {date: '2025-04-01', value: 1},
    {date: '2025-04-02', value: 12},
    {date: '2025-04-03', value: 8},
    {date: '2025-04-04', value: 14},
    {date: '2025-04-05', value: 6},
    {date: '2025-04-06', value: 9},
    {date: '2025-04-07', value: 13},
    {date: '2025-04-08', value: 7},
    {date: '2025-04-09', value: 11},
    {date: '2025-04-10', value: 10},
];
const fakeData2 = [
    {date: '2025-04-01', value: 2},
    {date: '2025-04-02', value: 12},
    {date: '2025-04-03', value: 8},
    {date: '2025-04-04', value: 14},
    {date: '2025-04-05', value: 6},
    {date: '2025-04-06', value: 9},
    {date: '2025-04-07', value: 13},
    {date: '2025-04-08', value: 7},
    {date: '2025-04-09', value: 11},
    {date: '2025-04-10', value: 10},
];
const fakeData3 = [
    {date: '2025-04-01', value: 3},
    {date: '2025-04-02', value: 12},
    {date: '2025-04-03', value: 8},
    {date: '2025-04-04', value: 14},
    {date: '2025-04-05', value: 6},
    {date: '2025-04-06', value: 9},
    {date: '2025-04-07', value: 13},
    {date: '2025-04-08', value: 7},
    {date: '2025-04-09', value: 11},
    {date: '2025-04-10', value: 10},
];

const fakeTableData = [
    {
        who: "Alice",
        category: "Spesa",
        date: "2025-04-01",
        amount: 34.50,
    },
    {
        who: "Bob",
        category: "Entrata",
        date: "2025-04-02",
        amount: 120.00,
    },
    {
        who: "Claudia",
        category: "Spesa",
        date: "2025-04-03",
        amount: 15.99,
    },
    {
        who: "Davide",
        category: "Spesa",
        date: "2025-04-04",
        amount: 87.25,
    },
    {
        who: "Elisa",
        category: "Entrata",
        date: "2025-04-05",
        amount: 200.00,
    },
    {
        who: "Fabio",
        category: "Spesa",
        date: "2025-04-06",
        amount: 45.75,
    },
    {
        who: "Giulia",
        category: "Entrata",
        date: "2025-04-07",
        amount: 150.00,
    },
    {
        who: "Luca",
        category: "Spesa",
        date: "2025-04-08",
        amount: 23.10,
    },
    {
        who: "Martina",
        category: "Spesa",
        date: "2025-04-09",
        amount: 66.60,
    },
    {
        who: "Nico",
        category: "Entrata",
        date: "2025-04-10",
        amount: 90.00,
    },
];

const fake_accounts = [
    {name: 'Account 1', value: 100, data: fakeData1, movements: fakeTableData},
    {name: 'Account 2', value: 1200, data: fakeData2, movements: fakeTableData},
    {name: 'Account 3', value: 800, data: fakeData3, movements: fakeTableData},
]
const columns = [
    {
        name: "Utente",
        selector: (row) => row.who,
        wrap: true // permette di andare a capo se necessario
    },
    {
        name: "Tipo",
        selector: (row) => row.category,
        wrap: true
    },
    {
        name: "Data",
        selector: (row) => row.date,
        wrap: true
    },
    {
        name: "$",
        selector: (row) => row.amount,
        wrap: true
    }
];


const DonutChartPage = () => {

    const [selected_account, setSelectedAccount] = React.useState(fake_accounts[0]);

    // Creiamo tanti bottoni quanti sono gli account disponibili
    function generate_account_buttons(accounts) {
        return accounts.map(account => {
            return (
                <Dropdown.Item style={{}} onClick={() => {
                    setSelectedAccount(account)
                }}>
                    {account.name}
                </Dropdown.Item >
            )
        })
    }

    return (
        <div style={{...Card_Styles.cards_container}}>
            <Row>
                <Col xs={4}>
                    <div style={{paddingLeft: "30px", color: Flow_colors.secondary_color}}>

                        <Dropdown as={ButtonGroup}>
                            <h2>{selected_account.name}</h2>

                            <Dropdown.Toggle split id="dropdown-split-basic" style={{backgroundColor:Flow_colors.background_color, borderWidth:0}} size={"lg"}/>

                            <Dropdown.Menu>
                                {generate_account_buttons(fake_accounts)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Col>

                <Col xs={4}>
                    <div style={{paddingLeft: "30px", color: Flow_colors.secondary_color}}>
                        <h2>Depositati:<span style={{color:Flow_colors.text_color}}>{selected_account.value}</span></h2>
                    </div>
                </Col>

                <Col xs={4}>
                    <div style={{paddingLeft: "30px", color: Flow_colors.secondary_color}}>
                        <h2>Bilancio(mese) :<span style={{color:Flow_colors.text_color}}>{selected_account.value}</span></h2>
                    </div>
                </Col>
            </Row>
            <Row className="w-100">

                <Col xs={4}>
                    <div style={{
                        ...Card_Styles.cards_flex,
                        alignItems: "left",
                        height: "38vh"
                    }}>
                        <h3>Dati sui guadagni</h3>
                        <h4>Giacenza Media: {selected_account.value}</h4>
                        <h4>Trend: {selected_account.value}</h4>
                        <h4>Stato: {selected_account.value}</h4>
                    </div>
                </Col>

                <Col xs={8}>

                    <Row>
                        <Col xs={6}>


                            <div style={{...Card_Styles.cards_flex, height: "40vh"}}>
                                <Container className="left_col">
                                    <DataTable
                                        className="custom-datatable"
                                        columns={columns}
                                        data={selected_account.movements}
                                        pagination
                                        paginationPerPage={4} // Numero massimo di righe per pagina
                                        paginationRowsPerPageOptions={[4]} // Solo 5 righe per pagina
                                        customStyles={Dataset_style.customStyles}
                                        paginationComponentOptions={{noRowsPerPage: true}}
                                    />
                                </Container>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div style={{...Card_Styles.cards_flex, height: "40vh"}}>
                                <Container className="left_col">
                                    <DataTable
                                        className="custom-datatable"
                                        columns={columns}
                                        data={selected_account.movements}
                                        pagination
                                        paginationPerPage={4} // Numero massimo di righe per pagina
                                        paginationRowsPerPageOptions={[4]} // Solo 5 righe per pagina
                                        customStyles={Dataset_style.customStyles}
                                        paginationComponentOptions={{noRowsPerPage: true}}
                                    />
                                </Container>
                            </div>

                        </Col>
                    </Row>
                </Col>


            </Row>

            <Row className="w-100">

                <Col xs={4}>
                    <div style={{
                        ...Card_Styles.cards_flex,
                        alignItems: "left",
                        justifyContent: "center",
                        height: "38vh"
                    }}>
                        <h3>Dati sulle spese</h3>
                        <h4>Giacenza Media: {selected_account.value}</h4>
                        <h4>Trend: {selected_account.value}</h4>
                        <h4>Stato: {selected_account.value}</h4>
                    </div>
                </Col>
                <Col xs={8}>
                    <div style={Card_Styles.cards_flex}>
                        <LineChart data={selected_account.data} height={250} width={850}/>
                    </div>
                </Col>

            </Row>

        </div>
    );
};

export default DonutChartPage;
