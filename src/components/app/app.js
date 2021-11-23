import React, {Component} from 'react';
import AddPicture from '../add-picture';
import Gallery from '../gallery';
import './app.scss';



export default class App extends Component {
    constructor() {
        super();
        this.state = {
            gallery: [{
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550746.jpg",
                "width": 640,
                "height": 426
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964007.jpg",
                "width": 1920,
                "height": 1200
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550739.jpg",
                "width": 640,
                "height": 426
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964009.jpg",
                "width": 436,
                "height": 650
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550740.jpg",
                "width": 600,
                "height": 400
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964008.jpg",
                "width": 509,
                "height": 339
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964011.jpg",
                "width": 900,
                "height": 450
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550755.jpg",
                "width": 480,
                "height": 640
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964013.jpg",
                "width": 472,
                "height": 640
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550745.jpg",
                "width": 640,
                "height": 425
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964014.jpg",
                "width": 240,
                "height": 320
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964016.jpg",
                "width": 540,
                "height": 337
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964020.jpg",
                "width": 1600,
                "height": 1000
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964010.jpg",
                "width": 1506,
                "height": 575
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/493550754.jpg",
                "width": 1280,
                "height": 1276
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964021.jpg",
                "width": 1280,
                "height": 800
            },
            {
                "url": "https://don16obqbay2c.cloudfront.net/frontend-test-task/images/448964012.jpg",
                "width": 787,
                "height": 787
            }],
            width: 860,
            spinner: false
        };
        this.defaultHeight = 160;
        this.defaultMobileHeight = 90;
        this.itemId = null;
        this.positionId = null;
        this.updateWidth = this.updateWidth.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.dragAndDrop = this.dragAndDrop.bind(this);
        this.onReplace = this.onReplace.bind(this);
    };

    updateWidth() {
        setTimeout(() => {
            
            if (this.state.width !== document.getElementById('gallery__wrapper').offsetWidth) {
                this.setState({ width: document.getElementById('gallery__wrapper').offsetWidth})
            };
        
        }, 50);
    };

    onDelete(e) {
        this.setState(({gallery}) => {
            if (gallery.length === 1) return {gallery: []};
            const picId = parseInt(e.target.id);
            const index = gallery.findIndex(item => item.id === picId);
            const newArray = [...gallery.slice(0, index), ...gallery.slice(index + 1)];
            return {
            gallery: newArray
            };
        });    
    };
    
    onReplace(item, position) {
        this.setState(({gallery}) => {
            const itemId = parseInt(item);
            const positionId = parseInt(position);
            const itemIndex = gallery.findIndex(item => item.id === itemId);
            const positionIndex = gallery.findIndex(item => item.id === positionId);
            let newArray = null;
            if (positionIndex > itemIndex) {
                newArray = [...gallery.slice(0, itemIndex), ...gallery.slice(itemIndex+1, positionIndex + 1), 
                        gallery[itemIndex], ...gallery.slice(positionIndex + 1, gallery.length)];
            } else if (positionIndex < itemIndex) {
                newArray = [...gallery.slice(0, positionIndex), gallery[itemIndex], 
                    ...gallery.slice(positionIndex, itemIndex), ...gallery.slice(itemIndex + 1, gallery.length)];
            } else {
                newArray = gallery
            };
            return {
            gallery: newArray
            };
        });
    };

    dragAndDrop(id) {
        const nodeId = id;
        const dragStart = (e) => {
            this.itemId = e.target.nextSibling.id;
            setTimeout( e.target.classList.add('hide'), 0);
            e.target.nextSibling.classList.add('hide-dis');
            document.querySelectorAll('.gallery__card-trash').forEach(item => {
                item.classList.add('hide-dis');
            });
        };
        const dragEnd = function(e) {
            e.target.classList.remove('hide');
            e.target.nextSibling.classList.remove('hide-dis');
            document.querySelectorAll('.gallery__card-trash').forEach(item => {
                item.classList.remove('hide-dis');
            });
        };
        const dragOver = (e) => {
            e.preventDefault();
            if (e.target.nextSibling.id) {
                this.positionId = e.target.nextSibling.id;
            }
            
            document.querySelectorAll('.gallery__card-trash').forEach(item => {
                if (!item.classList.contains('hide-dis')) {
                    item.classList.add('hide-dis');
                };  
            });  
        };
        const dragDrop = (e) => {
            e.preventDefault()
            this.onReplace(this.itemId, this.positionId);
        };
        const card = document.getElementById(nodeId).parentNode;
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('drop', dragDrop);      
    }

    onFormSubmit(data) {
        this.setState(({gallery}) => {
            let newGallery = [];
            newGallery = [...this.state.gallery, ...data];
            document.getElementById('holder').classList = 'add__holder';
            return {gallery: newGallery};
        });
           
    };
    
    componentDidMount() {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth); 
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    };

    render() {
        return (
        <div id='gallery__wrapper'
            className='gallery__wrapper'>
            <AddPicture
                onFormSubmit={this.onFormSubmit}
                toggleSpinner={this.toggleSpinner}/>
            <Gallery
                gallery={this.state.gallery}
                width={this.state.width}
                defaultHeight={this.defaultHeight}
                defaultMobileHeight={this.defaultMobileHeight}
                onDelete={this.onDelete}
                dnd={this.dragAndDrop}/>    
        </div>
    )};
};