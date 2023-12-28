import React, { ReactElement, useState, ReactDOM } from "react";
import { SxProps, ToggleButton, Typography } from "@mui/material";
import { useOptions } from "~/shared/hooks/useOptions";
interface SelectOptionProps {
    list: string[];
    size: "small" | "large" | "medium";
    sx?: SxProps;
    callback: (element: number, value: string) => void;
    selected?: number;
    element: number;
    onClick?: (i: number) => void;
}

const SelectOption = ({
    list,
    size,
    sx,
    selected = 0,
    element,
    callback,
    onClick = () => {
        return;
    },
}: SelectOptionProps) => {
    const [keys, setKeys] = useState<boolean[]>(
        Array.from({ length: list.length }, (it, id) =>
            id === selected ? true : false
        )
    );

    const handleSelectKeys = (index: number) => {
        setKeys(keys.map((it, id) => (index === id ? true : false)));
        return callback(element, "" + index);
    };

    return keys.map((item, index) => (
        <ToggleButton
            value="check"
            selected={item}
            onChange={() => handleSelectKeys(index)}
            key={index}
            size={size}
            sx={sx}
            onClick={() => onClick(index)}
        >
            <Typography variant="body2">{list[index]}</Typography>
        </ToggleButton>
    ));
};

export default SelectOption;
