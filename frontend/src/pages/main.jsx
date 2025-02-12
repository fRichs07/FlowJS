import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import SpendingPage from './SpendingPage.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../js_styles/Navbar_Style.js";
import Flow_colors from "../js_styles/colors.js";

import { FaWind } from "react-icons/fa";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div style={{backgroundColor: Flow_colors.background_color, minHeight: "100vh",}}>
            {/* Aggiungere la Navbar */ }
            {/* TODO: estrai il codice in un componente esterno */}
            <div style={Navbar.container}>
                <div style={Navbar.nav}>
                    <FaWind size={40} style={{color:Flow_colors.secondary_color, marginLeft:"10px"}}/>
                </div>
            </div>

            <SpendingPage/>
        </div>
    </StrictMode>,
)
