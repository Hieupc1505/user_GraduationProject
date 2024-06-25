import React, {
    useMemo,
    Children,
    useLayoutEffect,
    useState,
    useRef,
    useEffect,
    useCallback,
} from "react";
import { Box } from "@mui/material";

interface CarouselProps {
    children: React.ReactNode;
    timmer: number;
    item?: number;
}
const styleSlide = {
    flexShrink: 0,
    width: "100%",
    height: "100%",
};

const Carousel: React.FC<CarouselProps> = ({ children, timmer, item = 1 }) => {
    const containerRef = useRef<HTMLDivElement>();
    const [current, setCurrent] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const childrenArray = Children.toArray(children);
    const slides = useMemo(() => {
        if (childrenArray.length > 1) {
            const items = Children.map(childrenArray, (child, index) => (
                <Box component={"li"} sx={styleSlide} key={index}>
                    {child}
                </Box>
            ));
            return [
                <Box
                    component={"li"}
                    sx={styleSlide}
                    key={childrenArray.length + 1}
                >
                    {childrenArray[childrenArray.length - 1]}
                </Box>,
                ...items,
                ...items.slice(0, item).map((_, index) => (
                    <Box
                        component={"li"}
                        sx={styleSlide}
                        key={childrenArray.length + 2}
                    >
                        {childrenArray[index]}
                    </Box>
                )),
            ];
        }

        return (
            <Box component={"li"} sx={styleSlide}>
                {childrenArray[0]}
            </Box>
        );
    }, [children]);

    const actionHandler = useCallback(
        (mode: string) => {
            if (containerRef.current) {
                containerRef.current.style.transitionDuration = "400ms";
                if (mode === "prev") {
                    if (current <= 1) {
                        setTranslateX(0);
                        setCurrent(childrenArray.length);
                    } else {
                        setTranslateX(containerRef.current.clientWidth);
                        setCurrent((prev) => --prev);
                    }
                } else if (mode === "next") {
                    if (current >= childrenArray.length) {
                        setTranslateX(
                            containerRef.current.clientWidth *
                                (childrenArray.length + 1)
                        );
                        setCurrent(1);
                    } else {
                        setTranslateX(
                            containerRef.current.clientWidth * (current + 1)
                        );
                        setCurrent((prev) => ++prev);
                    }
                }
            }
        },
        [current, children]
    );

    useEffect(() => {
        const transitionEnd = () => {
            if (current <= 1 && containerRef.current) {
                containerRef.current.style.transitionDuration = "0ms";
                setTranslateX(containerRef.current.clientWidth * current);
            }
            if (current >= childrenArray.length && containerRef.current) {
                containerRef.current.style.transitionDuration = "0ms";
                setTranslateX(
                    containerRef.current.clientWidth * childrenArray.length
                );
            }
        };

        document.addEventListener("transitionend", transitionEnd);
        return () => {
            document.removeEventListener("transitionend", transitionEnd);
        };
    }, [current, children]);

    //position first element correctly.
    useLayoutEffect(() => {
        if (containerRef.current && containerRef.current.clientWidth)
            setTranslateX(containerRef.current?.clientWidth * current);
    }, []);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            actionHandler("next");
        }, timmer);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [actionHandler]);

    return (
        <Box
            component="ul"
            ref={containerRef}
            sx={{
                display: "flex",
                width: `${100 / item}%`,
                height: "100%",
                listStyle: "none",
                padding: 0,
                margin: 0,
                transform: `translate3d(-${translateX}px, 0, 0)`,
            }}
        >
            {slides}
        </Box>
    );
};

export default Carousel;
