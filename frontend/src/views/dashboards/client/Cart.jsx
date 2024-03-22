import { useEffect, useState } from "react";
import axios from "axios";
import NoProducts from "../../../components/dash/admin/NoProducts";
import LayoutClient from "../../../components/layouts/LayoutClient";
import Toast from "../../../components/ui/Toast";

import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import colors from "../../../utils/colors";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart"));

  const handleCancelBuy = () => {
    localStorage.setItem("cart", JSON.stringify([]));

    navigate("/client");
  };

  const handleCartBuy = async (event) => {
    event.preventDefault();

    const { id: idClient } = JSON.parse(localStorage.getItem("user"));

    setLoadingOrder(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/pedido/create-pedido`,
        { id_products: cart }
      );

      Toast({
        text: "successful purchase",
        icon: "success",
      });

      localStorage.setItem("cart", JSON.stringify([]));
      navigate("/client");
    } catch (error) {
      return Toast({
        text: error?.response?.data?.msg || error?.message || "Error 400",
        icon: "error",
      });
    } finally {
      setLoadingOrder(false);
    }
  };

  useEffect(() => {
    document.title = "Cart | Frontend";

    setLoading(true);
    (async () => {
      try {
        const arrProCart = [];
        const response = await axios.get("http://localhost:4000/pedido/create-pedido");

        for (const productID of cart) {
          const productDetails = response.data.find((product) => {
            return product.id === productID;
          });
          arrProCart.push(productDetails);
        }

        setDataProducts(arrProCart);
      } catch (error) {
        return Toast({
          text: error?.response?.data?.msg || error?.message || "Error 400",
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
          <Stack alignItems="center" paddingTop={{ xs: "25px", md: "0px" }}>
            <Stack
              minWidth={{ xs: "100%", sm: "400px" }}
              border={`2px solid ${colors.secondary}`}
              padding="20px"
              borderRadius="18px"
            >
              {dataProducts.map((product) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    marginBottom="10px"
                  >
                    <Typography variant="h5" color={colors.secondary}>
                      {product.nombre}
                    </Typography>

                    <Typography variant="h5" color={colors.primary}>
                      {`$${product.precio}`}
                    </Typography>

                    <Typography variant="h5" color={colors.primary}>
                      {`$${product.descripcion}`}
                    </Typography>
                  </Stack>
                );
              })}

              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                alignItems="center"
                sx={{ marginTop: 1.5 }}
                spacing={{ xs: 1, sm: 2 }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCancelBuy}
                  sx={{
                    padding: "2px 13px",
                  }}
                >
                  Delete Purchase
                </Button>

                <Button fullWidth variant="contained" onClick={handleCartBuy}>
                  Buy
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Container>

      <Backdrop sx={{ color: colors.white, zIndex: "100" }} open={loadingOrder}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LayoutClient>
  );
};

export default Cart;
