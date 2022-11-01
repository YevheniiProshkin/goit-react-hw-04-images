import { Component } from 'react';
import api from '../services/PixabayAPI';
import { Container } from 'style/AppContainer.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    isLoading: false,
    error: '',
    modalImageURL: null,
    isOpen: false,
    pages: 0,
  };

  async componentDidUpdate(prevProp, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      try {
        this.setState({ isLoading: true });

        const { images, pages } = await api.fetchImages(searchQuery, page);

        this.setState(prevState => {
          return {
            pages,
            images: [...prevState.images, ...images],
          };
        });
      } catch (error) {
        this.setState({ error: 'picture not found' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    return null;
  }

  onSubmit = searchQuery => {
    this.setState({
      searchQuery: [searchQuery.toString()],
      page: 1,
      images: [],
    });
  };

  onButtonClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onItemClick = largeImageURL => {
    const modalImage = this.state.images.find(
      image => image.largeImageURL === largeImageURL
    );
    this.setState({
      modalImageURL: modalImage.largeImageURL,
      isOpen: true,
    });
  };

  onOverlayClick = e => {
    const overlay = document.getElementById('Overlay');
    if (e.target === overlay) {
      this.setState({ isOpen: false });
    }
  };

  render() {
    const { images, isLoading, isOpen, modalImageURL, page, pages } =
      this.state;

    const showLoadMore = pages && page !== pages && !isLoading;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {isOpen ? (
          <Modal onClick={this.onOverlayClick} largeImageUrl={modalImageURL} />
        ) : null}
        {isLoading ? <Loader /> : null}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.onItemClick} />
        )}
        {showLoadMore && <LoadMore onClick={this.onButtonClick} />}
      </Container>
    );
  }
}
