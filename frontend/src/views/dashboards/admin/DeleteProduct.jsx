import { useEffect, useState } from "react";
import axios from "axios";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Toast from "../../../components/ui/Toast";
import NoProducts from "../../../components/dash/admin/NoProducts";
import Product from "../../../components/ui/Product";

import {
    Container,
    Typography,
    Box,
    Stack,
    IconButton,
    Backdrop,
    CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import colors from "../../../utils/colors";

const DeleteProduct = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleDelete = async (event, productID) => {
        event.preventDefault();

        setLoadingDelete(true);
        try {
            const access_token = localStorage.getItem("access_token");

            const response = await axios.patch(
                `http://localhost:4000/product/delete-product?id=${productID}`,
                {},
                {
                    headers: {
                        'access-token': access_token,
                    },
                }
            );

            const updatedProducts = dataProducts.map((product) => { return product.id !== productID });
            setDataProducts(updatedProducts);

            Toast({
                text: 'Product was deleted',
                icon: 'success',
            });
        } catch (error) {
            return Toast({
                text: error?.response?.data?.msg || error?.message || 'Error 400',
                icon: 'error',
            });
        } finally {
            setLoadingDelete(false);
        }

        const updatedProducts = dataProducts.filter(product => product.id !== productID);
        setDataProducts(updatedProducts);
    }

    useEffect(() => {
        document.title = "Delete Product | Frontend";

        setLoading(true);
        (async () => {
            try {
                const response = await axios.get('http://localhost:4000/product/get-all-products');
                setDataProducts(response.data);
            } catch (error) {
                return Toast({
                    text: error.response.data.msg || error.message || 'Error 400',
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return (<NoProducts text='Loading ...' />);

    return (
        <LayoutAdmin>
            <Container maxWidth="lg" sx={{ paddingY: '18px' }}>
                <Typography
                    variant="h2"
                    color={colors.text}
                    fontSize='30px'
                    fontWeight={600} F
                >
                    Delete a product
                </Typography>

                {
                    dataProducts.length === 0 ?
                        <NoProducts text='You have no products at the moment ' />
                        : (
                            <Stack
                                direction='row'
                                flexWrap='wrap'
                                justifyContent={{ xs: 'center', sm: 'left' }}
                                alignItems='left'
                                gap='14px'
                                paddingY='30px'
                            >
                                {
                                    dataProducts?.map((product, index) => {
                                        return (
                                            <Box
                                                key={index}
                                                sx={{ position: 'relative' }}
                                            >
                                                <Product
                                                    nombre={product.nombre}
                                                    precio={product.precio}
                                                    description={product.descripcion}

                                                />

                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={(event) => handleDelete(event, product.id)}
                                                    sx={{
                                                        color: colors.primary,
                                                        position: 'absolute',
                                                        top: '0',
                                                        right: '0',
                                                        background: 'none',
                                                        padding: '3px 4px',
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        );
                                    })
                                }
                            </Stack>
                        )
                }
            </Container>

            <Backdrop
                sx={{ color: colors.white, zIndex: '100' }}
                open={loadingDelete}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </LayoutAdmin>
    );
}

export default DeleteProduct;
