import React, { useEffect, useState } from "react";

import { Box, Typography, Button, Checkbox } from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

import { useAppSelector } from "~app/hooks";
import { convertMoney } from "~/shared/utils/convertMoney";
import { RootState } from "~app/store";
import CircularProgress from "@mui/material/CircularProgress";

interface TotalCountProps {
    content: string[];
    checkAll: (val: boolean) => void;
    checked: boolean;
    total: number;
    money: number;
    goPayment: () => void;
    deleteItemChecked: () => void;
}

const normalStyle = {
    bgcolor: "orange.main",
    color: "custom.main",
    py: 0.75,
    px: 4.5,
    fontSize: "body2.fontSize",
    textTransform: "capitalize",
    minWidth: "200px",
    "&:hover": {
        opacity: 0.8,
        color: "custom.main",
        borderColor: "orange.main",
        bgcolor: "orange.main",
    },
};
const disabledStyle = {
    bgcolor: "orange.disabled",
    color: "custom.main",
    py: 0.75,
    px: 4.5,
    fontSize: "body2.fontSize",
    textTransform: "capitalize",
    minWidth: "200px",
};

const TotalCount = ({
    content,
    checkAll,
    checked,
    total,
    money,
    goPayment,
    deleteItemChecked,
}: TotalCountProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        checkAll(event.target.checked);
    };
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    const [loading, setLoad] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(true);
    const handleLinkToPayment = () => {
        if (total === 0) return;
        setLoad(true);
        setDisabled(true);
        setTimeout(() => {
            goPayment();
        }, 2000);
    };

    useEffect(() => {
        if (total == 0) setDisabled(true);
        else {
            setDisabled(false);
        }
    }, [total]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                p: 2.5,
                bgcolor: "background.paper",
                position: "sticky",
                bottom: 0,
                "&:before": {
                    content: '" "',
                    position: "absolute",
                    top: "-1.25rem",
                    left: 0,
                    height: "1.25rem",
                    width: "100%",
                    background: "linear-gradient(transparent,rgba(0,0,0,.06))",
                },
            }}
        >
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <Checkbox
                    {...label}
                    onChange={handleChange}
                    checked={checked}
                />
                <Typography variant="body2">
                    {content[0]} ({total})
                </Typography>
                <Button
                    variant="text"
                    onClick={deleteItemChecked}
                    sx={{
                        textTransform: "capitalize",
                        fontSize: "body2.fontSize",
                        color: "text.primary",
                    }}
                >
                    {content[1]}
                </Button>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2">
                    {content[2]} ({total} {content[3]}):{" "}
                    <Typography
                        color={"orange.main"}
                        sx={{ fontWeight: "bolder" }}
                        component={"span"}
                    >
                        {convertMoney(money, lang)}
                    </Typography>
                </Typography>

                <Button
                    size="small"
                    onClick={handleLinkToPayment}
                    sx={disabled ? disabledStyle : normalStyle}
                    disabled={disabled}
                    endIcon={
                        loading && (
                            <CircularProgress
                                size={20}
                                sx={{ color: "custom.main", ml: 1 }}
                            />
                        )
                    }
                >
                    {content[4]}
                </Button>
            </Box>
        </Box>
    );
};

export default React.memo(TotalCount);
