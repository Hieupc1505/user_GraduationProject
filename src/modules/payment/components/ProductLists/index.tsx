import {
    Box,
    Typography,
    Button,
    Divider,
    TextField,
    Collapse,
} from "@mui/material";
import React, { useState } from "react";
import VoucherIcon from "~/payment/assets/svg/voucher";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ProductItemPayment from "./ProductItemPayment";
import { Mode } from "~/shared/layout/header";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { cartStoreItem } from "~/cart/store/cartAction";
import { convertMoney } from "~/shared/utils/convertMoney";
import SelectOption from "~/shared/features/SelectOption";

interface ProductListsProps {
    content: {
        title: string[];
        productItem: string[];
        other: string[];
        ship: any;
    };
    lang: "en" | "vn";
    mode: Mode;
    data?: cartStoreItem[];
    type: string;
    changeType: (v: "express" | "other") => void;
    pay: string[];
    handleSelect: (e: number, v: string) => void;
}

const ProductLists = ({
    content,
    lang,
    mode,
    data,
    type,
    changeType,
    pay,
    handleSelect,
}: ProductListsProps) => {
    const { title, other } = content;
    const [status, setStatus] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        if (val === "express" || val === "other") changeType(val);
        else changeType("express");
    };

    const handleStatus = () => {
        setStatus((prev) => !prev);
    };

    return (
        <Box bgcolor={"background.paper"}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: "50px",
                    width: "100%",
                    pt: 3,

                    px: 4.75,
                    mb: 2,
                }}
            >
                <Typography component={"div"} variant="body1" sx={{ flex: 4 }}>
                    {title[0]}
                </Typography>
                <Typography
                    component={"div"}
                    variant="body2"
                    sx={{ flex: 3 }}
                ></Typography>
                <Typography
                    component={"div"}
                    variant="body2"
                    sx={{ flex: 1, color: "text.secondary" }}
                >
                    {title[1]}
                </Typography>
                <Typography
                    component={"div"}
                    variant="body2"
                    textAlign={"center"}
                    sx={{ flex: 1, color: "text.secondary" }}
                >
                    {title[2]}
                </Typography>
                <Typography
                    component={"div"}
                    variant="body2"
                    sx={{
                        flex: 2,
                        color: "text.secondary",
                        textAlign: "right",
                    }}
                >
                    {title[3]}
                </Typography>
            </Box>

            {data &&
                data.map((item, index) => (
                    <ProductItemPayment
                        key={index}
                        lang={lang}
                        product={item}
                    />
                ))}

            <Divider />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 2.25,
                    px: 3.75,
                }}
            >
                <Box
                    sx={{
                        flex: 6,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <VoucherIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {other[0]}
                    </Typography>
                </Box>
                <Box sx={{ flex: 4, textAlign: "right" }}>
                    <Button
                        size="small"
                        variant="text"
                        sx={{
                            fontSize: "caption.fontSize",
                        }}
                    >
                        {other[1]}
                    </Button>
                </Box>
            </Box>
            <Divider />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 3.75,
                    minHeight: "90px",
                    gap: 2,
                    bgcolor: mode === "light" ? "#fafdff" : "#00000000",
                }}
            >
                <Box
                    sx={{
                        flex: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                    }}
                >
                    <Typography variant="body2">{other[2]}: </Typography>
                    <TextField
                        color="info"
                        size="small"
                        focused
                        placeholder={other[3]}
                        sx={{ flex: 1 }}
                    />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                    sx={{
                        flex: 6,
                        display: "grid",
                        gridTemplateColumns: "auto",
                        gridTemplateRows: "auto",
                        gridColumnGap: "10px",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        color={"#00bfa5"}
                        sx={{ gridColumnStart: 1, gridColumnEnd: 2 }}
                    >
                        {other[4]}
                    </Typography>

                    <FormControl
                        sx={{
                            gridColumnStart: 2,
                            gridColumnEnd: 4,
                            gridRowStart: 1,
                            gridRowEnd: 2,
                        }}
                    >
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="express"
                                control={<Radio size="small" />}
                                label={other[5]}
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio size="small" />}
                                label={other[6]}
                            />
                        </RadioGroup>
                    </FormControl>
                    <Typography
                        variant="body2"
                        sx={{
                            gridColumnStart: 4,
                            gridColumnEnd: 5,
                            textAlign: "right",
                            fontWeight: "bolder",
                        }}
                    >
                        {convertMoney(content.ship[type], lang)}
                    </Typography>
                    <Typography
                        sx={{
                            gridColumnStart: 2,
                            gridColumnEnd: 5,
                            gridRowStart: 2,
                            gridRowEnd: 3,
                            color: "text.secondary",
                        }}
                    >
                        {other[7]} 21 Th08 - 24 Th08
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Box
                sx={{
                    bgcolor: "background.paper",
                    py: 2.5,
                    px: 3.75,
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1">{title[4]}</Typography>
                    <Box sx={{ flex: 1 }}></Box>
                    {!status && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="body2">{pay[0]}</Typography>
                            <Button
                                variant="text"
                                color="primary"
                                sx={{
                                    ml: 2,
                                    fontSize: "caption.fontSize",
                                    textTransform: "capitalize",
                                }}
                                onClick={handleStatus}
                            >
                                {title[5]}
                            </Button>
                        </Box>
                    )}
                </Box>
                <Collapse in={status}>
                    <Box sx={{ py: 3 }}>
                        <SelectOption
                            element={0}
                            list={pay}
                            size="medium"
                            sx={{
                                px: 2.5,
                                py: 1.5,
                                mr: 2,
                                minWidth: "34px",
                                "& .MuiTypography-root": {
                                    textTransform: "capitalize",
                                    fontSize: "caption.secondary",
                                },
                                "&.Mui-selected": {
                                    bgcolor: "orange.main",
                                    color: "white",
                                },
                                "&.Mui-selected:hover": {
                                    bgcolor: "orange.main",
                                    color: "white",
                                },
                            }}
                            callback={handleSelect}
                        />
                    </Box>
                </Collapse>
            </Box>
        </Box>
    );
};

export default ProductLists;
