// import { Component } from 'react';
import { useState, useEffect } from 'react';
import api from '../services/PixabayAPI';
import { Container } from 'style/AppContainer.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMore } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import Notiflix from 'notiflix';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pages, setPages] = useState(false);

  useEffect(() => {
    async function fetchImages(searchQuery, page) {
      try {
        setIsLoading(true);
        const { images, pages } = await api.fetchImages(searchQuery, page);
        if (images.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, picture not found. Please try again.'
          );
        }
        if (page === 1) {
          setPages(pages);
        }
        setImages(prev => [...prev, ...images]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (searchQuery !== null) {
      fetchImages(searchQuery, page);
    }
  }, [searchQuery, page]);

  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery.toString());
    setPage(1);
    setImages([]);
    setPages(0);
  };

  const onButtonClick = () => {
    setPage(prev => {
      return prev + 1;
    });
  };

  const onItemClick = largeImageURL => {
    const modalImage = images.find(
      image => image.largeImageURL === largeImageURL
    );
    setModalImageURL(modalImage.largeImageURL);
    setIsOpen(true);
  };

  const onOverlayClick = () => {
    setIsOpen(false);
  };

  // const onOverlayClick = e => {
  //   const overlay = document.getElementById('Overlay');
  //   if (e.target === overlay) {
  //     setIsOpen(false);
  //   }
  // };

  const showLoadMore = !!pages && page !== pages && !isLoading;

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      {isOpen ? (
        <Modal onClick={onOverlayClick} largeImageUrl={modalImageURL} />
      ) : null}
      {isLoading ? <Loader /> : null}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={onItemClick} />
      )}
      {showLoadMore && <LoadMore onClick={onButtonClick} />}
    </Container>
  );
};
