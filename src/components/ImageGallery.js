import { Component } from 'react'
import css from './App.module.css'
import { ImageGalleryItem } from './ImageGalleryItem'
import { Loader } from './Loader'
import PropTypes from 'prop-types';
import { Button } from './Button'
import Notiflix from 'notiflix';
import nextId from "react-id-generator";

export class ImageGallery extends Component {
    state = {
        galeryArr: [],
        currentPage: 1,
        loading: false,
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchbar !== this.props.searchbar) {
            this.setState({ loading: true, galeryArr: [] })
            this.fetchPhotos();
        }
    }

    loadMore = () => {
        this.setState({ loading: true })
        this.fetchPhotos();
    }

    fetchPhotos = () => {
        fetch(`https://pixabay.com/api/?q=${this.props.searchbar}&page=${this.state.currentPage}&key=32358654-06404774fd2fdef00d453a3c4&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
                if (response.ok) { return (response.json()) }
                Promise.reject(new Error('Please provide valid search value'))
                return Notiflix.Notify.error('Sorry, service trouble occured')
            })
            .then((data) => data.hits)
            .then((data) => { this.setState({ galeryArr: [...this.state.galeryArr, ...data], currentPage: this.state.currentPage + 1 }) })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    render() {
        const { loading, galeryArr } = this.state;
        const { openModal } = this.props;


        if (galeryArr.length > 0) {


            return <div>
                <ul className={(css.ImageGallery)} >
                    {galeryArr.map(({ id, largeImageURL, webformatURL, tags }) => {
                        return (
                            <ImageGalleryItem
                                key={nextId()}
                                id={id}
                                tags={tags}
                                webformatURL={webformatURL}
                                largeImageURL={largeImageURL}
                                openModal={() => openModal(largeImageURL, tags)}
                            />
                        );
                    })}
                </ul>
                <Button className={css.loadMoreBtn} onClick={this.loadMore} />
            </div>
        }
        if (loading) {
            return <Loader classname={(css.loaderWrap)} />
        }


    }
}


ImageGallery.propTypes = {
    openModal: PropTypes.func,
    galeryArr: PropTypes.array,
    currentPage: PropTypes.number,
    loading: PropTypes.bool
};
