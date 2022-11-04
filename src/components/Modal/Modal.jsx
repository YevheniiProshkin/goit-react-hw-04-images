import PropTypes from 'prop-types';
import { Overlay, Window } from 'components/Modal/Modal.styled';

export const Modal = ({ largeImageUrl, onClick }) => {
  const closeModal = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  return (
    <Overlay onClick={closeModal}>
      <Window>
        <img src={largeImageUrl} alt="" />
      </Window>
    </Overlay>
  );
};

// export const Modal = ({ largeImageUrl, onClick }) => {
//   return (
//     <Overlay id="Overlay" onClick={onClick}>
//       <Window>
//         <img src={largeImageUrl} alt="" />
//       </Window>
//     </Overlay>
//   );
// };

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
