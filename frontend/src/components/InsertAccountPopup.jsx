// InsertAccountPopup.js
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";

function fetchUsers() {

    return axios(
        {
            method: 'post',
            url: 'http://localhost:5000/users/',
        })
        .then(res => {

            return res;
        })

}

function InsertAccountPopup({ show, onHide }) {
    const [accountName, setAccountName] = useState("");
    const [selectedWhoIds, setSelectedWhoIds] = useState([]);
    const [description, setDescription] = useState("");

    const [whoIdList, setWhoIdList] = useState(['richi']);

    const handleAccountNameChange = (e) => setAccountName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleWhoIdChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedWhoIds(options);
    };

    const saveAccount = () => {
        const today = new Date().toLocaleDateString('it-IT'); // formato gg/mm/aaaa
        const formattedDate = today.split('/').reverse().join('-'); // formato "aaaa-mm-gg"

        axios.post('http://localhost:5000/account/', {
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

    useEffect(() => {
        const getUsers = async () => {
            if (whoIdList.length === 0) { // da problemi se il ds è vuoto!
                try {
                    const response = await fetchUsers();
                    console.log(response.data);
                    response.data.forEach((user) => {setWhoIdList([...whoIdList, user.name])})
                } catch (error) {
                    console.error("Errore nel fetch:", error);
                }
            }
        };

        getUsers();
    }, [whoIdList]);
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
