import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Stack , Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useAppDispatch } from "~app/hooks";
import { userLogOut } from "~/auth/store/authAction";
import { useNavigate } from "react-router-dom";

export default function MenuListAvatar() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleRouting = (route: string | null) => {
        if (route === "logout") {
            dispatch(userLogOut());
            navigate("/");
        }
    };

    const handleClose = (
        event: Event | React.SyntheticEvent,
        route: string | null
    ) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        handleRouting(route);
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <div style={{ zIndex: 5 }}>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                    />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom-start"
                                        ? "left top"
                                        : "left bottom",
                            }}
                        >
                            <Paper>
                                <ClickAwayListener
                                    onClickAway={(e) => handleClose(e, null)}
                                >
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem
                                            onClick={(e) =>
                                                handleClose(e, "profile")
                                            }
                                        >
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={(e) =>
                                                handleClose(e, "account")
                                            }
                                        >
                                            My account
                                        </MenuItem>
                                        <MenuItem
                                            onClick={(e) =>
                                                handleClose(e, "logout")
                                            }
                                        >
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}
