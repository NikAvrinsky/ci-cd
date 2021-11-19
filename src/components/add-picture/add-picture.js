import React, {Component} from 'react';
import './add-picture.scss';

export default class AddPicture extends Component {
    
    async handleSubmit(e) {
        e.preventDefault();
        let data = [];
        let url = e.target.input.value;
        const {onFormSubmit} = this.props;
        
        if (url) {
            if (url.includes('galleryImages')) {
                data = JSON.parse(url).galleryImages
                let i = 0;
                data.forEach(item=>{ 
                    item.id = Date.now() + i
                    i++
                });
            } else if (url.includes('.json')) {
                await fetch(url)
                .then(res => res.json())
                .then((out) => {
                    let i =0
                    data = out.galleryImages
                    data.forEach(item=>{ 
                        item.id = Date.now() + i
                        i++
                    });
                })
                .catch(err => { throw err });
            } else {
                const preview = document.getElementById('preview')
                preview.src=url
                let obj = {
                    url: url,
                    width: preview.width,
                    height: preview.height,
                    id: Date.now()
                };
                data.push(obj)
                obj = []
            };
            onFormSubmit(data);  
            
        };
        e.target.input.value = ''
    };
    
    toggleSpinner() {
        const spinner = document.querySelector('.gallery__spinner-wrapper')
        if (spinner.classList.contains('gallery__spinner-wrapper_hidden')) {
            spinner.classList.remove('gallery__spinner-wrapper_hidden')
        } else {
            spinner.classList.add('gallery__spinner-wrapper_hidden')
        }
    };


    dragFileUpload() {
        const holder = document.getElementById('holder')
        holder.ondragover = function() {
            this.className = 'add__holder_hovered'
            return false
        };
        holder.ondrop = function (e) {
            if (!e.dataTransfer.files[0]) {
                return
            };
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            if(file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png' || file.type === 'image/bmp') {
            
                const reader = new FileReader()
                reader.onload = function (e) {
                    const image = document.getElementById('preview')
                    image.setAttribute('src',  e.target.result )
                    document.getElementById('input').value = e.target.result    
                };
                reader.readAsDataURL(file)
            } else if ( file.type === 'application/json') {
                const reader = new FileReader()
                reader.onload = function(e) {
                    document.getElementById('input').value = e.target.result
                };
                reader.readAsText(file)    
            } else {
                alert('Формат файла не поддерживается')
            };   
        };
    };
    componentDidMount() {
        this.dragFileUpload() 
    }
    render() {
        return (
            <div className="add__wrapper">
                <form 
                    className='add__form'
                    onSubmit={(e) => this.handleSubmit(e)}>
                    <div id="holder" 
                         className="add__holder">
                    <input
                        type='text'
                        placeholder='Введите ссылку на изображение, JSON файл или перетащите файл сюда'
                        className='add__input'
                        id='input'  
                    />
                    </div>
                    
                    <button
                        type='submit'
                        className='add__button'
                    >Загрузить</button>
                    
                </form>
                <img 
                    id='preview'
                    className='add__preview' 
                    src='' 
                    alt='img'></img>
            </div>
    )};
};