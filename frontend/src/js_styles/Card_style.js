import Flow_colors from "./colors.js";

class Card_Styles {
    static cards_container = {
        color: Flow_colors.text_color,
    }

    static cards = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "25px",
        padding: "1rem",
        marginBottom: "15px",
        marginLeft: "15px",
        height: "85vh",
        backgroundColor: Flow_colors.primary_color,
    }

    static cards_flex = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "25px",
        padding: "1rem",
        marginBottom: "15px",
        marginLeft: "15px",
        height: "97%",
        backgroundColor: Flow_colors.primary_color,
    }

    static GaugeCards = {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly", // Distribuisce equamente le coppie nello spazio verticale
        borderRadius: "25px",
        padding: "1rem",
        marginBottom: "15px",
        marginLeft: "15px",
        height: "85vh",
        backgroundColor: Flow_colors.primary_color,
    };

    static GaugeItem = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%",
    };

}


export default Card_Styles;