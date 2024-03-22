import Navbar from "../ui/navbar";

import { Stack } from "@mui/material";

import colors from '../../utils/colors';

const LayoutClient = ({ children }) => {
    return (
        <Stack
            minHeight='100vh'
            width='100%'
            bgcolor={colors.background}
        >
            <Navbar />
            {children}
        </Stack>
    );
}

export default LayoutClient;
