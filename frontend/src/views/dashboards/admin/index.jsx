import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { CreateProductRegex } from "../../../regex";
import useValidations from "../../../hooks/useValidations";

import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Toast from "../../../components/ui/Toast";
import NoProducts from "../../../components/dash/admin/NoProducts";
import Modal from "../../../components/ui/Modal";

import { Stack, Typography, Button, Container, TextField, Box } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import colors from "../../../utils/colors";
import Product from "../../../components/ui/Product";

const initForm = {
    nombre: '',
    descripcion:"",
    precio: '',
};

const AdminDash = () => {
    const [form, setForm] = useState(initForm);
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [createProduct, setCreateProduct] = useState(false);

    const navigate = useNavigate();

    const { accionValidations, formError } = useValidations(initForm);

    const handleCreateProductClose = () => setCreateProduct(false);
    const handleCancel = () => {
        setForm(initForm);
        setCreateProduct(false);
    };

    const handleOnChange = (event) => {
        const { value, name } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleClick = async (event) => {
        event.preventDefault();

        const ok = accionValidations(form, CreateProductRegex);

        if (ok) {
            return;
        }

        try {
            const access_token = localStorage.getItem("access_token");

            const data = await axios.post(
                'http://localhost:4000/product/create-product',
                form,
                {
                    headers: {
                        'access-token': access_token,
                    }
                }
            );

            Toast({
                text: 'Successfully created product',
                icon: 'success',
            });

            setForm(initForm);
            setCreateProduct(false);

            window.location.reload();
        } catch (error) {
            return Toast({
                text: error?.response?.data?.msg || error?.message || 'Error creating product',
                icon: 'error',
            });
        }
    };

    useEffect(() => {
        document.title = "Products | Frontend";
        setLoading(true);
        (async () => {
            try {
                const response = await axios.get('http://localhost:4000product/get-all-products');
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
            <Container maxWidth="lg" sx={{ paddingY: '20px' }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'left', sm: 'center' }}
                    spacing={{ xs: '8px', sm: '0' }}
                    justifyContent={{ xs: 'flex-start', sm:'space-between'}}
                >
                    <Typography
                        variant="h2"
                        color={colors.text}
                        fontSize='30px'
                        fontWeight={600}
                    >
                        Products
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={
                            <AddOutlinedIcon
                                sx={{
                                    color: colors.white,
                                }}
                            />
                        }
                        onClick={() => setCreateProduct(true)}
                        sx={{ width:'200px' }}
                    >
                        Add product
                    </Button>
                </Stack>

                {
                    dataProducts.length === 0 ?
                        <NoProducts text='You have no products at the moment' />
                        : (
                            <Stack
                                direction='row'
                                flexWrap='wrap'
                                justifyContent={{ xs: 'center', sm: 'left' }}
                                alignItems='left'
                                // spacing='14px'
                                gap='14px'
                                paddingY='30px'
                            >
                                {
                                    dataProducts?.map((product, index) => {
                                        return (
                                            <Box key={index}>
                                                <Product
                                                    nombre={product.nombre}
                                                    precio={product.precio}
                                                    descripcion={product.descripcion}
                                                />
                                            </Box>
                                        );
                                    })
                                }
                            </Stack>
                        )
                }
            </Container>

            <Modal
                modalState={createProduct}
                handleModalClose={handleCreateProductClose}
                containerWidth="xs"
                styles={{
                    padding: '22px',
                }}
            >
                <Stack
                    component='form'
                    role='form'
                >
                    <TextField
                        id="nombre"
                        name='nombre'
                        label="Nombre del Producto"
                        variant='standard'
                        value={form?.nombre}
                        error={!!formError?.nombre}
                        helperText={formError?.nombre}
                        onChange={handleOnChange}
                    />

                    <TextField
                        id="precio"
                        name='precio'
                        label="Precio"
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
                        label="descripcion"
                        variant='standard'
                        value={form?.descripcion}
                        error={!!formError?.descripcion}
                        helperText={formError?.descripcion}
                        onChange={handleOnChange}
                        sx={{ marginTop: 2 }}
                    />

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems='center'
                        sx={{ marginTop: 4.5 }}
                        spacing={{ xs: 3, sm: 2 }}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{
                                padding: '2px 13px'
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleClick}
                        >
                            Crear
                        </Button>
                    </Stack>
                </Stack>
            </Modal>
        </LayoutAdmin>
    );
}

export default AdminDash;
