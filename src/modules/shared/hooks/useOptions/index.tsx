import React, { useState, useRef, useCallback, useEffect } from "react";

export const useOptions = (
    arr: string[]
): [() => string, (index: number, v: string) => void] => {
    const [options, setOptions] = useState<Array<string>>([]);
    useEffect(() => {
        setOptions(arr);
    }, [arr.length]);

    const getSelected = () => options.toString();
    const handleSelect = (element: number, value: string) => {
        setOptions((pre) => [
            ...pre.slice(0, element),
            value,
            ...pre.slice(element + 1),
        ]);
    };

    return [getSelected, handleSelect];
};
