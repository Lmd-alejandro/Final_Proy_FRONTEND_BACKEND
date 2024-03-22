import { Stack, Typography } from '@mui/material';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

import colors from '../../../utils/colors';

const NoProducts = ({ text = 'Products not found' }) => {
    return (
        <Stack justifyContent='center' alignItems='center' minHeight='60vh'>
            <DraftsOutlinedIcon
                sx={{
                    color: colors.primary,
                    fontSize: '40px'
                }}
            />
            <Typography
                variant="h4"
                color={colors.primary}
                fontSize='25px'
                fontWeight={600}
            >
                {text}
            </Typography>
        </Stack>
    );
}

export default NoProducts;
