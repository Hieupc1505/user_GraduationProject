import ProductInfo from "../components/productInfo";
import ProductPreview from "../components/productPreview";
import { Container, Grid, Typography } from "@mui/material";
import AssessmentProduct from "../components/assessmentProduct";
import ProductLists from "~/shared/components/ProductLists";
import { useAppDispatch, useAppSelector } from "~app/hooks";
import { RootState } from "~app/store";
import { prodDetailTextStore } from "./prodDetail.text";
import { useParams } from "react-router-dom";
import BoxTheme from "~/shared/components/BoxTheme";
import { useEffect, useState } from "react";
import { getProductById } from "../store/productAction";
import axios from "axios";
const { productPreviewText, assessmentText, productInfoText, slideProduct } =
    prodDetailTextStore;
import { productProps } from "../store/productSlice";
import { Link } from "react-router-dom";
import ProductItem from "~/shared/components/ProductItem";

const ProductDetail = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { lang } = useAppSelector((state: RootState) => state.mainSlice);

    const [other, setOther] = useState<productProps[] | null>(null);

    const { isLoad, product, error } = useAppSelector(
        (state: RootState) => state.productSlice
    );

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/v1/product/list/latest");

            if (data && data.success) {
                setOther(data.element?.data);
            }
        };
        if (!other) fetchData();
    });

    useEffect(() => {
        if (id) {
            dispatch(getProductById(id));
        }
    }, [id, lang]);

    return (
        <BoxTheme
            className={"wrap-product"}
            component="div"
            sx={{
                paddingTop: 5,
                pb: 3,
            }}
        >
            <Container
                maxWidth="lg"
                sx={{ bgcolor: "background.paper", pb: 3, pt: 3 }}
            >
                <ProductPreview
                    productPreviewContent={productPreviewText[lang]}
                    product={product}
                    lang={lang}
                />
            </Container>
            <Container
                maxWidth="lg"
                sx={{ bgcolor: "background.paper", pb: 2, pt: 3, mt: 2 }}
            >
                <ProductInfo content={productInfoText[lang]} />
            </Container>
            <Container
                maxWidth="lg"
                sx={{ bgcolor: "background.paper", pb: 2, pt: 3, mt: 2 }}
            >
                <AssessmentProduct assessmentContent={assessmentText[lang]} />
            </Container>
            <Container
                maxWidth="lg"
                sx={{ bgcolor: "background.paper", pb: 2, pt: 3, mt: 2 }}
            >
                <ProductLists
                    titleButtonAction={slideProduct[lang][1]}
                    sx={{ pb: 6.4 }}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            sx={{
                                textTransform: "uppercase",
                                py: 1.75,
                            }}
                            component={"div"}
                        >
                            {slideProduct[lang][0]}
                        </Typography>
                    </Grid>
                    {other &&
                        other.map((item, index) => {
                            return (
                                <Grid key={index} item xs={12 / 5}>
                                    <Link to={`/product/${item._id}`}>
                                        <ProductItem
                                            data={item}
                                            lang={lang}
                                            variant="square"
                                            sale={20}
                                        />
                                    </Link>
                                </Grid>
                            );
                        })}

                    {/* Array.from({ length: 12 }, (_, index) => (
                            
                        ))} */}
                </ProductLists>
            </Container>
        </BoxTheme>
    );
};

export default ProductDetail;
