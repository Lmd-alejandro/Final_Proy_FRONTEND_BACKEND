import Navbar from "../ui/navbar";

import { Stack } from "@mui/material";

import colors from '../../utils/colors';

const LayoutAdmin = ({ children }) => {
    return (
        <Stack
            minHeight='100vh'
            width='100%'
            bgcolor={colors.background}
            paddingLeft={{ xs: '58px', md: '260px' }}
        >
            <Navbar />
            {children}
        </Stack>
    );
}

export default LayoutAdmin;
