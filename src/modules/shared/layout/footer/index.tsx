import {
    Avatar,
    Grid,
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
    ButtonGroup,
    Button,
    Input,
    Stack,
    IconButton,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
const ariaLabel = { "aria-label": "description" };
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { footerStoreText } from "./footer.store";

const Footer = () => {
    const { modeTheme, lang } = useAppSelector(
        (state: RootState) => state.mainSlice
    );

    const { grid1, grid2, grid3, grid4 } = footerStoreText[lang];

    return (
        <Box
            bgcolor={modeTheme === "light" ? "#f8f8f8" : "#202020"}
            component={"footer"}
            px={6.25}
            py={7.5}
        >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography fontSize={"64px"} fontWeight={"bolder"}>
                        {grid1["t0"]}
                    </Typography>
                    <Typography>{grid1["t1"]}</Typography>
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            mt: 3,
                        }}
                    >
                        "{grid1["t2"]}"
                    </Typography>
                    <Typography
                        variant="body2"
                        textTransform={"uppercase"}
                        mt={2.5}
                        mb={1.75}
                    >
                        {grid1["t3"]}
                    </Typography>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Input
                            sx={{ border: 1, borderRight: 0, px: 1 }}
                            placeholder={grid1["t4"]}
                            inputProps={ariaLabel}
                        />

                        <Button
                            sx={{
                                borderRadius: 0,
                                color: "custom.main",
                            }}
                        >
                            {grid1["t5"]}
                        </Button>
                    </ButtonGroup>
                    <Stack direction={"row"} mt={2} spacing={0}>
                        <IconButton>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton>
                            <TwitterIcon />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid item xs={2.66}>
                    <List
                        sx={{
                            bgcolor: "transparent",
                            cursor: "pointer",
                            "& .MuiListSubheader-root": {
                                fontSize: "20px",
                                fontWeight: "bolder",
                                ml: 1,
                                bgcolor: "transparent",
                            },
                            "& .MuiListItemIcon-root": {
                                minWidth: "16px",
                                mt: 0.5,
                            },
                            "& .MuiListItemText-root": {
                                fontSize: "14px",
                                "&:hover": { textDecoration: "underline" },
                            },
                            "& .MuiListItem-root": {
                                alignItems: "flex-start",
                            },
                        }}
                        subheader={<ListSubheader>{grid2.key}</ListSubheader>}
                    >
                        {grid2.value.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <ChevronRightRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    id="switch-list-label-wifi"
                                    primary={item}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={2.66}>
                    <List
                        sx={{
                            bgcolor: "transparent",
                            cursor: "pointer",
                            "& .MuiListSubheader-root": {
                                fontSize: "20px",
                                fontWeight: "bolder",
                                ml: 1,
                                bgcolor: "transparent",
                            },
                            "& .MuiListItemIcon-root": {
                                minWidth: "16px",
                                mt: 0.5,
                            },
                            "& .MuiListItemText-root:hover": {
                                textDecoration: "underline",
                            },
                            "& .MuiListItem-root": {
                                alignItems: "flex-start",
                            },
                        }}
                        subheader={<ListSubheader>{grid3.key}</ListSubheader>}
                    >
                        {grid3.value.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <ChevronRightRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    id="switch-list-label-wifi"
                                    primary={item}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={2.68}>
                    <List
                        sx={{
                            bgcolor: "transparent",
                            cursor: "pointer",
                            "& .MuiListSubheader-root": {
                                fontSize: "20px",
                                fontWeight: "bolder",
                                ml: 1,
                                bgcolor: "transparent",
                            },
                            "& .MuiListItemIcon-root": {
                                minWidth: "16px",
                                mt: 0.5,
                            },
                            "& .MuiListItemText-root:hover": {
                                textDecoration: "underline",
                            },
                            "& .MuiListItem-root": {
                                alignItems: "flex-start",
                            },
                        }}
                        subheader={<ListSubheader>{grid4.key}</ListSubheader>}
                    >
                        {grid4.value.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <ChevronRightRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    id="switch-list-label-wifi"
                                    primary={item}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
