import React, { memo } from "react";

import { Button, ButtonProps } from "@mui/material";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";

interface BtnActionProps extends ButtonProps {
    content: string;
}

const BtnAction = ({ content, ...props }: BtnActionProps) => {
    return <Button {...props}>{content}</Button>;
};

export default memo(BtnAction);
