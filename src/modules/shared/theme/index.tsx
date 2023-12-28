import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
// import { TextFieldPropsColorOverrides } from "@material-ui/core/TextField";
const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                // primary: {
                //     main: "#f53f2d",
                // },
                // secondary: {},
                info: {
                    main: "#000",
                },
                // text: {},
                custom: {
                    main: "#fff",
                },
                orange: {
                    main: "#ee4d2d",
                    light: "rgba(255,87,34,0.1)",
                    disabled: "#ffccbc",
                },
            },
        },
        dark: {
            palette: {
                // primary: {
                //     main: "#f53f2d",
                // },
                // secondary: {},
                info: {
                    main: "#fff",
                },
                // text: {},
                custom: {
                    main: "#fff",
                },

                orange: {
                    main: "#ee4d2d",
                    light: "rgba(255,87,34,0.1)",
                    deep: "rgb(238, 77, 45)",
                },
            },
        },
    },

    typography: {
        fontSize: 15,
    },
});

declare module "@mui/material/styles" {
    interface PaletteColor {
        deep?: string;
        disabled?: string;
    }

    interface SimplePaletteColorOptions {
        deep?: string;
        disabled?: string;
    }
}

declare module "@mui/material/styles" {
    interface Palette {
        custom: Palette["primary"];
    }

    interface PaletteOptions {
        custom: PaletteOptions["primary"];
    }
    interface Palette {
        orange: Palette["primary"];
    }

    interface PaletteOptions {
        orange: PaletteOptions["primary"];
    }

    interface PaletteColor {
        white?: string;
    }

    interface SimplePaletteColorOptions {
        white?: string;
    }
}

declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        custom: true;
    }
}

declare module "@mui/material/TextField" {
    interface TextFieldPropsColorOverrides {
        custom: true;
    }
}
declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        orange: true;
    }
}

declare module "@mui/material/TextField" {
    interface TextFieldPropsColorOverrides {
        orange: true;
    }
}
declare module "@mui/material/Checkbox" {
    interface CheckboxPropsColorOverrides {
        orange: true;
    }
}

export default theme;
