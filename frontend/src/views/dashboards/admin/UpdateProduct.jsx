import { useEffect, useState } from "react";
import axios from "axios";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import NoProducts from "../../../components/dash/admin/NoProducts";
import Product from "../../../components/ui/Product";
import Toast from "../../../components/ui/Toast";

import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import colors from "../../../utils/colors";
import Modal from "../../../components/ui/Modal";
import useValidations from "../../../hooks/useValidations";
import { CreateProductRegex } from "../../../regex";

const initForm = {
    nombre: '',
    descripcion:"",
    precio: '',
};

const UpdateProduct = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [form, setForm] = useState(initForm);
    const [productId, setProductId] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const { accionValidations, formError } = useValidations(initForm);

    const handleUpdate = async (event, productID) => {
        event.preventDefault();

        setProductId(productID);

        const product = dataProducts.find(product => product.id === productID);

        setForm({
            nombre: product.nombre,
            precio: product.precio,
            descripcion: product.descripcion,
        });

        setUpdateModal(true);
    }

    const updateModalClose = () => {
        setForm(initForm);
        setUpdateModal(false);
    }

    const handleOnChange = (event) => {
        const { value, nombre } = event.target;

        setForm({
            ...form,
            [nombre]: value
        });
    }

    const handleUpdateForm = async (event) => {
        event.preventDefault();

        const ok = accionValidations(form, CreateProductRegex);

        if (ok) {
            return;
        }

        setLoadingUpdate(true);

        try {
            const access_token = localStorage.getItem("access_token");

            const responseUpdate = await axios.patch(
                `http://localhost:4000/product/update-product?id=`,
                form,
                {
                    headers: {
                        'access-token': access_token,
                    },
                }
            );

            const response = await axios.get('http://localhost:4000/product/get-all-products');
            setDataProducts(response.data);

            setUpdateModal(false);
            Toast({
                text: 'Successfully updated product',
                icon: 'success',
            });
        } catch (error) {
            return Toast({
                text: error?.response?.data?.msg || error?.message || 'Error updating product',
                icon: 'error',
            });
        } finally {
            setLoadingUpdate(false);
        }
    }

    useEffect(() => {
        document.title = "Update Product | Frontend";

        setLoading(true);
        (async () => {
            try {
                const response = await axios.get('http://localhost:4000/product/get-all-products');
                setDataProducts(response.data);
            } catch (error) {
                return Toast({
                    text: error?.response?.data?.msg || error?.message || 'Error when bringing the products',
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
                    fontWeight={600}
                >
                    Update product
                </Typography>

                {
                    dataProducts.length === 0 ?
                        <NoProducts text='You have no products at the moment' />
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
                                                    descripcion={product.descripcion}
                                                />

                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={(event) => handleUpdate(event, product.id)}
                                                    sx={{
                                                        color: colors.primary,
                                                        position: 'absolute',
                                                        top: '0',
                                                        right: '0',
                                                        background: 'none',
                                                        padding: '3px 4px',
                                                    }}
                                                >
                                                    <UpdateIcon />
                                                </IconButton>
                                            </Box>
                                        );
                                    })
                                }
                            </Stack>
                        )
                }
            </Container>

            <Modal
                modalState={updateModal}
                handleModalClose={updateModalClose}
                containerWidth="xs"
            >
                <Stack>
                    <TextField
                        id="nombre"
                        name='nombre'
                        label="Nombre del producto"
                        variant='standard'
                        value={form?.nombre}
                        error={!!formError?.nombre}
                        helperText={formError?.nombre}
                        onChange={handleOnChange}
                        sx={{ marginTop: 2 }}
                    />

                    <TextField
                        id="precio"
                        name='precio'
                        label="Precio del producto"
                        variant='standard'
                        value={form?.precio}
                        error={!!formError?.precio}
                        helperText={formError?.precio}
                        onChange={handleOnChange}
                        sx={{ marginTop: 2 }}
                    />

                    <TextField
                        id="descripcion"
                        name='descripcion'
                        label="Precio del producto"
                        variant='standard'
                        value={form?.descripcion}
                        error={!!formError?.descripcion}
                        helperText={formError?.descripcion}
                        onChange={handleOnChange}
                        sx={{ marginTop: 2 }}
                    />

                    <Button
                        sx={{ marginTop: 4 }}
                        variant="contained"
                        onClick={handleUpdateForm}
                    >
                        Get in
                    </Button>
                </Stack>
            </Modal>

            <Backdrop
                sx={{ color: colors.white, zIndex: '100' }}
                open={loadingUpdate}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </LayoutAdmin>
    );
}

export default UpdateProduct;
