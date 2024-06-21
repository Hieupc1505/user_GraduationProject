
import { Box, styled } from "@mui/material";
import { BoxProps } from "@mui/material";

const HeroComponent = () => {
    const StyledBoxWrap = styled(Box)<BoxProps>(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2),
    }));


 
    return (
        <StyledBoxWrap>
            
        </StyledBoxWrap>
    );
};

export default HeroComponent;
