import React from "react";
import {
    Box,
    styled,
    SxProps,
    Typography,
    Checkbox,
    TypographyProps,
    Grid,
} from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface PreCheckProps {
    sx: SxProps;
    content: string[];
    checkAll: (val: boolean) => void;
    checked: boolean;
}

const PreCheck = ({ sx, content, checkAll, checked }: PreCheckProps) => {
    const CustomTypography = styled(Typography)<TypographyProps>(
        ({ theme }) => ({
            color: theme.palette.text.secondary,
            textAlign: "center",
            lineHeight: "43px",
        })
    );
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        checkAll(event.target.checked);
    };

    return (
        <Box sx={sx}>
            <Grid container>
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
                        {...label}
                        onChange={handleChange}
                        checked={checked}
                    />
                    <Typography variant="body2">{content[0]}</Typography>
                </Grid>
                <Grid item xs={1.8}>
                    <CustomTypography variant="body2">
                        {content[1]}
                    </CustomTypography>
                </Grid>
                <Grid item xs={1.5}>
                    <CustomTypography variant="body2">
                        {content[2]}
                    </CustomTypography>
                </Grid>
                <Grid item xs={1.5}>
                    <CustomTypography variant="body2">
                        {content[3]}
                    </CustomTypography>
                </Grid>
                <Grid item xs={1.5}>
                    <CustomTypography variant="body2">
                        {content[4]}
                    </CustomTypography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(PreCheck);
