import PopUpStyle from "../js_styles/PopUpStyle.js";
import Flow_colors from "../js_styles/colors.js";
import {useState} from "react";

//     {id: 10, User: "A", Amount: 9, Class: "@fwqda", Date: "6-2-2024", Method:"821-b"},
function InsertPopup({action, close}) {
    let [name, setName] = useState('');
    let [amount, setAmount] = useState(0);
    let [date, setDate] = useState('');
    let [cls, setCls] = useState('');
    let [method, setMethod] = useState('');
    let [account, setAccount] = useState('');

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
                onChange={(e) => setAmount(parseInt(e.target.value, 10))}
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
        <label style={{margin: "10px"}}>Conto corrente:
            <input
                style={{margin: "10px"}}
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
            />
        </label>
        <div>
            <button style={{...PopUpStyle.SaveButton, marginLeft: "80%", marginTop: "20%"}} onClick={(e) => {
                e.preventDefault();
                action({id: 11, User: name, Amount: amount, Class: cls, Date: date, Method: method, Account:account});
                close();
            }}>
                Salva
            </button>
        </div>
    </div>);
}

export default InsertPopup;