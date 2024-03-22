// React
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
    const navigate = useNavigate();

    const isLogged = Boolean(localStorage.getItem('access_token') && localStorage.getItem('user'));

    useEffect(() => {
        if (!isLogged) {
            navigate('/login');
        } else {
            const { role } = JSON.parse(localStorage.getItem('user'));
            role === 'client' && navigate('/client');
            role === 'admin' && navigate('/admin/products');
        }
    }, []);

    return <></>
}

export default Inicio;