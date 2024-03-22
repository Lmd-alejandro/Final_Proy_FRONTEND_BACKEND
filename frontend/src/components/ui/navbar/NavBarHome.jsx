import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// Material UI
import {
    AppBar,
    Box,
    Button,
    Container,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import colors from "../../../utils/colors";

const NavBarHome = () => {
    const [anchorElUser, setAnchorElUser] = useState();

    const isLogin = window.location.pathname.startsWith('/login');
    const isRegister = window.location.pathname.startsWith('/register');

    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <AppBar
            position='sticky'
            elevation={0}
            sx={{
                background: colors.background,
                boxShadow: 'none',
            }}
        >
            <Container
                maxWidth='lg'
                sx={{ padding: { xs: '0 15px', sm: '4px 23px' } }}
            >
                <Toolbar
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0px',
                    }}
                >
                    <Link
                        href='/'
                        style={{
                            fontSize: '25px',
                            fontWeight: 'bold',
                            width: '228px',
                            color: colors.secondary,
                            textDecoration: 'none',
                        }}
                    >
                        Frontend
                    </Link>

                    <Stack
                        display={{ xs: 'none', md: 'block' }}
                        direction='row'
                        spacing='10px'
                    >
                        {
                            !isRegister ?
                                <Button
                                    variant='contained'
                                    sx={{
                                        padding: '5px 14px',
                                        fontSize: '14px',
                                        borderRadius: '6px'
                                    }}
                                    onClick={() => { return navigate('/register') }}
                                >
                                    Sign in
                                </Button>
                                : ''
                        }

                        {
                            !isLogin ?
                                <Button
                                    variant='outlined'
                                    sx={{
                                        padding: '5px 14px',
                                        fontSize: '14px',
                                        borderRadius: '6px'
                                    }}
                                    onClick={() => { return navigate('/login') }}
                                >
                                    Log in
                                </Button>
                                : ''
                        }
                    </Stack>

                    <Box sx={{ flexGrow: 0, display: { xs: 'block', md: 'none' } }}>
                        <Tooltip title="Open settings" onClick={handleOpenUserMenu}>
                            <MenuIcon sx={{ color: colors.secondary }} />
                        </Tooltip>
                        <Menu
                            sx={{ mt: '30px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem
                                sx={{ padding: { xs: '0px 5px', md: '2px 8px' } }}
                                onClick={() => { return navigate('/register') }}
                            >
                                <Typography
                                    variant="body1"
                                    color={colors.primary}
                                >
                                    Registrate
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{ padding: { xs: '0px 5px', md: '2px 8px' } }}
                                onClick={() => { return navigate('/login') }}
                            >
                                <Typography
                                    variant="body1"
                                    color={colors.primary}
                                >
                                    Ingresa
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBarHome;
