import Popup from "reactjs-popup";
import React from "react";
import Dataset_style from "../js_styles/Dataset_style.js";

export function ButtonDS({ PopupFunction, Icon }) {
    return (
        <Popup
            trigger=
                {<button style={Dataset_style.DSButton}>{Icon}</button>}
            shading={true}
            modal
            overlayStyle={{
                backdropFilter: "blur(1px)" // Effetto sfocatura
            }}
        >
            {close =>
                PopupFunction(close)
            }

        </Popup>
    )
}

export function extractUniqueValues(data, column) {
    return [...new Set(data.map(item => item[column]))];
}


