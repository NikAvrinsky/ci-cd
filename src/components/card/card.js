import React, {Component} from 'react';
import './card.scss';
import Skeleton from './../skeleton';

export default class Card extends Component {
    constructor() {
        super()
        this.state = {
            skeleton: true
        };
    };
    componentDidMount() {
        this.props.dnd(this.props.id);
        
        setTimeout(() => {
            this.setState({skeleton:false});
        }, 500);
        
        
    };
    render() {
        const {url, maxHeight, onDelete, id} = this.props;
        if (this.state.skeleton) {
            return(  
                <div className='gallery__card'
                    draggable= 'true'>
                   <Skeleton
                    height={maxHeight}/>
                <div className="gallery__card-trash"
                    id={id}
                    onClick={(e) => onDelete(e)}>
                    <i className="far fa-trash-alt"
                    id={id}></i>
                </div>
                </div>)
        } else {
            return(  
                <div className='gallery__card'
                    draggable= 'true'>
                    <img
                    className='gallery__img'
                    src={url}
                    alt='img'
                    height={maxHeight}  
                    />
                <div className="gallery__card-trash"
                    id={id}
                    onClick={(e) => onDelete(e)}>
                    <i className="far fa-trash-alt"
                    id={id}></i>
                </div>
                </div>);
        };
    };
};