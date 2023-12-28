import { useColorScheme } from "@mui/material/styles";

export type Mode = "light" | "dark" | "system";

const ToggleMode = () => {
    const { mode, setMode } = useColorScheme();

    const handleChange = (name: Mode) => {
        setMode(name);
    };
};

export default ToggleMode;
