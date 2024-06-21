import React, { useCallback, useEffect, useState } from "react";
import { Dialog } from "@mui/material";

import DialogMainSelect from "./DialogMainSelect";
import DialogMainAdd from "./DialogMainAdd";
import { useToggle } from "~/shared/hooks/useToggle";

interface MyAddressProps {
    anchor: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    handleSelectInfo: (name: string, number: number, address: string) => void;
}
export interface dataProps {
    name: string;
    number: number;
    address: string;
    detail: string;
    dfu?: boolean;
}

export type storeProps = {
    name: string;
    number: number;
    address: string;
    detail: string;
    dfu?: boolean;
}[];

export interface updateProps extends dataProps {
    index: number;
}
import { RootState } from "~app/store";
import { useAppSelector } from "~app/hooks";

const MyAddress = ({
    anchor,

    handleClose,
    handleSelectInfo,
}: MyAddressProps) => {
    const [next, setNext] = useToggle(false);

    const [store, setStore] = useState<storeProps>([]);

    const [checked, setChecked] = useState(0);
    const [update, setUpdate] = useState<updateProps | undefined>(undefined);

    const handleBack = useCallback((value: boolean) => {
        setUpdate(undefined);
        setNext(value);
    }, []);

    const { user } = useAppSelector((state: RootState) => state.userReducer);

    const handleAdd = useCallback((newData: dataProps, type?: number) => {
        if (newData.dfu && type) {
            setStore((prev) => {
                const news = [...prev.map((item) => ({ ...item, dfu: false }))];
                return [
                    newData,
                    ...news.slice(0, type),
                    ...news.slice(type + 1),
                ];
            });
        } else if (newData.dfu && !type) {
            setStore((prev) => [
                newData,
                ...prev.map((item) => ({ ...item, dfu: false })),
            ]);
        } else if ((!newData.dfu && type) || (!newData.dfu && !type)) {
            setStore((prev) => [...prev, newData]);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setStore((pre) => [
                {
                    name: user.userInfo.displayName,
                    number: user.userInfo?.number,
                    detail: "",
                    dfu: true,
                    address: user.userInfo.address,
                },
            ]);
        }
    }, [user]);

    const handleChangeCheck = useCallback((val: number) => {
        setChecked(val);
    }, []);

    const handleChangeUpdate = useCallback(
        (index: number) => {
            setUpdate(() => ({ ...store[index], index }));
            setNext(true);
        },
        [store]
    );

    return (
        <div style={{ width: "500px" }}>
            <Dialog
                open={anchor}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {next ? (
                    <DialogMainAdd
                        data={update}
                        handleAdd={handleAdd}
                        handleBack={handleBack}
                        setChecked={handleChangeCheck}
                    />
                ) : (
                    <DialogMainSelect
                        btnAction={handleBack}
                        data={store}
                        handleClose={handleClose}
                        checked={checked}
                        handleUpdate={handleChangeUpdate}
                        handleSelectInfo={handleSelectInfo}
                    />
                )}
            </Dialog>
        </div>
    );
};

export default React.memo(MyAddress);
