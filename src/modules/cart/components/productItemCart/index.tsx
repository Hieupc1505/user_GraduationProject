import React, { useCallback, useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    Checkbox,
    SxProps,
    Avatar,
    Popover,
    Button,
    ButtonGroup,
    Grid,
    FormControlLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, {
    bindTrigger,
    bindMenu,
    bindPopper,
    bindPopover,
} from "material-ui-popup-state";
import RepickOption from "../repickOption";

import { cartItemProps } from "~/cart/store/cartSlice";
import { convertMoney } from "~/shared/utils/convertMoney";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { deleteItemCart, updateCart } from "~/cart/store/cartAction";
import { useDebounce } from "~/shared/hooks/useDebounce";
import { Link, useNavigate } from "react-router-dom";

interface ProductItemCartProps {
    sx: SxProps;
    content: string[];
    repickText: string[];
    checked: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    data: cartItemProps;
    index: number;
    num: number;
    img: string;
    handleSetNum: (amount: number, index: number) => void;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ProductItemCart = ({
    sx,
    content,
    repickText,
    checked = false,
    handleChange,
    data,
    index,
    num,
    img,
    handleSetNum,
}: ProductItemCartProps) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const dispatch = useAppDispatch();

    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    // const [num, setNum] = useState<number>(data.quantity);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteItem = () => {
        const result = confirm(content[content.length - 1]);
        if (result) dispatch(deleteItemCart([data.productId]));
    };

    const handleChangeType = useCallback((type: string) => {
        dispatch(
            updateCart({
                productId: data.productId,
                selected: type,
                price: data.price,
                quantity: data.quantity, // productId, quantity, price, selected
            })
        );
        // dispatch();
    }, []);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const updateNumber = (number: number) => {
        if (data.quantity !== num)
            dispatch(
                updateCart({
                    productId: data.productId,
                    selected: data.type,
                    price: data.price,
                    quantity: number,
                })
            );
    };
    const handleQuantity = (amount: number) => {
        handleSetNum(amount, index);
    };
    useDebounce(() => updateNumber(num), 2000, [num]);

    const prev = useRef<number>(0);
    useEffect(() => {
        prev.current = num;
    });
    const navigate = useNavigate();
    const navigateToProduct = () => {
        navigate(`/product/${data.productId}`);
    };
    return (
        <Box sx={sx}>
            <Grid container sx={{ display: "flex", alignItems: "center" }}>
                <Grid
                    item
                    xs={5.7}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
                    <Checkbox
                        checked={checked}
                        onChange={(e) => handleChange(e, index)}
                        name={data.name}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "60%",
                            cursor: "pointer",
                        }}
                        onClick={navigateToProduct}
                    >
                        <Avatar
                            variant="square"
                            src={img}
                            alt="ghế ảo"
                            sx={{ width: "80px", height: "80px" }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                wordWrap: "break-word",
                                whiteSpace: "normal",
                                overflow: "hidden",
                                display: "-webkit-box",
                                textOverflow: "ellipsis",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                ml: 2,
                                mr: 3,
                            }}
                        >
                            {data?.name}
                        </Typography>
                    </Box>

                    <RepickOption
                        handleClose={handleClose}
                        content={repickText}
                        data={data.options}
                        type={data.type}
                        handleChangeType={handleChangeType}
                    />
                </Grid>
                <Grid item xs={1.8} sx={{ textAlign: "center" }}>
                    <Typography
                        variant="body2"
                        component={"span"}
                        sx={{
                            fontSize: "caption.fontSize",
                            color: "text.secondary",
                            textDecoration: "line-through",
                        }}
                    >
                        {convertMoney(data.sale, lang)}
                    </Typography>
                    <Typography
                        component={"span"}
                        variant="body2"
                        sx={{ ml: 1 }}
                    >
                        {convertMoney(data.price, lang)}
                    </Typography>
                </Grid>
                <Grid item xs={1.5} sx={{ textAlign: "center" }}>
                    <ButtonGroup
                        variant="outlined"
                        aria-label="outlined primary button group"
                        size="small"
                    >
                        <Button onClick={() => handleSetNum(-1, index)}>
                            -
                        </Button>
                        <Button sx={{ px: 1.2 }}>{num}</Button>
                        <Button onClick={() => handleQuantity(1)}>+</Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={1.5}>
                    <Typography
                        variant="body2"
                        color={"orange.main"}
                        sx={{ textAlign: "center" }}
                    >
                        {convertMoney(data.price * num, lang)}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={1.5}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Button
                        onClick={handleDeleteItem}
                        variant="text"
                        size="small"
                        sx={{
                            fontSize: "overline.fontSize",
                            textTransform: "inherit",
                            color: "error.main",
                        }}
                    >
                        {content[0]}
                    </Button>
                    <Button
                        size="small"
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{
                            fontSize: "overline.fontSize",
                            textTransform: "inherit",
                        }}
                    >
                        {content[1]}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(ProductItemCart);
