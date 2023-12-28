import React, { Fragment } from "react";
import { Box, Grid, Typography, styled, TypographyProps } from "@mui/material";
import { productProps } from "~/product/store/productSlice";

interface productInfoProps {
    content: string[];
}

import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";

const ProductInfo = ({ content }: productInfoProps) => {
    const { isLoad, product, error } = useAppSelector(
        (state: RootState) => state.productSlice
    );
    const danhMucList = [
        { key: "Danh Mục", value: "Quần áo > Dày da, Mẹ & bé" },
        { key: "Chất Liệu", value: "Nhựa, Sợi vải" },
        { key: "Ngày Sản Xuất", value: "01-12-2021" },
        { key: "Số Lượng hàng kho", value: 2343 },
        { key: "Số Lượng còn lại", value: 345 },
    ];

    const textDetail =
        "Sản phẩm thảm nhạc cho bé với rất nhiều tiện ích và ưu điểm:" +
        "\n * Kích thích phát triển thị giác và trí não nhờ" +
        "các đồ vật treo ngộ nghĩnh cùng các sắc màu tươi vui *" +
        "Tăng cường sự vận động cơ thể của trẻ, đặc biệt là tay" +
        "và chân khi nằm chơi \n* Ba mẹ sẽ rảnh rang hơn vì bé tập" +
        "trung chơi đùa với thảm nhạc mà không quấy khóc Đặc điểm" +
        "của loại thảm nhạc cho bé kết hợp chơi và vận động:\n 1." +
        "Thảm chơi nhạc cho bé chạy bằng 3 pin tiểu \n2. Sản phẩm" +
        "được làm từ loại vật liệu cao cấp, an toàn với sức khỏe" +
        "của bé, thân thiện môi trường \n3. Đệm nằm êm ái, có nhiều" +
        "hình thù móc treo ngộ nghĩnh \n4. Màu sắc bắt mắt kích" +
        "thích thị giác và trí tò mò của trẻ. \n5. Các phím đàn" +
        "chạm vào sẽ phát nhạc, tăng cường khả năng nghe của bé" +
        "\n6. Bé có thể chơi đàn piano khi nhỏ bằng chân, và bằng" +
        "tay khi bé đã ngồi vững Với sản phẩm thảm chơi nhạc cho" +
        "bé này sẽ giúp bé phát triển cả thể lực và trí tuệ. Cũng" +
        "như giải phóng cho các mẹ bớt thời gian phải chơi và" +
        "trông bé. Bé hoàn toàn vừa nằm chơi bên cạnh để mẹ có" +
        "thể làm thêm các việc nhà khác. Sản phẩm thảm nhạc cho" +
        "bé nằm chơi phù hợp cho bé trong một thời gian dài phát" +
        "triển. Từ lúc bé còn nằm ngửa đến khi bé có thể ngồi, bò" +
        "và đi.";

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
