import Flow_colors from "../js_styles/colors.js";
import React, {useState} from "react";
import {Chip} from 'primereact/chip';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import "../css/App.css"
import PopUpStyle from "../js_styles/PopUpStyle.js";

function FilterPopup({data, action, close}) {
    let Users = [];
    let classes = [];
    const methods = []

    data.forEach(item => {

        if (!Users.includes(item.User)) {
            Users.push(item.User);
        }
    });
    data.forEach(item => {

        if (!classes.includes(item.Class)) {
            classes.push(item.Class);
        }
    });

    data.forEach(item => {

        if (!methods.includes(item.Method)) {
            methods.push(item.Method);
        }
    });

    const removeItem = (item, list, f) => {

        let a = list.filter((i) => {
            return i !== item
        });
        f(a)
    }

    const [usrs, setUsrs] = useState(Users);
    const [cls, setClasses] = useState(classes);
    const [method, setMethod] = useState(methods);

    const chipList = (arr, setArr, txt) => {
        return (
            <div>
                <h2 style={{textAlign: 'left', marginLeft: '50px', marginTop: '50px'}}> {txt} </h2>
                {arr.map((item) => {
                    return (
                        <Chip className="text-sm-start m-1 " label={item} removable key={item} onRemove={() => {
                            removeItem(item, arr, setArr);
                            console.log(arr)
                        }}/>
                    )
                })}
            </div>
        )
            ;
    }

    return (
        <div style={{...PopUpStyle.FilterPopUp, color: Flow_colors.text_color}}>

            <div style={{textAlign: 'center',}}>

                {chipList(usrs, setUsrs, 'Utenti')}

                {chipList(cls, setClasses, 'Tipologie')}

                {chipList(method, setMethod, 'Metodo di pagamento')}

            </div>

            <div style={{textAlign: 'right', marginTop: '100px', marginRight: '50px'}}>
                <button style={PopUpStyle.SaveButton} onClick={(e) => {
                    action(usrs, cls, method)
                    close()
                }}>Salva
                </button>
            </div>
        </div>
    )
}

export default FilterPopup;
