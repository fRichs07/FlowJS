import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import {IoFilter} from "react-icons/io5";
import {TbSortAscending} from "react-icons/tb";
import {FaArrowRotateLeft} from "react-icons/fa6";
import {FaPen} from "react-icons/fa";
import axios from "axios";
import {IoIosAddCircleOutline} from "react-icons/io";

import Dataset_style from "../js_styles/Dataset_style.js";
import FilterPopup from "./FilterPopup.jsx";
import {ButtonDS, extractUniqueValues} from "./DatasetButtons.jsx";
import InsertExpensePopup from "./InsertExpensePopup.jsx";

function fetchTableData() {

    return axios(
        {
            method: 'get',
            url: 'http://localhost:5000/expenses/',
        })
        .then(res => {

            return res;
        })

}

const columns = [


    {
        name: "Utente",
        selector: (row) => row.who,
        width: "auto",

    },
    {
        name: "Tipo",
        selector: (row) => row.tag,
        width: "auto",


    },
    {
        name: "Data",
        selector: (row) => row.date,
        width: "auto",

    },

    {
        name: "$",
        selector: (row) => row.amount,
        width: "auto",

    },

];

function LeftCol() {

    let [tableData, setTableData] = useState(null);
    let [users, setUsers] = useState(extractUniqueValues(tableData, 'who'));
    let [Class, setClass] = useState(extractUniqueValues(tableData, 'Class'));
    let [methods, setMethods] = useState(extractUniqueValues(tableData, 'Method'));

    /*
    * Per il click della spesa nel dataset
    * */
    const handleRowClick = (row) => {
        /*TODO:
        * Si deve aggiungere una vista per mostrare nel dettaglio il contenuto della spesa
        * */
        alert(`Row clicked: ID = ${row.id}, Name = ${row.who}, date = ${row.date}`);
    };

    /*
    * La funzione passata a FilterPopUp per poter passare le scelte dell'utente
    * */
    const saveFilters = (users, classes, methods) => {
        setClass(classes);
        setMethods(methods);
        setUsers(users);
    }

    /* La funzione passata a InsertPopUp per aggiungere un nuovo elemento nel dataset */
    const insertRow = (row) => {
        if (Object.keys(row).length !== 0) {
            setTableData([...tableData, row]);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (tableData == null) { // da problemi se il ds è vuoto!
                try {
                    const response = await fetchTableData();
                    console.log(response.data);
                    setTableData(response.data);
                } catch (error) {
                    console.error("Errore nel fetch:", error);
                }
            }
        };

        fetchData();
    }, [tableData]);

    /* Per rendere attivi i filtri */
    useEffect(() => {
        let tmp = []
        if(tableData!==null) {
            console.log(tableData, "sono io");
            tableData.forEach(item => {
                // Verifica se l'elemento corrisponde ai filtri attivi
                const isMatch = (
                    (users.length === extractUniqueValues(tableData, 'who').length || users.includes(item.who)) &&
                    (Class.length === extractUniqueValues(tableData, 'tag').length || Class.includes(item.tag)) &&
                    (methods.length === extractUniqueValues(tableData, 'method').length || methods.includes(item.Method))
                );

                if (isMatch) {
                    tmp.push(item);
                }
            });
        }

        setTableData(tmp);
    }, [users, Class, methods])

    return (
        <div>
            <div style={Dataset_style.DatasetButtonsContainer}>
                <ButtonDS Icon={<IoFilter size={25}/>} PopupFunction={(close) => {
                    let a = tableData
                    if(a===null) {
                        a = []
                    }
                    return (<FilterPopup data={a} close={close} action={saveFilters}/>)
                }}/>

                <button style={Dataset_style.DSButton} onClick={
                    () => {
                        setTableData([])
                    }}>
                    <FaArrowRotateLeft size={20}/>
                </button>

                <ButtonDS
                    Icon={<TbSortAscending size={25}/>}
                    PopupFunction={(close) => {
                        close();
                    }}
                />

                <ButtonDS
                    Icon={<FaPen size={20}/>}
                    PopupFunction={(close) => {
                        close();
                    }}
                />

                <ButtonDS Icon={<IoIosAddCircleOutline size={20}/>} PopupFunction={(close) => {
                    return (<InsertExpensePopup action={insertRow} close={close}/>)
                }}/>

            </div>

            <Container className="left_col">
                <DataTable
                    className="custom-datatable"
                    columns={columns}
                    data={tableData === null ? [] : tableData}
                    pagination
                    paginationPerPage={10} // Numero massimo di righe per pagina
                    paginationRowsPerPageOptions={[10]} // Solo 5 righe per pagina
                    customStyles={Dataset_style.customStyles}
                    onRowClicked={handleRowClick}
                    paginationComponentOptions={{noRowsPerPage: true}}
                />
            </Container>

        </div>
    )
}

export default LeftCol;
