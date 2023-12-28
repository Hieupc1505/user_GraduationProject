import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function DotsMobileStepper({ num = 6 }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <MobileStepper
            variant="dots"
            steps={num}
            position="static"
            activeStep={activeStep}
            sx={{
                maxWidth: "100%",
                width: "100%",
                background: "transparent",
                flexGrow: 1,
                position: "absolute",
                bottom: 2,
            }}
            nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === 5}
                    sx={{ color: "custom.main" }}
                >
                    {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            }
            backButton={
                <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ color: "custom.main" }}
                >
                    {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                </Button>
            }
        />
    );
}
