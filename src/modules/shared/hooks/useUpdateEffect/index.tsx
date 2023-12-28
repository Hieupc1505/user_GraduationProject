import React, { useEffect, useRef } from "react";

const useUpdateEffect = (
    callback: () => void,
    dependencies: (string | number)[]
) => {
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        return callback();
    });

    return [];
};

export default useUpdateEffect;
