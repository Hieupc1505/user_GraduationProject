import { Fragment } from "react";
import { Grid, Typography, styled, TypographyProps } from "@mui/material";

interface productInfoProps {
    content: string[];
}

import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";

const ProductInfo = ({ content }: productInfoProps) => {
    const { product } = useAppSelector(
        (state: RootState) => state.productSlice
    );
    const danhMucList = [
        { key: "Danh Mục", value: "Quần áo > Dày da, Mẹ & bé" },
        { key: "Chất Liệu", value: "Nhựa, Sợi vải" },
        { key: "Ngày Sản Xuất", value: "01-12-2021" },
        { key: "Số Lượng hàng kho", value: 2343 },
        { key: "Số Lượng còn lại", value: 345 },
    ];

    const TitleText = styled(Typography)<TypographyProps>(({ theme }) => ({
        padding: theme.spacing(1.75),
        background: theme.palette.mode === "light" ? "#e0e0e0" : "#191919",
        textTransform: "uppercase",
    }));

    return (
        <Grid container>
            <Grid item xs={9} className={"productInfo"}>
                <TitleText variant="body1">{content[0]}</TitleText>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 1.75,
                        ml: 0,
                    }}
                >
                    {danhMucList.map((item, index) => (
                        <Fragment key={index}>
                            <Grid item xs={2}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        pt: 0,
                                        color: "text.secondary",
                                    }}
                                >
                                    {item.key}
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography
                                    variant="body2"
                                    color={"text.primary"}
                                    sx={{ pt: 0 }}
                                >
                                    {item.value}
                                </Typography>
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
                <TitleText variant="body1" mt={3.75}>
                    {content[1]}
                </TitleText>
                <Typography
                    sx={{
                        whiteSpace: "pre-line",
                        lineHeight: 1.85,
                        padding: "15px",
                        pt: 3.75,
                    }}
                    variant="body2"
                >
                    {product && product.description}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ProductInfo;
