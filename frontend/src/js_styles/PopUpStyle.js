import Flow_colors from "./colors.js";

class PopUpStyle {

    static FilterPopUp = {
        height: '600px',
        width: '800px',
        background: Flow_colors.primary_color,
        border: '2px solid ' + Flow_colors.secondary_color,
        borderRadius: '25px',
    }
    static SaveButton = {
        backgroundColor: Flow_colors.secondary_color,
        color: Flow_colors.text_dark_color,
        border: "0",
        borderRadius: "25px",
        width: '100px'
    }
}

export default PopUpStyle;