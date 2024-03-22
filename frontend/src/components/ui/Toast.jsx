import Swal from 'sweetalert2';


const Toast = ({ text, icon, styles }) => {
    Swal.fire({
        toast: true,
        titleText: text,
        icon: icon,
        background: '#252525',
        color: '#f8f8f8',
        position: 'bottom-start',
        timer: 2500,
        padding: '10px',
        allowEscapeKey: false,
        showConfirmButton: false,
        ...styles,
    });
}

export default Toast;