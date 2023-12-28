import {
    Stack,
    styled,
    Button,
    IconButton,
    Divider,
    Box,
    Badge,
} from "@mui/material";
import { ButtonProps } from "@mui/material";
import { StackProps } from "@mui/material";

import { DividerProps } from "@mui/material";
import { BadgeProps } from "@mui/material";

export const StackNav = styled(Stack)<StackProps>(({ theme }) => ({}));

export const Item = styled("div")(({ theme }) => ({
    background: "transparent",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.custom.main ?? "white",
}));

export const ButtonNav = styled(Button)<ButtonProps>(({ theme }) => ({
    background: "transparent",
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.custom.main ?? "white",
    textTransform: "none",
}));

export const StyledDivider = styled(Divider)<DividerProps>(({ theme }) => ({
    borderColor: theme.palette.primary.dark,
    alignSelf: "auto",
    height: "20px",
}));

export const BadgeExtend = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        top: "4px",
        right: "8px",
    },
}));
