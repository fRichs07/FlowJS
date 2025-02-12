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


// Dati di esempio
const data = [
    {id: 1, User: "Home", Amount: 12.3, Class: "@fat", Date: "1-2-2024", Method: "883-b"},
    {id: 2, User: "A", Amount: 14, Class: "@alc", Date: "2-2-2023", Method: "883-b"},
    {id: 3, User: "R", Amount: 72, Class: "@ser", Date: "3-2-2024", Method: "883-b"},
    {id: 4, User: "R", Amount: 340, Class: "@tra", Date: "4-2-2024", Method: "883-b"},
    {id: 5, User: "R", Amount: 120, Class: "@dpr", Date: "5-2-2024", Method: "332-b"},
    {id: 6, User: "A", Amount: 11, Class: "@fact", Date: "5-2-2024", Method: "883-b"},
    {id: 7, User: "A", Amount: 9, Class: "@fwqda", Date: "6-2-2024", Method: "332-b"},
    {id: 8, User: "A", Amount: 9, Class: "@fwqda", Date: "6-2-2024", Method: "821-b"},
    {id: 9, User: "A", Amount: 9, Class: "@fwqda", Date: "6-2-2024", Method: "821-b"},
    {id: 10, User: "A", Amount: 9, Class: "@fwqda", Date: "6-2-2024", Method: "821-b"},

    // {id: 10, User: "A", Amount: 9, Class: "@fwqda", Date: "6-2-2024", Method:"contanti"},

];


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

    let [tableData, setTableData] = useState(data);
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
                        setTableData(data)
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
