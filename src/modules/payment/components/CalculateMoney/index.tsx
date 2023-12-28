import { Box, Button, Typography, BoxProps, styled } from "@mui/material";
import React from "react";
import { cartStoreItem } from "~/cart/store/cartAction";
import { convertMoney } from "~/shared/utils/convertMoney";

interface CalculateMoneyProps {
    content: string[];
    lang: "en" | "vn";
    data: cartStoreItem[];
    type: string;
    ship: any;
    handleOrder: () => void;
}

const CalculateMoney = ({
    content,
    lang,
    data,
    type,
    ship,
    handleOrder,
}: CalculateMoneyProps) => {
    const lib = (function () {
        const number = data.length;
        let count = 0;
        data.map((item) => {
            count += item.price * item.quantity;
        });
        const dilivery = ship[type];

        const total = count + dilivery;

        return {
            number,
            count,
            ship: dilivery,
            total,
        };
    })();

    const BoxGroup = styled(Box)<BoxProps>(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
    }));

    return (
        <Box
            sx={{
                pb: 3.75,
                px: 3,
                bgcolor: "background.paper",
                mt: 1.5,
                pt: 1.5,
                borderRadius: "4px",
                "& p": {
                    py: 1.5,
                },
            }}
        >
            <Typography
                variant="body1"
                fontWeight={"bold"}
                sx={{
                    gridColumnStart: 1,
                    gridColumnEnd: 3,
                    gridRowStart: 1,
                    gridRowEnd: 2,
                }}
            >
                {content[0]}
            </Typography>
            <BoxGroup>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 1,
                        gridColumnEnd: 2,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                    }}
                >
                    {content[1]}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 2,
                        gridColumnEnd: 3,
                        gridRowStart: 2,
                        gridRowEnd: 3,
                        textAlign: "right",
                    }}
                >
                    {lib["number"]}
                </Typography>
            </BoxGroup>
            <BoxGroup>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 1,
                        gridColumnEnd: 2,
                        gridRowStart: 3,
                        gridRowEnd: 4,
                    }}
                >
                    {content[2]}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 2,
                        gridColumnEnd: 3,
                        gridRowStart: 3,
                        gridRowEnd: 4,
                        textAlign: "right",
                    }}
                >
                    {convertMoney(lib["count"], lang)}
                </Typography>
            </BoxGroup>
            <BoxGroup>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 1,
                        gridColumnEnd: 2,
                        gridRowStart: 4,
                        gridRowEnd: 5,
                    }}
                >
                    {content[3]}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 2,
                        gridColumnEnd: 3,
                        gridRowStart: 4,
                        gridRowEnd: 5,
                        textAlign: "right",
                    }}
                >
                    {convertMoney(lib["ship"], lang)}
                </Typography>
            </BoxGroup>
            {/* Khuyến mại */}
            {/* <BoxGroup>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 1,
                        gridColumnEnd: 2,
                        gridRowStart: 4,
                        gridRowEnd: 5,
                    }}
                >
                    {"Sale Off"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 2,
                        gridColumnEnd: 3,
                        gridRowStart: 4,
                        gridRowEnd: 5,
                        textAlign: "right",
                    }}
                >
                    {convertMoney(-1.6, lang)}
                </Typography>
            </BoxGroup> */}

            <BoxGroup>
                <Typography
                    variant="body2"
                    sx={{
                        gridColumnStart: 1,
                        gridColumnEnd: 2,
                        gridRowStart: 5,
                        gridRowEnd: 6,
                    }}
                >
                    {content[5]}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        gridColumnStart: 2,
                        gridColumnEnd: 3,
                        gridRowStart: 5,
                        gridRowEnd: 6,
                        textAlign: "right",
                        color: "orange.main",
                        fontWeight: "bold",
                    }}
                >
                    {convertMoney(lib["total"], lang)}
                </Typography>
            </BoxGroup>

            <Button
                sx={{
                    width: "100%",
                    bgcolor: "orange.main",
                    color: "custom.main",
                    mt: 1.2,
                }}
                onClick={handleOrder}
            >
                {content[6]}
            </Button>
        </Box>
    );
};

export default React.memo(CalculateMoney);
