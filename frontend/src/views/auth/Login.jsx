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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:4000/auth/sign-in`, { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/dashboard');
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
                    Log in
                </Typography>
                {error && <Typography variant="body1" color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" fullWidth disabled={loading} >
                        {loading ? 'Loading...' : ' Log in'}
                    </Button>
                </form>
            </Stack>
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
};

export default Login;
