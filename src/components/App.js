import { Component } from "react";
import { Searchbar } from './Searchbar'
import { ImageGallery } from './ImageGallery'
import css from './App.module.css'
import { Modal } from "./Modal";
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    searchbar: '',
    tags: '',
    largeImageURL: '',
    isModalOpen: false,
  }

  handleInputSubmit = searchbar => {
    this.setState({ searchbar })
  }

  openModal = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags });

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };


  render() {

    const { searchbar, isModalOpen, largeImageURL, tags } = this.state;

    return (
      <div className={(css.App)} id='list'>
        <Searchbar onSearch={this.handleInputSubmit} />
        <ImageGallery searchbar={searchbar} openModal={this.openModal} />
        {isModalOpen && <Modal onClose={this.toggleModal}
          largeImageURL={largeImageURL}
          tags={tags} />}
      </div>)
  };
};

App.propTypes = {
  searchbar: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  isModalOpen: PropTypes.bool,
};
