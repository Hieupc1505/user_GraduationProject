import { useColorScheme } from "@mui/material/styles";

import { Box, styled } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
export type Mode = "light" | "dark" | "system";
import {
    LightMode as LightModeIcon,
    DarkModeOutlined as DarkModeOutlinedIcon,
    SettingsBrightness as SettingsBrightnessIcon,
} from "@mui/icons-material";
import { SelectProps } from "@mui/material/Select";
import { BoxProps } from "@mui/material";
function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const handleChange = (event: SelectChangeEvent) => {
        setMode(event.target.value as Mode);
    };

    const BoxItem = styled(Box)<BoxProps>(() => ({
        display: "flex",
        gap: "8px",
        alignItems: "center",
    }));

    return (
        <div>
            <FormControl
                sx={{ m: 1, minWidth: 80, marginLeft: 0 }}
                size="small"
            >
                <InputLabel
                    id="label-select-dark-light-mode"
                    sx={{ color: "#fff" }}
                >
                    Mode
                </InputLabel>
                <Select
                    labelId="label-select-dark-light-mode"
                    id="label-select-dark-light-mode"
                    value={mode}
                    onChange={handleChange}
                    autoWidth
                    label="mode"
                    sx={{
                        color: "custom.main",
                    }}
                >
                    <MenuItem value={"light"}>
                        <BoxItem>
                            <LightModeIcon />
                            Light
                        </BoxItem>
                    </MenuItem>
                    <MenuItem value={"dark"}>
                        <BoxItem>
                            <DarkModeOutlinedIcon />
                            Dark
                        </BoxItem>
                    </MenuItem>
                    <MenuItem value={"system"}>
                        <BoxItem>
                            <SettingsBrightnessIcon />
                            System
                        </BoxItem>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default ModeToggle;
