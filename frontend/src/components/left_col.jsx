import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import {IoFilter} from "react-icons/io5";
import {TbSortAscending} from "react-icons/tb";
import {FaArrowRotateLeft} from "react-icons/fa6";
import {FaPen} from "react-icons/fa";
import {IoIosAddCircleOutline} from "react-icons/io";

import Dataset_style from "../js_styles/Dataset_style.js";
import FilterPopup from "./FilterPopup.jsx";
import {ButtonDS, extractUniqueValues} from "./DatasetButtons.jsx";
import InsertPopup from "./InsertPopup.jsx";
import axios from "axios";

const data_from_flask = (await axios({
    method: 'get',
    url: 'http://localhost:5000/ds/all',
})).data
// console.log("POST: ",await axios({
//     method: 'post',
//     url: 'http://flask_server:5000/dev/post', //non so se localhost è giusto invece di utilizzare mongodb
//     data: {"nome": "Alice", "età": 30}
// }).data)
// Definizione delle colonne
const columns = [
    {
        name: "#",
        selector: (row) => row.id,
        width: "50px",
    },
    {
        name: "Quantità",
        selector: (row) => row.Amount,
        width: "85px",

    },
    {
        name: "Utente",
        selector: (row) => row.User,
        width: "90px",

    },
    {
        name: "Tipo",
        selector: (row) => row.Class,
        width: "90px",


    },
    {
        name: "Date",
        selector: (row) => row.Date,
        width: "90px",

    },

];

function LeftCol() {

    let [tableData, setTableData] = useState(data_from_flask);
    let [users, setUsers] = useState(extractUniqueValues(tableData, 'User'));
    let [Class, setClass] = useState(extractUniqueValues(tableData, 'Class'));
    let [methods, setMethods] = useState(extractUniqueValues(tableData, 'Method'));
    let [newLine, setNewLine] = useState({});

    /*
    * Per il click della spesa nel dataset
    * */
    const handleRowClick = (row) => {
        /*TODO:
        * Si deve aggiungere una vista per mostrare nel dettaglio il contenuto della spesa
        * */
        alert(`Row clicked: ID = ${row.id}, Name = ${row.firstName} ${row.lastName}`);
    };

    /*
    * La funzione passata a FilterPopUp per poter passare le scelte dell'utente
    * */
    const saveFilters = (users, classes, methods) => {
        setClass(classes);
        setMethods(methods);
        setUsers(users);
    }

    /*La funzione passata a InsertPopUp per aggiungere un nuovo elemento nel dataset*/
    const insertRow = (row) => {
        if (Object.keys(row).length !== 0) {
            setTableData([...tableData, row]);
        }
        console.log("void", newLine, row)
    }

    /* Per rendere attivi i filtri*/
    useEffect(() => {
        let tmp = []

        tableData.forEach(item => {
            // Verifica se l'elemento corrisponde ai filtri attivi
            const isMatch = (
                (users.length === extractUniqueValues(tableData, 'User').length || users.includes(item.User)) &&
                (Class.length === extractUniqueValues(tableData, 'Class').length || Class.includes(item.Class)) &&
                (methods.length === extractUniqueValues(tableData, 'Method').length || methods.includes(item.Method))
            );

            if (isMatch) {
                tmp.push(item);
            }
        });

        setTableData(tmp);
    }, [users, Class, methods])

    return (
        <div>
            <div style={Dataset_style.DatasetButtonsContainer}>
                <ButtonDS Icon={<IoFilter size={20}/>} PopupFunction={(close) => {
                    return (<FilterPopup data={tableData} close={close} action={saveFilters}/>)
                }}/>

                <button style={Dataset_style.DSButton} onClick={
                    () => {
                        setTableData(data_from_flask)
                    }}>
                    <FaArrowRotateLeft size={15}/>
                </button>

                <ButtonDS
                    Icon={<TbSortAscending size={20}/>}
                    PopupFunction={(close) => {
                        close();
                    }}
                />

                <ButtonDS
                    Icon={<FaPen size={15}/>}
                    PopupFunction={(close) => {
                        close();
                    }}
                />

                <ButtonDS Icon={<IoIosAddCircleOutline size={20}/>} PopupFunction={(close) => {
                    return (<InsertPopup action={insertRow} close={close}/>)
                }}/>

            </div>

            <Container className="left_col">
                <DataTable
                    className="custom-datatable"
                    columns={columns}
                    data={tableData}
                    pagination
                    paginationPerPage={10} // Numero massimo di righe per pagina
                    paginationRowsPerPageOptions={[10]} // Solo 5 righe per pagina
                    customStyles={Dataset_style.customStyles}
                    onRowClicked={handleRowClick} // Attach row click handler here
                    paginationComponentOptions={{noRowsPerPage: true}}
                />
            </Container>

        </div>
    )
}

export default LeftCol;
