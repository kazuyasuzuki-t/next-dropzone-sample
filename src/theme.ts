import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51b5",
            dark: "#303f9f",
            light: "#7986cb",
        },
        secondary: {
            main: "#f50057",
            dark: "#c51162",
            light: "#ff4081",
        },
        error: {
            main: "#f44336",
            dark: "#d32f2f",
            light: "#e57373",
        },
        warning: {
            main: "#ff9800",
            dark: "#f57c00",
            light: "#ffb74d",
        },
        info: {
            main: "#2196f3",
            dark: "#1976d2",
            light: "#64b5f6",
        },
        success: {
            main: "#4caf50",
            dark: "#388e3c",
            light: "#81c784",
        },
    },
});
