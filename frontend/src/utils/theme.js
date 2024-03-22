import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3374FF",
            contrastText: "#060606",
        },
        secondary: {
            main: '#060606'
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                fontWeight: 400,
            },
        },
        MuiSkeleton: {
            defaultProps: {
                animation: "wave",
            },
            styleOverrides: {
                root: {
                    "-webkit-transform": "scale(1)",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    color: '#444444ea',
                    '&::placeholder': {
                        color: '#444444ea',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInput-underline": {
                        fontSize: '14px',
                        fontWeight: 400,
                        color: colors.text,
                        borderColor: '#90caf9',
                        borderRadius: "6px",
                        "&.Mui-disabled": {
                            backgroundColor: "#90caf9",
                        },
                    },
                    '.MuiFormLabel-root': {
                        color: colors.primary,
                    },
                    ".css-1uktm3m-MuiInputBase-root-MuiInput-root:hover": {
                        borderBottomColor: colors.primary,
                    },
                    ".css-1uktm3m-MuiInputBase-root-MuiInput-root::after": {
                        borderBottomColor: colors.primary,
                    },
                    '.css-1uktm3m-MuiInputBase-root-MuiInput-root::before': {
                        borderBottomColor: colors.primary,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: colors.primary,
                    fontSize: '14px',
                    borderBottomColor: `${colors.primary}`,
                    ':hover': {
                        borderBottomColor: `${colors.primary}`,
                    },
                    '.MuiSelect-select': {
                        borderBottomColor: `${colors.primary}`,
                    },
                    '&&.css-e7kmhy-MuiInputBase-root-MuiInput-root-MuiSelect-root::before': {
                        borderBottomColor: `${colors.primary}`,
                    }
                },
                filled: {
                    fontSize: '14px',
                    borderBottomColor: `${colors.primary}`,
                    ':hover': {
                        borderBottomColor: `${colors.primary}`,
                    },
                    '.MuiSelect-select': {
                        borderBottomColor: `${colors.primary}`,
                    },
                    '&&.css-e7kmhy-MuiInputBase-root-MuiInput-root-MuiSelect-root::before': {
                        borderBottomColor: `${colors.primary}`,
                    }
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    minWidth: 223,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                variant: "outlined",
            },
            variants: [
                {
                    props: { variant: "outlined" },
                    style: {
                        borderColor: colors.primary,
                        color: colors.primary,
                        borderWidth: "2px",
                        ":hover": {
                            borderWidth: "2px",
                            borderColor: "##90caf9",
                            color: '##90caf9',
                        },
                    },
                },
                {
                    props: { variant: "contained" },
                    style: {
                        color: colors.white,
                        backgroundColor: colors.secondary,
                        border: 0,
                        boxShadow: 'none',
                        ":hover": {
                            boxShadow: 'none',
                            backgroundColor: "#ffb74d",
                        },
                    },
                },
            ],
            styleOverrides: {
                root: {
                    fontSize: '15px',
                    fontWeight: 400,
                    borderRadius: "25px",
                    textTransform: "none",
                    padding: "4px 18px",
                },
            },
        },
        MuiPagination: {
            variants: [
                {
                    props: { variant: "text" },
                    style: {
                        color: '#060606',
                        '& .Mui-selected': {
                            backgroundColor: '#ffffff',
                            border: '1px solid #3374FF',
                        },
                    },
                },
            ],
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '& .Mui-selected': {
                        backgroundColor: '#ffffff',
                        border: '1px solid #3374FF',
                    },
                },
            },
        }
    },
});

export default theme;