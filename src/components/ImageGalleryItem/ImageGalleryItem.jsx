import PropTypes from 'prop-types';
import {
  Item,
  Image,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageUrl, onClick, largeImageURL }) => {
  return (
    <Item onClick={() => onClick(largeImageURL)}>
      <Image src={imageUrl} alt="" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
