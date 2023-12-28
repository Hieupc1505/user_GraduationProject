import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import UserSign from "../UserSign";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import SignUP from "../SignUp";
import PositionedSnackbar from "../SnackBar";
import { authStoreText } from "./auth.text";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface BasicTabsProps {
    open: boolean;
    handleClose: () => void;
    lang: "vn" | "en";
}

export default function BasicTabs({ open, handleClose, lang }: BasicTabsProps) {
    const [value, setValue] = React.useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue);
        setValue(newValue);
    };

    const signOption = (val: number) => {
        setValue(val);
    };

    const { signInText, signUpText } = authStoreText;
    // console.log(value === 1);
    return (
        <div>
            <Dialog
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                onClose={handleClose}
                open={open}
            >
                <PositionedSnackbar />
                <Box borderRadius={"4px"} overflow={"hidden"}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                width: "100%",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Tab
                                label={signInText[lang]["title"]}
                                {...a11yProps(0)}
                                sx={{ flex: 1 }}
                            />
                            <Tab
                                label={signUpText[lang]["title"]}
                                {...a11yProps(1)}
                                sx={{ flex: 1 }}
                            />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={value} index={0}>
                        {value === 0 && (
                            <UserSign
                                lang={lang}
                                content={signInText[lang]}
                                signOption={signOption}
                            />
                        )}
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        {value === 1 && (
                            <SignUP
                                lang={lang}
                                signOption={signOption}
                                content={signUpText[lang]}
                            />
                        )}
                    </CustomTabPanel>
                </Box>
            </Dialog>
        </div>
    );
}
