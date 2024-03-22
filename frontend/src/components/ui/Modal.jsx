import { Modal as ModalMUI, Container } from "@mui/material";

const Modal = ({
    children,
    containerWidth = 'md',
    modalState,
    styles,
    handleModalClose
}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '8px',
        padding: 4,
        ...styles,
    };

    return (
        <ModalMUI
            open={modalState}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ marginX: '20px' }}
        >
            <Container maxWidth={containerWidth} sx={style}>
                {children}
            </Container>
        </ModalMUI>
    );
}

export default Modal;
