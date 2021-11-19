import React, {Component} from 'react';
import Card from '../card';
import './row.scss';

export default class Row extends Component {
    
    render() {
        const {rowPics, maxHeight, onDelete} = this.props;
        let idCounter = this.props.id - rowPics.length;
        const elems = rowPics.map(item => {
            return (
                <Card 
                {...item}
                maxHeight={maxHeight}
                onDelete={onDelete}
                key={idCounter++}
                dnd={this.props.dnd}
                />
            );
        });
        return (
            <div className="gallery__row">
                {elems}
            </div>
        );
    };
};
