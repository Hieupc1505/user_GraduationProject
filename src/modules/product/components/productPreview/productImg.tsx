import React, { useState } from "react";
import { Box, Avatar, Stack, Tabs, Tab } from "@mui/material";
import DotsMobileStepper from "../StepperDot";

interface ProductImgProps {
    main: string;
    list: string[];
}

const ProductImg = ({ main, list }: ProductImgProps) => {
    const [value, setValue] = React.useState(0);
    const [mainImg, setMainImg] = useState<string>(main);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const changeMainImg = (item: string) => {
        setMainImg(item);
    };

    const AvatarItem = (src: string) => (
        <Avatar
            sx={{
                width: "60px",
                height: "60px",
            }}
            variant="square"
            src={src}
        />
    );
    return (
        <Box component={"figcaption"} width={"100%"}>
            <Box sx={{ position: "relative" }}>
                <Avatar
                    variant="square"
                    sx={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "450px",
                        minHeight: "450px",
                    }}
                    src={mainImg}
                />
                {/* <DotsMobileStepper num={6} /> */}
            </Box>
            {!!list.length && (
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    sx={{
                        mt: 1.5,

                        "& .MuiTab-root": {
                            padding: 0,
                            minWidth: "auto",
                        },
                        "& .MuiTabs-flexContainer": {
                            gap: 1.25,
                        },
                    }}
                >
                    {list.map((item, index) => {
                        return (
                            <Tab
                                key={index}
                                label={AvatarItem(item)}
                                onClick={() => changeMainImg(item)}
                            />
                        );
                    })}
                </Tabs>
            )}
        </Box>
    );
};

export default ProductImg;
