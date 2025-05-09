import Flow_colors from "./colors.js";

class Navbar {
    static container = {
        backgroundColor: Flow_colors.background_color,
        height: "max-content",
        alignContent: "center",
    };

    static nav = {
        backgroundColor: Flow_colors.primary_color,
        margin: "15px",
        marginLeft: "15px",
        padding: "15px",
        borderRadius: "15px",
        color: Flow_colors.text_color,
    }

    static nav_button = {
        color: Flow_colors.text_color,
        backgroundColor: Flow_colors.primary_color,
        border: "0",
        width: '100px',

    }
}

export default Navbar;