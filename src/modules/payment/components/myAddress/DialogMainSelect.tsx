import React, { useEffect, useState } from "react";
import {
    Button,
 
    DialogTitle,
    DialogContent,
    DialogActions,
  
    Box,
    Radio,
 
    Divider,
    FormControl,
    FormControlLabel,
    RadioGroup,
} from "@mui/material";

import CustomAddress from "./customAddress";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

interface DialogMainSelectProps {
    btnAction: (val: boolean) => void;
    data: {
        name: string;
        number: number;
        address: string;
        detail: string;
        dfu?: boolean;
    }[];
    handleClose: () => void;
    checked: number;
    handleUpdate: (key: number) => void;
    handleSelectInfo: (name: string, number: number, address: string) => void;
}

const DialogMainSelect = ({
    data,
    btnAction,
    handleClose,
    checked,
    handleUpdate,
    handleSelectInfo,
}: DialogMainSelectProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const index = Number(form.get("select"));
        const name = data[index].name;
        const number = data[index].number;
        const address = data[index].detail + "\n" + data[index].address;
        handleSelectInfo(name, number, address);
    };

    return (
        <Box
            component={"form"}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <DialogTitle id="alert-dialog-title">
                {"Địa Chỉ Của Tôi"}
            </DialogTitle>
            <Divider />
            <DialogContent>
                <FormControl sx={{ width: "100%" }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={`${checked}`}
                        name="radio-buttons-group"
                    >
                        {data.map(
                            ({ name, number, address, detail, dfu }, index) => (
                                <div key={index}>
                                    <FormControlLabel
                                        className="label-content"
                                        name="select"
                                        value={`${index}`}
                                        control={<Radio />}
                                        sx={{
                                            alignItems: "start",
                                            py: 2,
                                            width: "100%",
                                            "& .MuiFormControlLabel-label": {
                                                flex: 1,
                                            },
                                        }}
                                        label={
                                            <CustomAddress
                                                name={name}
                                                number={number}
                                                detail={detail + address}
                                                dfu={dfu}
                                                index={index}
                                                handleUpdate={handleUpdate}
                                            />
                                        }
                                    />
                                    {index !== data.length - 1 && <Divider />}
                                </div>
                            )
                        )}
                    </RadioGroup>
                </FormControl>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddOutlinedIcon />}
                    onClick={() => btnAction(true)}
                >
                    Thêm Địa Chỉ Mới
                </Button>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button
                    onClick={handleClose}
                    autoFocus
                    type={"submit"}
                    sx={{
                        bgcolor: "orange.main",
                        color: "custom.main",
                        textTransform: "capitalize",
                    }}
                >
                    Xác Nhận
                </Button>
            </DialogActions>
        </Box>
    );
};

export default React.memo(DialogMainSelect);
