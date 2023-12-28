import {
    Box,
    BoxProps,
    Card,
    styled,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    TypographyProps,
    CardProps,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
interface BannerListContentProps {
    man: {
        img: string;
        text: {
            vn: {
                t1: string;
                t2: string;
                t3: string;
            };
            en: {
                t1: string;
                t2: string;
                t3: string;
            };
        };
        link: string;
    };
    woman: {
        img: string;
        text: {
            vn: {
                t1: string;
                t2: string;
                t3: string;
            };
            en: {
                t1: string;
                t2: string;
                t3: string;
            };
        };
        link: string;
    };
    main: {
        img: string;
        text: {
            vn: {
                t1: string;
                t2: string;
                t3: string;
                t4?: string;
            };
            en: {
                t1: string;
                t2: string;
                t3: string;
                t4?: string;
            };
        };
        link: string;
    };
    btnContent: {
        vn: string;
        en: string;
    };
}

interface BannerItemProps {
    img: string;
    text: {
        vn: {
            t1: string;
            t2: string;
            t3: string;
            t4?: string;
        };
        en: {
            t1: string;
            t2: string;
            t3: string;
            t4?: string;
        };
    };
    link: string;
}

interface BannerListProps {
    lang: "vn" | "en";
    content: BannerListContentProps;
    mode: "light" | "dark";
}

const BennerList = ({ lang, content, mode }: BannerListProps) => {
    const { man, woman, main } = content;

    const Section = styled(Box)<BoxProps>(({ theme }) => ({
        padding: theme.spacing(6.2),
        display: "flex",
        justifyContent: "space-between",
        gap: theme.spacing(3.8),
    }));

    const CustomTypography = styled("div")<TypographyProps>(({ theme }) => ({
        fontSize: 50,
        textAlign: "center",
        textTransform: "uppercase",
        color: mode === "light" ? "rgb(33,30,75)" : theme.palette.text.primary,
        fontWeight: "bolder",
    }));

    const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
        position: "relative",
        flex: 1,
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            bottom: 0,
            height: "25%",
            width: "100%",
        },
    }));

    const renderCard = (bannerItem: BannerItemProps) => {
        const { img, link, text } = bannerItem;

        const t1 = text[lang]["t1"];
        const t2 = text[lang]["t2"];
        const t3 = text[lang]["t3"];
        const t4 = text[lang]["t4"];

        const arr = t4 ? t1.split(",") : [];

        const customCardContent = () =>
            t4 ? (
                <CardContent sx={{ pt: 5 }}>
                    <Box
                        pb={0}
                        component="div"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "center",
                            textTransform: "uppercase",
                            gap: 1,
                            "& p": {
                                color: "custom.main",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 700,
                                mr: -2,
                            }}
                        >
                            {arr[0]}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "130px",
                                fontWeight: "bolder",
                                lineHeight: 1,
                            }}
                        >
                            {arr[1]}
                        </Typography>
                        <Box>
                            <Typography
                                sx={{ fontSize: "40px", fontWeight: 700 }}
                            >
                                {arr[2]}
                            </Typography>
                            <Typography
                                sx={{
                                    width: "100px",
                                    mr: -3.4,
                                }}
                            >
                                {arr[3]}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: "22px",
                            fontWeight: "600",
                            mt: 1.4,
                            textAlign: "center",
                        }}
                        variant="body2"
                        color={"custom.main"}
                    >
                        {t2}
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "12px",
                        }}
                        variant="body2"
                        color={"custom.main"}
                    >
                        {t3}
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "12px",
                        }}
                        variant="body2"
                        color={"custom.main"}
                    >
                        {t4}
                    </Typography>
                </CardContent>
            ) : (
                <CardContent sx={{ pt: 5 }}>
                    <Typography
                        pb={0}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        <CustomTypography>{t1}</CustomTypography>
                        <CustomTypography>{t2}</CustomTypography>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 28,
                            fontWeight: 500,
                            textAlign: "center",
                            textTransform: "uppercase",
                            mt: -2,
                        }}
                        variant="body2"
                        color={
                            mode === "light" ? "rgb(33,30,75)" : "text.primary"
                        }
                    >
                        {t3}
                    </Typography>
                </CardContent>
            );

        return (
            <StyledCard
                sx={{
                    backgroundColor: t4 ? "#aa2e25" : "auto",
                    "&:before": {
                        backgroundColor: t4
                            ? `linear-gradient(0deg, #a02725
                            , transparent)`
                            : `linear-gradient(0deg, ${
                                  mode === "light" ? grey[200] : grey[800]
                              }, transparent)`,
                    },
                }}
            >
                <CardMedia
                    sx={{ height: 356 }}
                    image={img}
                    title="green iguana"
                />

                {customCardContent()}

                <CardActions
                    sx={{
                        mt: t4 ? 0 : 5.5,
                        mb: t4 ? 0 : 3.5,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            width: "120",
                            height: 34,
                            fontWeight: "bold",
                            color: t4 ? "custom.main" : "info.main",
                        }}
                    >
                        {content["btnContent"][lang]}
                    </Button>
                </CardActions>
            </StyledCard>
        );
    };

    return (
        <Section>
            {renderCard(man)}
            {renderCard(main)}
            {renderCard(woman)}
        </Section>
    );
};

export default BennerList;
