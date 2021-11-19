import React, {Component} from 'react';
import Row from '../row';
import './gallery.scss';


export default class Gallery extends Component {
    constructor(props){
        super(props);
        this.rows = [];
        this.width = this.props.width;
        this.defaultHeight = this.props.defaultHeight;
        this.defaultMobileHeight = this.props.defaultMobileHeight;
        this.rowHeight = this.defaultHeight;
        this.idCounter = 0;
    };
    getIndexes(d, height=this.defaultHeight) {
        const currentHeight = height;
        const data = d;

        data.forEach(item => {
            item.index = (currentHeight / item.height)
        });
        
    };
    getCurrentWidth(r, h) {
        const row = r,
        height = h;
        let currentWidth = 0;
        this.getIndexes(row, height);
        row.forEach(item=>{
            currentWidth += item.width*item.index
        });
        currentWidth = currentWidth + 10*(row.length-1) + 40; // Includes paddings
        return currentWidth;
    };
    calcMaxHeight(row, width=this.width) {
        let currentHeight = this.rowHeight;
        const totalWidth = width;
        const data = row;
        if (width <= 600) {
            this.rowHeight = this.defaultMobileHeight  
        } else {
            this.rowHeight = this.defaultHeight
        };
        
        let currentWidth = this.getCurrentWidth(data, currentHeight);
        while (currentWidth <= totalWidth) {
            currentWidth = this.getCurrentWidth(data, currentHeight)
            currentHeight += 0.001
        };
        if (currentHeight > this.rowHeight * 2) {
            return this.rowHeight
        } ;
        return currentHeight              
    };

    setRows() {
        const {gallery, width} = this.props;
        this.rows = [];
        let newRow = [];
        let newRowWidth = 0;
        if (width <= 600) {
            this.rowHeight = this.defaultMobileHeight;  
        } else {
            this.rowHeight = this.defaultHeight;
        };      
        for (let i = 0; i < gallery.length; i++) {
            newRow.push(gallery[i]);
            newRowWidth = this.getCurrentWidth(newRow, this.rowHeight);
            if (newRowWidth > width) {
                newRow.pop();
                this.rows.push(newRow);
                newRow = [];
                --i;
            };
        };
        this.rows.push(newRow);
    };
    componentDidMount() {
        setTimeout(this.setState({loading:false}),1000)
        console.log()
    }
    render() {
        const {onDelete, gallery, width} = this.props;
        let idCounter = 0;       
        if (gallery.length === 0) {
            return (
                <div className="gallery__placeholder">
                    <h2>В галерее пока нет изображений</h2>
                </div>
            )
        } else {
            
        this.setRows()
        const elems = this.rows.map(item=>{
                idCounter += item.length
                return (
                    <Row 
                    rowPics={item}
                    maxHeight={`${this.calcMaxHeight(item, width)}px`}
                    onDelete={onDelete}
                    key={idCounter}
                    id={idCounter}
                    dnd={this.props.dnd}/>
                )
            });
        return (
            <div className="gallery">
                {elems}
            </div> 
            );
        };  
    };
};