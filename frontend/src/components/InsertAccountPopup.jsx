// InsertAccountPopup.js
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

function InsertAccountPopup({ show, onHide }) {
    const [accountName, setAccountName] = useState("");
    const [selectedWhoIds, setSelectedWhoIds] = useState([]);
    const [description, setDescription] = useState("");

    const [whoIdList, setWhoIdList] = useState([
        "alice01",
        "bob_the_builder",
        "carla.dev",
        "daniele92",
        "elisa.mkt",
        "francoUX",
        "giulia_admin"
    ]);

    //
    // // Simula il caricamento degli utenti disponibili (who_id)
    // useEffect(() => {
    //     axios.get('http://localhost:5000/users/') // TODO: cambia con l'endpoint corretto
    //         .then(res => {
    //             setWhoIdList(res.data); // presuppone che sia un array di stringhe
    //         })
    //         .catch(err => {
    //             console.log("Errore nel caricamento degli utenti:", err);
    //         });
    // }, []);

    const handleAccountNameChange = (e) => setAccountName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleWhoIdChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedWhoIds(options);
    };

    const saveAccount = () => {
        const today = new Date().toLocaleDateString('it-IT'); // formato gg/mm/aaaa
        const formattedDate = today.split('/').reverse().join('-'); // formato "aaaa-mm-gg"

        axios.post('http://localhost:5000/accounts/', {
            account_name: accountName,
            who_id: selectedWhoIds,
            balance: 0,
            date: formattedDate,
            desc: description,
            methods: []
        })
            .catch(err => {
                console.log("Errore durante il salvataggio:", err);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveAccount();
        setAccountName("");
        setDescription("");
        setSelectedWhoIds([]);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Inserisci un nuovo account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formAccountName">
                        <Form.Label column={true}>Nome account</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome dell'account"
                            value={accountName}
                            onChange={handleAccountNameChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formWhoId">
                        <Form.Label  column={true}>Utenti associati</Form.Label>
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

                    <Form.Group className="mb-3" controlId="formDesc">
                        <Form.Label  column={true}>Descrizione</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci una descrizione"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleSubmit}>Salva</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InsertAccountPopup;
