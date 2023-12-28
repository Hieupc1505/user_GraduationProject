import React from "react";
import { Autocomplete, SxProps, TextField } from "@mui/material";

interface CustomAutopleteProps {
    data: string[];
    sx?: SxProps;
    label?: string;
    id: string;
    callback?: (l: string, val: string) => void;
}

interface AutocompleteOption {
    label: string;
}
// or
// type AutocompleteOption = string;

const CustomAutoplete = ({
    data,
    sx = {},
    label,
    callback,
    id,
}: CustomAutopleteProps) => {
    const [value, setValue] = React.useState<string | null>(null);
    const [inputValue, setInputValue] = React.useState("");
    // console.log(value);
    return (
        <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                if (callback) callback(id, newInputValue);
                setInputValue(newInputValue);
            }}
            id={id}
            options={data}
            sx={sx}
            renderInput={(params) => <TextField {...params} label={label} />}
            // disablePortal
            // id={id}
            // options={data}
            // sx={sx}
            // // value={value}
            // renderInput={(params) => <TextField {...params} label={label} />}
            // onChange={(event: any, newValue: AutocompleteOption | null) => {
            //     if (callback && newValue) {
            //         callback(id, newValue.label);
            //     }
            // }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //     setInputValue(newInputValue);
            // }}
        />
    );
};

export default React.memo(CustomAutoplete);
