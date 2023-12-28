import React, { memo } from "react";
import { ReactElement } from "react";
import {
    Box,
    CardMedia,
    Card,
    styled,
    CardActionArea,
    CardContent,
    Typography,
    Stack,
    SxProps,
} from "@mui/material";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import { productProps } from "~/product/store/productSlice";
import { convertMoney } from "~/shared/utils/convertMoney";
interface ProductListsProps {
    variant: "square" | "rectangle";
    lang: "vn" | "en";
    sale?: number;
    data: productProps;
    sx?: SxProps;
}
const ProductItem = ({
    lang,
    variant = "square",
    sale,
    data,
    sx = {},
}: ProductListsProps) => {
    const CardMediaCustom: ReactElement = (
        <Box
            sx={{
                width: "100%",
                paddingTop: variant === "square" ? "100%" : "150%",
                position: "relative",
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                }}
                image={data.images.main}
                alt="green iguana"
            />
        </Box>
    );

    return (
        <Card sx={sx}>
            <CardActionArea sx={{ position: "relative" }}>
                {CardMediaCustom}
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            wordWrap: "break-word",
                            whiteSpace: "normal",
                            overflow: "hidden",
                            display: "-webkit-box",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            // -webkit-box-orient: vertical;
                            // -webkit-line-clamp: 2
                            fontSize: "18px",
                            minHeight: "48px",
                        }}
                    >
                        {data.name}
                    </Typography>
                    <Box mt={1}>
                        <Box component={"span"} mr={1.5}>
                            {/* <Typography
                                component={"span"}
                                color="grey"
                                variant="caption"
                                sx={{ textDecoration: "underline" }}
                            >
                                {lang === "vn" ? "đ" : "$"}
                            </Typography> */}
                            <Typography
                                component={"span"}
                                color="grey"
                                variant="subtitle1"
                                sx={{ textDecoration: "line-through" }}
                            >
                                {convertMoney(data.price * 0.9, lang)}
                            </Typography>
                        </Box>

                        <Box component={"span"}>
                            {/* <Typography
                                component={"span"}
                                color="red"
                                variant="body2"
                                sx={{ textDecoration: "underline" }}
                            >
                                {lang === "vn" ? "đ" : "$"}
                            </Typography> */}
                            <Typography
                                component={"span"}
                                color="red"
                                variant="h6"
                            >
                                {convertMoney(data.price, lang)}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 1,
                            mt: 1.5,
                        }}
                    >
                        <Stack
                            className="rate"
                            direction={"row"}
                            spacing={0.125}
                        >
                            <StarIcon
                                sx={{ color: "#ffce3d", fontSize: "12px" }}
                            />
                            <StarIcon
                                sx={{ color: "#ffce3d", fontSize: "12px" }}
                            />
                            <StarIcon
                                sx={{ color: "#ffce3d", fontSize: "12px" }}
                            />
                            <StarHalfIcon
                                sx={{ color: "#ffce3d", fontSize: "12px" }}
                            />
                        </Stack>
                        <Typography
                            component={"span"}
                            variant="subtitle1"
                            fontWeight={500}
                            fontSize={"0.8rem"}
                        >
                            Đã bán {data.inventory.selled}
                        </Typography>
                    </Box>
                </CardContent>
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: `6px 6px 0px`,
                        background: "#ffce3d",
                        textAlign: "center",
                        "&:after": sale
                            ? {
                                  content: '""',
                                  width: 0,
                                  height: 0,
                                  left: 0,
                                  bottom: "-4px",
                                  position: "absolute",
                                  borderColor:
                                      "transparent rgba(255,212,36,.9)",
                                  borderStyle: "solid",
                                  borderWidth: "0 27px 4px",
                              }
                            : {
                                  content: '""',
                                  width: 0,
                                  height: 0,
                                  top: 0,
                                  left: "-12px",
                                  position: "absolute",
                                  borderColor:
                                      "rgba(255,212,36,.9) transparent ",
                                  borderStyle: "solid",
                                  borderWidth: "22px 0 22px 12px",
                              },
                    }}
                >
                    {sale !== 0 ? (
                        <>
                            <Typography
                                component={"div"}
                                variant={"subtitle2"}
                                sx={{ color: "red" }}
                            >
                                {Math.floor(Math.random() * 20)}%
                            </Typography>
                            <Typography
                                component={"div"}
                                variant={"subtitle2"}
                                textTransform={"uppercase"}
                                color={"custom.main"}
                            >
                                GiẢM
                            </Typography>
                        </>
                    ) : (
                        <Typography
                            component={"div"}
                            variant={"subtitle2"}
                            textTransform={"uppercase"}
                            color={"custom.main"}
                            p={1}
                        >
                            Comming Soon
                        </Typography>
                    )}
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default memo(ProductItem);
