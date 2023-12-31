import { useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';

export const Modal = ({ content, onClose }) => {
  useEffect(() => {
    const onEscape = e => {
      if (e.code === 'Escape') return onClose();
    };

    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [onClose]);

  const closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) return onClose();
  };

  return (
    <StyledOverlay onClick={closeModal}>
      <StyledModal>
        <img src={content.largeImageURL} alt={content.tags} />
      </StyledModal>
    </StyledOverlay>
  );
};
