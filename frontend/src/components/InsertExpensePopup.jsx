import PopUpStyle from "../js_styles/PopUpStyle.js";
import Flow_colors from "../js_styles/colors.js";
import {useState} from "react";
import axios from "axios";

//     {id: 10, User: "A", Amount: 9, Class: "@fwqda", Date: "6-2-2024", Method:"821-b"},
function InsertExpensePopup({action, close}) {
    let [name, setName] = useState('');
    let [amount, setAmount] = useState(0.0);
    let [date, setDate] = useState('');
    let [cls, setCls] = useState('');
    let [method, setMethod] = useState('');
    let [description, setDescription] = useState('');
    let [category, setCategory] = useState('...');
    let [extraExpense, setExtraExpense] = useState(false);


    const saveExpense = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/expenses/',
            data: {
                who: name,
                amount: amount,
                date: date,
                tag: cls,
                method: method,
                desc: description,
                extra: extraExpense,
            }
        })
            .catch(err => {
                console.log(err) // TODO: Nessun handling di errore se non va a buon fine la richiesta per ora
            })
    }

    return (<div style={{...PopUpStyle.FilterPopUp, color: Flow_colors.text_color}}>
        <h1 style={{margin: "10px"}}>Inserisci una nuova spesa</h1>
        <label style={{margin: "10px"}}>Chi ha effettuato la spesa:
            <input
                style={{margin: "10px"}}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </label>
        <label style={{margin: "10px"}}>Ammontare della spesa:
            <input
                style={{margin: "10px"}}
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value, 10))}
            />
        </label>
        <label style={{margin: "10px"}}>Data in cui è avvenuta:
            <input
                style={{margin: "10px"}}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </label>
        <label style={{margin: "10px"}}>Tag della spesa (preceduta da @):
            <input
                style={{margin: "10px"}}
                type="text"
                value={cls}
                onChange={(e) => setCls(e.target.value)}
            />
        </label>
        <label style={{margin: "10px"}}>Metodo di pagamento utilizzato:
            <input
                style={{margin: "10px"}}
                type="text"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
            />
        </label>
        <label style={{margin: "10px"}}>Categoria della spesa:
            <input
                style={{margin: "10px"}}
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
        </label>
        <label style={{margin: "10px"}}>Categoria della spesa:
            <textarea
                style={{margin: "10px"}}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </label>
        <label style={{margin: "10px", display: "flex", alignItems: "center"}}>
            <input type="checkbox" checked={extraExpense} onChange={(e) => setExtraExpense(e.target.checked)}
                   style={{marginRight: "10px"}}/>
            Spesa extra
        </label>
        <div>
            <button style={{...PopUpStyle.SaveButton, marginLeft: "80%", marginTop: "0%"}} onClick={(e) => {
                e.preventDefault();
                action({id: 11, User: name, Amount: amount, Class: cls, Date: date, Method: method});
                saveExpense();
                close();
            }}>
                Salva
            </button>
        </div>
    </div>);
}

export default InsertExpensePopup;