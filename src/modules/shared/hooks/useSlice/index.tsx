import React from "react";
import { useAppSelector } from "~app/hooks";
import { storeType } from "~app/store";
import { RootState } from "~app/store";
const useSlice = (slice: storeType) => {
    const store = useAppSelector((state: RootState) => state[slice]);
    return store;
};

export default useSlice;
