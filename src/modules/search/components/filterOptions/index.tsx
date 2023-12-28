import React from "react";
import {
    Box,
    Button,
    Typography,
    styled,
    List,
    TypographyProps,
    TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxItem from "../CheckBoxItem";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { renderText } from "~/search/layout/search.text";
import { useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
interface filterOptionProps {
    category: string[];
    handleQuerySearch: (min: string, max: string) => void;
}
const FilterOptions = ({ category, handleQuerySearch }: filterOptionProps) => {
    const TitleAccordion = styled(Typography)<TypographyProps>(({ theme }) => ({
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: theme.typography.body2.fontSize,
    }));
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const min = data.get("from"),
            max = data.get("to");

        handleQuerySearch(min as string, max as string);
    };

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     // console.log({
    //     //     email: data.get("email"),
    //     //     password: data.get("password"),
    //     // });

    //     dispatch(
    //         userSignIn({
    //             email: data.get("email") as string,
    //             password: data.get("password") as string,
    //         })
    //     ).then((res) => {
    //         if (res.payload) {
    //             navigate(state?.from || "/");
    //         }
    //     });
    // };

    return (
        <Box className={"Filter-options"}>
            <Button variant="text" startIcon={<FilterAltOutlinedIcon />}>
                {renderText("filters", lang)}
            </Button>
            <div>
                <Accordion disableGutters elevation={2}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <TitleAccordion>
                            {renderText("category", lang)}
                        </TitleAccordion>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0 }}>
                        <List
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                            }}
                        >
                            {!!category.length &&
                                category.map((item, index) => {
                                    return (
                                        <CheckBoxItem
                                            key={index}
                                            index={index}
                                            value={item}
                                        />
                                    );
                                })}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters elevation={2}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <TitleAccordion>
                            {renderText("rate", lang)}
                        </TitleAccordion>
                    </AccordionSummary>
                    {/* <AccordionDetails sx={{ pt: 0 }}>
                        <List
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                            }}
                        >
                            {[0, 1, 2, 3, 4].map((item, index) => {
                                return (
                                    <CheckBoxItem key={index} value={index} />
                                );
                            })}
                        </List>
                    </AccordionDetails> */}
                </Accordion>
                <Accordion disableGutters elevation={2}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <TitleAccordion>
                            {renderText("range", lang)}
                        </TitleAccordion>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, textAlign: "center" }}>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="from"
                                    label={renderText("from", lang)}
                                    type="text"
                                    id="from"
                                    autoComplete="current-from"
                                    size="small"
                                    // defaultValue={0}
                                />
                                <Box
                                    component={"span"}
                                    sx={{
                                        background: "#bdbdbd",
                                        height: "1.5px",
                                        minWidth: "16px",
                                    }}
                                ></Box>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="to"
                                    label={renderText("to", lang)}
                                    type="text"
                                    id="text"
                                    autoComplete="current-text"
                                    size="small"
                                    // defaultValue={9999999}
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                size="medium"
                                type="submit"
                                sx={{
                                    height: "36px",
                                    color: "custom.main",
                                    borderColor: "orange.main",
                                    bgcolor: "orange.main",
                                    width: "100%",
                                    mt: 1,
                                    minWidth: "100%",
                                    "&:hover": {
                                        opacity: 0.8,
                                        color: "custom.main",
                                        borderColor: "orange.main",
                                        bgcolor: "orange.main",
                                    },
                                }}
                            >
                                {renderText("apply", lang)}
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    );
};

export default FilterOptions;
