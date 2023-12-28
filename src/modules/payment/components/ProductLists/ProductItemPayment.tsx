import React from "react";
import {
    Avatar,
    Box,
    Typography,
    ButtonGroup,
    Button,
    Divider,
    TextField,
} from "@mui/material";
import VoucherIcon from "~/payment/assets/svg/voucher";
import { grey } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { cartStoreItem } from "~/cart/store/cartAction";
import { convertMoney } from "~/shared/utils/convertMoney";

const ProductItemPayment = ({
    lang,
    product,
}: {
    lang: "en" | "vn";
    product: cartStoreItem;
}) => {
    return (
        <Box
            className={"productitem"}
            sx={{
                display: "flex",
                alignItems: "center",
                pt: 1.5,
                px: 4.75,
                pb: 3,
            }}
        >
            <Box flex={4} sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    variant="square"
                    src={product.img}
                    sx={{ width: "60px", height: "60px" }}
                    alt="akdjfka"
                />
                <Typography variant="body2" sx={{ ml: 1.5 }}>
                    {product.name}
                </Typography>
            </Box>
            <Typography
                variant="body2"
                color={"text.secondary"}
                textAlign={"center"}
                flex={3}
            >
                {lang === "vn" ? "Loại" : "Type"}: {product.type}
            </Typography>
            <Typography variant="body2" flex={1}>
                {convertMoney(product.price, lang)}
            </Typography>
            <Typography variant="body2" flex={1} textAlign={"center"}>
                {product.quantity}
            </Typography>
            <Typography variant="body2" flex={2} textAlign={"right"}>
                {convertMoney(product.price * product.quantity, lang)}
            </Typography>
        </Box>
    );
};

export default ProductItemPayment;
