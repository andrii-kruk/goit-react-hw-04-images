import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

import { StyledContainer, StyledTitle } from './App.styled';
import { getImages, PER_PAGE } from 'services/api';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, img: null });
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    if (search === '') return;

    const fetchData = async () => {
      try {
        setStatus(STATUS.PENDING);

        const { hits, totalHits } = await getImages(search);

        setImages(hits);

        setTotalPages(Math.ceil(totalHits / PER_PAGE));
        setStatus(STATUS.RESOLVED);
      } catch (error) {
        setStatus(STATUS.REJECTED);
      } finally {
        window.scrollTo({ top: 0, left: 0 });
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    if (page === 1) return;

    const fetchDataOnLoadMore = async () => {
      try {
        setStatus(STATUS.PENDING);

        const { hits, totalHits } = await getImages(search, page);

        setImages(state => [...state, ...hits]);

        setTotalPages(Math.ceil(totalHits / PER_PAGE));
        setStatus(STATUS.RESOLVED);
      } catch (error) {
        setStatus(STATUS.REJECTED);
      }
    };

    fetchDataOnLoadMore();
  }, [search, page]);

  useEffect(() => {
    if (page === 1) return;
    window.scrollBy({ top: 520, behavior: 'smooth' });
  }, [page, images]);

  const handleSubmit = query => {
    if (query === '') {
      return Notiflix.Notify.warning('Please enter something.');
    }
    if (query === search) {
      return Notiflix.Notify.warning('You entered the same query!');
    }

    setSearch(query);
    setPage(1);
    setTotalPages(1);
  };

  const onLoadMore = () => {
    if (page !== totalPages) {
      setPage(page + 1);
      setStatus(STATUS.PENDING);
    }
  };

  const openModal = selectedImage => {
    setModal({ isOpen: true, img: selectedImage });
  };

  const closeModal = () => {
    setModal({ isOpen: false, img: null });
  };

  return (
    <StyledContainer>
      <Searchbar handleSubmit={handleSubmit} />

      {status === STATUS.IDLE && (
        <StyledTitle>Look for something...</StyledTitle>
      )}

      {status === STATUS.PENDING && <Loader />}

      {status === STATUS.REJECTED ||
        (totalPages === 0 && (
          <StyledTitle>Sorry! Something went wrong!</StyledTitle>
        ))}

      {images.length !== 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {totalPages !== page && totalPages !== 0 && (
            <Button children={'Load more'} loadMore={onLoadMore} />
          )}
        </>
      )}

      {modal.isOpen && <Modal content={modal.img} onClose={closeModal} />}
    </StyledContainer>
  );
};
