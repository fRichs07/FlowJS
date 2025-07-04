// InsertAccountPopup.js
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

function InsertMethodPopup({ show, onHide }) {
    const [selectedAccountNames, setSelectedAccountNames] = useState([]);
    const [selectedWhoIds, setSelectedWhoIds] = useState([]);
    const [methodName, setMethodName] = useState("");
    const [whoIdList, setWhoIdList] = useState([
        "alice01",
        "bob_the_builder",
        "carla.dev",
        "daniele92",
        "elisa.mkt",
        "francoUX",
        "giulia_admin"
    ]);

    const [accountNameList, setAccountNameList] = useState([
        "conto_marketing",
        "conto_tecnico",
        "conto_amministrazione",
        "conto_risorse_umane",
        "conto_vendite"
    ]);

    const handleWhoIdChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedWhoIds(options);
    };

    const handleAccountNameChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedAccountNames(options);
    };

    const handleMethodNameChange = (e) => {
        setMethodName(e.target.value);
    }

    const saveAccount = () => {
        const today = new Date().toLocaleDateString('it-IT'); // formato gg/mm/aaaa

        axios.post('http://localhost:5000/account/', {
            account_name: selectedAccountNames,
            who_id: selectedWhoIds,
            balance: 0,
            date: today,
            desc: "Inserito tramite popup",
            methods: []
        })
            .then( e => {
                console.log(e)
            })
            .catch(err => {
                console.log("Errore durante il salvataggio:", err);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveAccount();
        setSelectedAccountNames([]);
        setSelectedWhoIds([]);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Inserisci un nuovo metodo di pagamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className="mb-3" controlId="formMethodName">
                        <Form.Label column={true}>Nome account</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome dell'metodo di pagamento"
                            value={methodName}
                            onChange={handleMethodNameChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAccountName">
                        <Form.Label column={true}>Account associati</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            value={selectedAccountNames}
                            onChange={handleAccountNameChange}
                        >
                            {accountNameList.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formWhoId">
                        <Form.Label column={true}>Utenti associati</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            value={selectedWhoIds}
                            onChange={handleWhoIdChange}
                        >
                            {whoIdList.map(user => (
                                <option key={user} value={user}>{user}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleSubmit}>Salva</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InsertMethodPopup;
