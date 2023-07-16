import React from 'react';

import {ImageGalleryItem} from './ImageGalleryItem/ImageGalleryItem';
import { StyledList } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <StyledList>
      <ImageGalleryItem images={images} openModal={openModal} />
    </StyledList>
  );
};
