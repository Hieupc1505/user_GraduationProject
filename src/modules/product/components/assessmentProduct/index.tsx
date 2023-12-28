import {
    Typography,
    TypographyProps,
    styled,
    Box,
    Grid,
    Rating,
    Stack,
    Button,
    Avatar,
    Divider,
    Pagination,
} from "@mui/material";
import React from "react";

interface AssessmentProductProps {
    assessmentContent: {
        title: string;
        overview: {
            pre: string;
            list: string[];
        };
    };
}

const AssessmentProduct = ({ assessmentContent }: AssessmentProductProps) => {
    const { title, overview } = assessmentContent;
    const TitleText = styled(Typography)<TypographyProps>(({ theme }) => ({
        padding: theme.spacing(1.75),
        textTransform: "uppercase",
    }));

    return (
        <>
            <TitleText variant="body2">{title}</TitleText>
            <Grid
                container
                sx={{
                    backgroundColor: "orange.light",
                    mt: 1,
                }}
            >
                <Grid item xs={2} padding={3.75}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "baseline",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "30px",
                                color: "orange.main",
                            }}
                        >
                            4.9
                        </Typography>
                        <Typography
                            sx={{
                                color: "orange.main",
                                fontSize: "18px",
                                ml: 1,
                            }}
                        >
                            {overview["pre"]} 5
                        </Typography>
                    </Box>
                    <Rating
                        color="orange.main"
                        name="read-only"
                        value={5}
                        readOnly
                    />
                </Grid>
                <Grid item xs={10}>
                    <Stack
                        direction={"row"}
                        sx={{
                            flexWrap: "wrap",
                            gap: "14px",
                            alignItems: "center",
                            padding: 3.75,
                        }}
                    >
                        {overview["list"].map((item, index) => (
                            <Button key={index} variant="outlined">
                                {item}
                            </Button>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                }}
                className="product-user-rating"
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        minHeight: "200px",
                    }}
                >
                    <Avatar src="/broken-image.jpg" />
                </Box>
                <Box
                    sx={{
                        flexGrow: 11,
                        minHeight: "200px",
                        ml: 1.5,
                    }}
                >
                    <Box>
                        <Typography variant="caption" component={"div"}>
                            Hà Diệu Như
                        </Typography>
                        <Rating
                            color="orange.main"
                            name="read-only"
                            value={4}
                            readOnly
                            size="small"
                        />
                        <Box
                            className={"detail-date"}
                            sx={{
                                display: "flex",
                                "& span": { color: "text.secondary" },
                            }}
                        >
                            <Typography variant="caption">
                                2023-03-25 11:03
                            </Typography>
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ mx: 1.5 }}
                            />
                            <Typography variant="caption">
                                Phân loại hàng: Hươu Xanh,Kèm Pin
                            </Typography>
                        </Box>
                        <Typography
                            className="comment"
                            variant="body2"
                            sx={{ mt: 1.75 }}
                        >
                            Giao hàng nhanh. Đầy đủ, màu sắc xinh xỉu. Em bé
                            chơi thích lắm. Giá rẻ mà hàng tốt. Nhớ bật công tắc
                            đen bên hông nhạc mới kêu nha
                        </Typography>
                        <Stack
                            direction={"row"}
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                mt: 1.75,
                            }}
                        >
                            <Box
                                width={72}
                                paddingTop={"72px"}
                                sx={{
                                    bgcolor: "red",
                                    backgroundImage:
                                        "url(https://source.unsplash.com/random?wallpapers)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            ></Box>
                            <Box
                                width={72}
                                paddingTop={"72px"}
                                sx={{
                                    bgcolor: "red",
                                    backgroundImage:
                                        "url(https://source.unsplash.com/random?wallpapers)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            ></Box>
                            <Box
                                width={72}
                                paddingTop={"72px"}
                                sx={{
                                    bgcolor: "red",
                                    backgroundImage:
                                        "url(https://source.unsplash.com/random?wallpapers)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            ></Box>
                            <Box
                                width={72}
                                paddingTop={"72px"}
                                sx={{
                                    bgcolor: "red",
                                    backgroundImage:
                                        "url(https://source.unsplash.com/random?wallpapers)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}
                            ></Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                }}
                className="product-user-rating"
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        minHeight: "200px",
                    }}
                >
                    <Avatar src="/broken-image.jpg" />
                </Box>
                <Box
                    sx={{
                        flexGrow: 11,
                        minHeight: "200px",
                        ml: 1.5,
                    }}
                >
                    <Box>
                        <Typography variant="caption" component={"div"}>
                            Hà Diệu Như
                        </Typography>
                        <Rating
                            color="orange.main"
                            name="read-only"
                            value={4}
                            readOnly
                            size="small"
                        />
                        <Box
                            className={"detail-date"}
                            sx={{
                                display: "flex",
                                "& span": { color: "grey.400" },
                            }}
                        >
                            <Typography variant="caption">
                                2023-03-25 11:03
                            </Typography>
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ mx: 1.5 }}
                            />
                            <Typography variant="caption">
                                Phân loại hàng: Hươu Xanh,Kèm Pin
                            </Typography>
                        </Box>
                        <Typography
                            className="comment"
                            variant="body2"
                            sx={{ mt: 1.75 }}
                        >
                            Giao hàng nhanh. Đầy đủ, màu sắc xinh xỉu. Em bé
                            chơi thích lắm. Giá rẻ mà hàng tốt. Nhớ bật công tắc
                            đen bên hông nhạc mới kêu nha
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
            {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    pt: 3,
                    pb: 2,
                }}
            >
                <Pagination count={10} />
            </Box> */}
        </>
    );
};

export default AssessmentProduct;
