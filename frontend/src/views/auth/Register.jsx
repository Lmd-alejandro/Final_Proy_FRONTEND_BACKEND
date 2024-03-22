// React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Stack,
    Typography,
    TextField,
    Button,
    Backdrop,
    CircularProgress
} from '@mui/material';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:4000/auth/sign-up`, {
                nombre,
                email,
                direccion,
                password,
                role
            });
            console.log(response);
            setError(response.data.message);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Stack spacing={4} padding={4}>
                <Typography variant="h4" textAlign="center">
                    Sign in
                </Typography>
                {error && <Typography variant="body1" color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Dirección"
                        variant="outlined"
                        fullWidth
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                    />
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        select
                        label="Rol"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </TextField>
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? 'Loading...' : 'Sign in'}
                    </Button>
                </form>
            </Stack>
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
};

export default Register;
