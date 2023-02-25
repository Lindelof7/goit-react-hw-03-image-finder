import { Component } from 'react'
import css from './App.module.css'

export class Button extends Component {
    render() {
        const { onClick } = this.props;
        return (
            <button className={(css.Button)} type="button" onClick={onClick}>Load More</button>
        )
    }
}