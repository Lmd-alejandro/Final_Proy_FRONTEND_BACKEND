import useCapitalize from "../../hooks/useCapitalize";

import {
    Stack,
    Typography,
} from "@mui/material";

import colors from "../../utils/colors";

const Product = ({ nombre, precio, descripcion }) => {
    return (
        <Stack
            border={`1px solid ${colors.primary}`}
            borderRadius='12px'
            padding='12px 30px 12px 12px'
            minWidth='100px'
            spacing='3px'
        >
            <Typography
                variant="h3"
                color={colors.secondary}
                fontSize='20px'
                fontWeight={600}
            >
                {useCapitalize(nombre)}
            </Typography>
            <Typography
                variant="h5"
                color="initial"
                fontSize='17px'
                fontWeight={500}
            >
                {`$${precio}`}
            </Typography>
            <Typography
                variant="h5"
                color="initial"
                fontSize='17px'
                fontWeight={500}
            >
                {`$${descripcion}`}
            </Typography>
        </Stack>
    );
}

export default Product;
