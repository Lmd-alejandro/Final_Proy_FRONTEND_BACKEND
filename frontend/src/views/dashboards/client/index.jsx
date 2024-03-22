import { useEffect, useState } from "react";
import axios from "axios";
import NoProducts from "../../../components/dash/admin/NoProducts";
import LayoutClient from "../../../components/layouts/LayoutClient";
import Toast from "../../../components/ui/Toast";
import Product from "../../../components/ui/Product";
import { Box, Container, IconButton, Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import colors from "../../../utils/colors";

const ClientProducts = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddCart = (event, productID) => {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart"));

    cart.push(Number(productID));

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    document.title = "Products | Frontend";

    setLoading(true);
    (async () => {
      try {
        const response = await axios.get("http://localhost:4000/pedido/create-pedido");
        setDataProducts(response.data);
      } catch (error) {
        return Toast({
          text: error.response.data.msg || error.message || "Error 400",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <NoProducts text="Loading ..." />;

  return (
    <LayoutClient>
      <Container maxWidth="lg">
        {dataProducts.length === 0 ? (
          <NoProducts text="You have no products at the moment" />
        ) : (
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent={{ xs: "center", sm: "left" }}
            alignItems="left"
            gap="14px"
            paddingY="30px"
          >
            {dataProducts?.map((product, index) => {
              return (
                <Box key={index} sx={{ position: "relative" }}>
                  <Product nombre={product.nombre} precio={product.precio} descripcion={product.descripcion}/>

                  <IconButton
                    aria-label="delete"
                    onClick={(event) => handleAddCart(event, product.id)}
                    sx={{
                      color: colors.primary,
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "none",
                      padding: "6px 6px",
                    }}
                  >
                    <AddShoppingCartIcon sx={{ fontSize: "19px" }} />
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
        )}
      </Container>
    </LayoutClient>
  );
};

export default ClientProducts;
