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
        height: "100%",
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
        height: "100%",
        backgroundColor: Flow_colors.primary_color,
    };

    static GaugeItem = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Centra il Gauge e il titolo
        flex: 1, // Ogni coppia occupa una parte uguale dell'altezza totale
        width: "100%", // Garantisce che ogni coppia usi tutta la larghezza
    };

}


export default Card_Styles;