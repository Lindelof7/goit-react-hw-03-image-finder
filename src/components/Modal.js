import { Component } from 'react'
import css from './App.module.css'

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    };

    render() {
        return (
            <div className={(css.Overlay)} onClick={this.props.onClose}>
                <div className={(css.Modal)}>
                    <img src={this.props.largeImageURL} alt={this.props.tags} />
                </div>
            </div>
        )
    }
}   