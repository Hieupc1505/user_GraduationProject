import * as React from "react";
import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Grid, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SelectOption from "~/shared/features/SelectOption";
// import { useOptions } from "~/product/hooks/useOptions";
import { useOptions } from "~/shared/hooks/useOptions";
import { OptionProps } from "~/product/store/productSlice";
import { useAppDispatch } from "~app/hooks";
import { useParams } from "react-router-dom";

import { changeStatus } from "~/shared/store/status.auth";

interface OptionDetailProps {
    listOptions: string[];
    actionBtn: string[];
    options?: OptionProps[];
    quantity?: number;
    handleAddCart: (n: number, s: string) => void;
    handleByNow: (n: number, s: string) => void;
}

const OptionDetail = ({
    listOptions,
    actionBtn,
    quantity = 0,
    options = [],
    handleAddCart,
    handleByNow,
}: OptionDetailProps) => {
    const [num, setNum] = useState<number>(1);

    const [getSelectedColor, handleSelectColor] = useOptions(
        Array(options.length).fill(0)
    );

    const dispatch = useAppDispatch();
    const { id } = useParams();

    const titleNote = (title: string) => (
        <Grid item xs={2.5}>
            <Typography
                sx={{
                    textTransform: "capitalize",
                    pt: 1,
                    pl: 2,
                    color: "grey.600",
                }}
            >
                {title}
            </Typography>
        </Grid>
    );
    const handleQuantity = (amount: number) => {
        if (num + amount === 0) return;
        else if (num + amount > +quantity) return;
        setNum(() => num + amount);
    };

    const handleClick = () => {
        if (id) handleAddCart(num, getSelectedColor().toString());
    };
    const handleByNowClick = () => {
        if (id) handleByNow(num, getSelectedColor().toString());
    };

    return (
        <Grid container spacing={3} mt={2}>
            {options?.length &&
                options.map(({ key, value }, index) => (
                    <React.Fragment key={key}>
                        {titleNote(key)}
                        <Grid
                            item
                            xs={9.5}
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            {
                                <SelectOption
                                    element={index}
                                    sx={{ minWidth: "60px", py: 1, px: 2.5 }}
                                    list={value}
                                    size="medium"
                                    callback={handleSelectColor}
                                />
                            }
                        </Grid>
                    </React.Fragment>
                ))}

            {/* {titleNote(listOptions[1])}
            <Grid
                item
                xs={9}
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                {
                    <SelectOption
                        list={sizes}
                        size="medium"
                        callback={handleSelectSize}
                    />
                }
            </Grid>
            {titleNote(listOptions[2])} */}
            <Grid item xs={9} ml={1.75}>
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined primary button group"
                >
                    <Button onClick={() => handleQuantity(-1)}>-</Button>
                    <Button sx={{ px: 4 }}> {num}</Button>
                    <Button onClick={() => handleQuantity(+1)}>+</Button>
                </ButtonGroup>
                <Button
                    disabled
                    variant="text"
                    sx={{
                        ml: 2,
                        textTransform: "capitalize",
                        color: "text.secondary",
                    }}
                >
                    {quantity} {actionBtn[0]}
                </Button>
            </Grid>
            <Grid item xs={12} mt={2}>
                <Button
                    variant="outlined"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    sx={{
                        padding: "0 20px",
                        height: "48px",
                        mr: 2,
                        color: "orange.main",
                        borderColor: "orange.main",
                        bgcolor: "orange.light",
                        ml: 2,
                        "&:hover": {
                            borderColor: "orange.main",
                            bgcolor: "orange.light",
                            opacity: 0.7,
                        },
                    }}
                    onClick={handleClick}
                >
                    {actionBtn[1]}
                </Button>
                <Button
                    onClick={handleByNowClick}
                    variant="outlined"
                    sx={{
                        padding: "0 20px",
                        height: "48px",
                        color: "custom.main",
                        borderColor: "orange.main",
                        bgcolor: "orange.main",
                        "&:hover": {
                            opacity: 0.8,
                            color: "custom.main",
                            borderColor: "orange.main",
                            bgcolor: "orange.main",
                        },
                    }}
                >
                    {actionBtn[2]}
                </Button>
            </Grid>
        </Grid>
    );
};

export default React.memo(OptionDetail);
