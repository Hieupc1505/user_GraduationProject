import React from "react";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import { storeText } from "./navigate.text";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignOut } from "~/shared/store/userAction";

const NavigateSetting = () => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        setOpen(!open);
    };

    const { lang } = useAppSelector((state: RootState) => state.mainSlice);
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    const handleLogOut = async () => {
        // dispatch(userLogOut());
        dispatch(userSignOut());

        navigate("/");
    };

    const handleClickItemList = (index: number) => {
        if (index === 0) navigate("info");
        if (index === 1) navigate("order");
        if (index === 2) navigate("liked");
        if (index === 3) handleLogOut();
    };

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                border: "1px solid ",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Settings
                </ListSubheader>
            }
        >
            <Divider />
            {storeText[lang]["navigate"].map((item, index) => (
                <ListItemButton
                    key={index}
                    onClick={() => handleClickItemList(index)}
                >
                    {/* <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon> */}

                    <ListItemText primary={item} />
                </ListItemButton>
            ))}
            {/* <ListItemButton>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse> */}
        </List>
    );
};

export default NavigateSetting;
