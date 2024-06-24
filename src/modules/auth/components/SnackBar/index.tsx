import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { changeStatus } from "~/shared/store/snackbar";
import { useAppDispatch } from "~app/hooks";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PositionedSnackbar() {
    const { open, message, status } = useAppSelector(
        (state: RootState) => state.snackbar
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(changeStatus({ status, message, open: false }));
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [open]);

    const handleClose = () => {
        dispatch(changeStatus({ open: false }));
    };

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={"vertical" + "horizontal"}
            >
                <Alert
                    onClose={handleClose}
                    severity={status as AlertColor}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
