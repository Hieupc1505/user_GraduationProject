import React, { useState } from "react";

export const useToggle = (
    defaultValue: boolean
): [boolean, (value?: boolean) => void] => {
    const [value, setValue] = useState(defaultValue);

    const toggleValue = (value?: boolean) => {
        setValue((currentValue) =>
            typeof value === "boolean" ? value : !currentValue
        );
    };
    return [value, toggleValue];
};
