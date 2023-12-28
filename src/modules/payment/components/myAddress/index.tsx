import React, { useCallback, useEffect, useState } from "react";
import { Button, Dialog, DialogActions } from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DialogMainSelect from "./DialogMainSelect";
import DialogMainAdd from "./DialogMainAdd";
import { useToggle } from "~/shared/hooks/useToggle";

interface MyAddressProps {
    anchor: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    handleSelectInfo: (name: string, number: string, address: string) => void;
}

const library = {
    select: {
        status: true,
        actions: ["Hủy", "Xác Nhận"],
    },
};

const data = [
    {
        name: "Van Hieu 956",
        number: "09878937845",
        address: "Hải Lựu, Sông Lô, Vĩnh Phúc",
        detail: "Số nhà 87657",
        dfu: true,
    },
    {
        name: "Van Hieu 986",
        number: "09878937845",
        address: "Hải Lựu, Sông Lô, Vĩnh Phúc",
        detail: "Số nhà 87657",
        dfu: false,
    },
];

export interface dataProps {
    name: string;
    number: string;
    address: string;
    detail: string;
    dfu?: boolean;
}

export type storeProps = {
    name: string;
    number: string;
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
    handleClickOpen,
    handleClose,
    handleSelectInfo,
}: MyAddressProps) => {
    const [next, setNext] = useToggle(false);

    const [store, setStore] = useState<storeProps>([]);
    const [add, setAdd] = useState({});
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
                    number: user.userInfo.number,
                    detail: "",
                    dfu: true,
                    address: user.userInfo.address,
                },
            ]);
        }
    }, [user]);
    console.log(user);

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
