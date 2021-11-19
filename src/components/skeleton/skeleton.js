import React, {Component} from 'react';
import './skeleton.scss'
export default class Skeleton extends Component {
    render() {
        const height = this.props.height,
            width = height.replace('px', '')*1.2 + 'px'

        const divStyle = {
            height: height,
            width: width,
        };
        return (
            <div
                className='gallery__skeleton'
                style={divStyle}>
            </div>
        );
    };
};