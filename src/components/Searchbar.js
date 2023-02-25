import { Component } from 'react'
import css from './App.module.css'
import Notiflix from 'notiflix';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

// = ({ onSearchChange, searchbar, onSearchClick }) =>

export class Searchbar extends Component {
    state = {
        searchbar: '',
    }

    changeSearch = evt =>
        this.setState({ searchbar: evt.currentTarget.value });


    onSearchClick = event => {
        event.preventDefault();
        if (this.state.searchbar.trim() === '') {
            return Notiflix.Notify.failure('Please write search options')
        }
        this.props.onSearch(this.state.searchbar)
        this.setState({ searchbar: '' })
    }


    render() {
        const { searchbar } = this.state;

        return (
            <div>

                <header className={(css.Searchbar)}>
                    <form className={(css.SearchForm)}>
                        <button type="submit" onClick={this.onSearchClick} className={(css.SearchFormButton)}  >
                            <FiSearch className={(css.searchIcon)} />
                            <span className={(css.SearchFormButtonLabel)} >Search</span>
                        </button>
                        <input
                            onChange={this.changeSearch}
                            className={(css.SearchFormInput)}
                            type="text"
                            placeholder="Search images and photos"
                            value={searchbar}
                        />
                    </form>
                </header >
            </div>
        )
    }
}



Searchbar.propTypes = {
    searchbar: PropTypes.string
};
