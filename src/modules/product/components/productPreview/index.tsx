import {
    Container,
    Box,
    BoxProps,
    styled,
    Avatar,
    Grid,
    Rating,
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import OptionDetail from "../optionDetail";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ProductImg from "./productImg";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { productProps } from "~/product/store/productSlice";
import { convertMoney } from "~/shared/utils/convertMoney";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { addToCart } from "~/cart/store/cartAction";
import { useNavigate, useParams } from "react-router-dom";
import ProductInfoFeature from "../ProductInfoFeature";
import { RootState } from "~app/store";
import { changeStatus } from "~/shared/store/snackbar";
import cartSlice, { cartItemProps } from "~/cart/store/cartSlice";
import { errorProductPreview } from "./text";
// import { getText } from "~/shared/utils/getTextbyLang";
import { getMessage } from "~/product/layout/prodDetail.text";
import { useEffect, useState } from "react";
import productAPI from "~/product/api/product.api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface ProductPreviewProps {
    productPreviewContent: {
        action: string[];
        titleInfo: {
            infoRating: string[];
            listOptions: string[];
            actionBtn: string[];
        };
    };
    product: productProps | null;
    lang: "vn" | "en";
}

const ProductPreview = ({
    productPreviewContent,
    product,
    lang,
}: ProductPreviewProps) => {
    const { action, titleInfo } = productPreviewContent;
    const dispatch = useAppDispatch();
    const [like, setLike] = useState<boolean>(false);
    const { id } = useParams();
    const { user } = useAppSelector((state: RootState) => state.userReducer);
    const { cart } = useAppSelector((state: RootState) => state.cartReducer);
    const navigate = useNavigate();
    const BoxFlexRow = styled(Box)<BoxProps>(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(0.5),
    }));

    useEffect(() => {
        setLike(() => {
            if (id) return user?.liked.includes(id) || false;
            return false;
        });
    }, [product, user]);

    const handleAddCart = (num: number, options: string) => {
        if (!user) {
            navigate("/user/login", { state: { link: location.pathname } });
        } else if (product && id && user)
            if (!productExistInCart(id, cart))
                // console.log(`check:::${productExistInCart}`);

                dispatch(
                    addToCart({
                        productId: id,
                        price: product?.price,
                        quantity: num,
                        selected: options.toString(),
                    })
                );
            else {
                dispatch(
                    changeStatus({
                        open: true,
                        status: "error",
                        message: errorProductPreview["addCart"][lang],
                    })
                );
            }
    };

    const handleByNow = async (num: number, options: string) => {
        if (!user)
            navigate("/user/login", { state: { link: location.pathname } });
        else if (product && id && user) {
            navigate("/payment", {
                state: {
                    from: "product",
                    products: [
                        {
                            brand: product.brand,
                            img: product.images.main,
                            inventory: product.inventory.quantity,
                            name: product.name,
                            options: product.options,
                            price: product.price,
                            productId: product._id,
                            quantity: num,
                            sale: 150000 * num,
                            type: hadleType(
                                options,
                                product.options[0].value,
                                product.options[1].value
                            ),
                        },
                    ],
                },
            });
        }
    };

    const handleAddLikedProduct = async () => {
        if (!user) {
            dispatch(
                changeStatus({
                    open: true,
                    status: "warning",
                    message: getMessage("addLike", lang),
                })
            );
        }
        if (user && product?._id && !like) {
            const data = await productAPI.addLikeProduct(product._id);
            if (data.success) {
                dispatch(
                    changeStatus({
                        open: true,
                        status: "success",
                        message: getMessage("success", lang),
                    })
                );
            }
        }
        setLike(() => !like);
    };

    return (
        <Grid container spacing={4}>
            <Grid item lg={5}>
                {product && (
                    <ProductImg
                        main={product.images.main}
                        list={product.images.list}
                    />
                )}
                <Box
                    display={"flex"}
                    alignItems={"cetner"}
                    justifyContent={"center"}
                    sx={{ gap: 5, mt: 3 }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Typography>{action[0]}: </Typography>
                        <FacebookOutlinedIcon />
                        <TwitterIcon />
                        <MapsUgcIcon />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box display={"flex"} alignItems={"center"}>
                        {like && (
                            <Checkbox
                                {...label}
                                icon={<Favorite />}
                                checkedIcon={<Favorite />}
                                color="orange"
                                sx={{ color: "orange.main" }}
                                onClick={() => handleAddLikedProduct()}
                            />
                        )}
                        {!like && (
                            <Checkbox
                                {...label}
                                icon={<FavoriteBorder />}
                                checkedIcon={<FavoriteBorder />}
                                color="orange"
                                sx={{ color: "orange.main" }}
                                onClick={() => handleAddLikedProduct()}
                            />
                        )}
                        <Typography variant="body1" ml={1}>
                            {action[1]} (276)
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            {/* Data from product*/}
            <Grid item lg={7}>
                <Box sx={{ width: "100%" }}>
                    <Typography
                        sx={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            overflow: "hidden",
                            display: "-webkit-box",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            fontSize: "h6.fontSize",
                        }}
                        component={"div"}
                    >
                        {product?.name}
                    </Typography>
                    <Stack direction={"row"} spacing={3} mt={2}>
                        <BoxFlexRow>
                            <Typography
                                sx={{
                                    color: "#ee4d2d",
                                    borderBottom: 1,
                                    borderColor: "#ee4d2d",
                                }}
                            >
                                4.9
                            </Typography>
                            <Rating
                                size="small"
                                name="read-only"
                                value={5}
                                readOnly
                                sx={{
                                    color: "#ee4d2d",
                                    mb: 0.25,
                                }}
                            />
                        </BoxFlexRow>
                        <Divider
                            orientation="vertical"
                            flexItem
                            variant="middle"
                        />
                        <BoxFlexRow>
                            <Typography
                                sx={{
                                    borderBottom: 1,
                                }}
                            >
                                7.2k
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    textTransform: "capitalize",
                                    color: "grey.600",
                                }}
                            >
                                {titleInfo.infoRating[0]}
                            </Typography>
                        </BoxFlexRow>
                        <Divider
                            orientation="vertical"
                            flexItem
                            variant="middle"
                        />
                        <BoxFlexRow>
                            <Typography
                                sx={{
                                    borderBottom: 1,
                                }}
                            >
                                {product?.inventory.selled}
                            </Typography>
                            <Typography
                                sx={{
                                    textTransform: "capitalize",
                                    color: "grey.600",
                                }}
                            >
                                {titleInfo.infoRating[1]}
                            </Typography>
                        </BoxFlexRow>
                    </Stack>
                    <Typography component={"div"} mt={4}>
                        <Typography
                            component={"span"}
                            variant="body2"
                            sx={{
                                textDecoration: "line-through",
                                color: "grey.400",
                                mr: 2,
                            }}
                        >
                            {product?.price &&
                                convertMoney(+product?.price / 2, lang)}
                        </Typography>
                        <Typography
                            variant="h5"
                            color="orange.main"
                            component={"span"}
                        >
                            {product?.price &&
                                convertMoney(+product?.price, lang)}
                        </Typography>
                    </Typography>
                    <OptionDetail
                        listOptions={titleInfo["listOptions"]}
                        actionBtn={titleInfo["actionBtn"]}
                        options={product?.options}
                        quantity={product?.inventory.quantity}
                        handleAddCart={handleAddCart}
                        handleByNow={handleByNow}
                    />
                    <Divider variant="middle" sx={{ mt: 4 }} />
                    <ProductInfoFeature />
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProductPreview;

const productExistInCart = (productId: string, cart: cartItemProps[]) => {
    return cart.some((product) => product.productId === productId);
};

const hadleType = (str: string, colors: string[], sizes: string[]) => {
    const opts = str.split(",");
    return (
        colors[Number.parseInt(opts[0])].toString() +
        "," +
        sizes[Number.parseInt(opts[1])]
    );
};
