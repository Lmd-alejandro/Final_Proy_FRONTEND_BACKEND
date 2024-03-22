import NavBarClient from './NavBarClient';
import NavBarHome from './NavBarHome';
import NavBarAdmin from './NavBarAdmin';

const Navbar = () => {
    const isAdmin = window.location.pathname.startsWith('/admin');
    const isClient = window.location.pathname.startsWith('/client');

    if (isAdmin) return (<NavBarAdmin />);
    if (isClient) return (<NavBarClient />);

    return (
        <NavBarHome />
    );
}

export default Navbar;