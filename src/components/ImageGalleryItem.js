import css from './App.module.css'
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {

    render() {
        const { openModal, webformatURL, tags } = this.props;

        return (<li onClick={openModal} className={(css.ImageGalleryItem)}>
            <img className={(css.ImageGalleryItemImage)} src={webformatURL} alt={tags} />
        </li>
        )
    }
}