import Flow_colors from "./colors.js";


class Dataset_style {
    static DatasetButtonsContainer = {
        marginBottom: "10px",
        marginLeft: "130px",
        display: "flex",
        alignItems: "center", // Per allineamento verticale
        justifyContent: "flex-start" // Facoltativo: per allineamento orizzontale
    }

    static DSButton = {
        marginRight: "20px",
        backgroundColor: "rgba(0,0,0,0)",
        color: Flow_colors.secondary_color,
        border: "0px"
    }

    static customStyles = {
        header: {
            style: {
                textAlign: 'center', // Center text horizontally
                justifyContent: 'center', // Useful for aligning content like icons

            },
        },
        headCells: {
            style: {
                textAlign: 'center', // Center text horizontally
                justifyContent: 'center', // Useful for aligning content like icons
            },
        },
        headRow: {
            style: {
                backgroundColor: Flow_colors.background_color, // Sfondo dell'header
                color: Flow_colors.text_color, // Colore del testo nell'header
                fontSize: "15px",
                fontWeight: "bold",
                textAlign: 'center', // Center text horizontally
                justifyContent: 'center', // Useful for aligning content like icons
            }
        },
        rows: {
            style: {
                backgroundColor: Flow_colors.primary_color, // Sfondo delle righe
                color: Flow_colors.text_color, // Colore del testo nelle righe


            }
        },

        cells: {
            style: {
                textAlign: 'center', // Center text horizontally
                justifyContent: 'center', // Useful for aligning content like icons

            }
        },

        pagination: {
            style: {
                backgroundColor: Flow_colors.background_color, // Sfondo della paginazione
                color: Flow_colors.text_color,
                border: "1px solid " + Flow_colors.background_color,
                borderBottomLeftRadius: "25px", // Arrotondamento solo all'angolo inferiore sinistro
                borderBottomRightRadius: "25px", // Arrotondamento solo all'angolo inferiore destro
                overflow: "hidden" // Per evitare che il contenuto esca dai bordi arrotondati

            },
            pageButtonsStyle: {
                fill: Flow_colors.text_color,
                borderRadius: "25px",
                '&:disabled': {
                    cursor: 'unset',
                    fill: "grey",
                },
            }
        }
    };
}

export default Dataset_style;