import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../../logo.svg'
import ImageSlider from '../../components/ImageSlider/ImageSlider';

function Body() {
    const [products, setProducts] = useState([{ id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" }])

    const handleCartSubmit = (event) => {
        event.preventDefault();
        // let cartData = {
            
        //     product: ,
        //     quantity: { type: Number, default: 1 },
        //     price: Number,
        //     total: Number,
        // }
        console.log("Hello ");
        
    }


    useEffect(() => {
        axios.get('/products').then(data => {
            console.log(data.data);
            setProducts(data.data)
        }).catch(err => console.error(err));
    }, []);

    return (
        <div className="content">
        <ImageSlider/>
        <div className="heading">Our Trending Products</div>
            <div className="products">
                {products.map(product => (
                    <div className="product">
                        <img className="image" src={product.image ? `http://localhost:5000/${product.image}` : img} alt="img" />
                        <h3 className="products_name">{product.name}</h3>
                        <div className="products_price">Price : ${product.price}</div> 
                        
                        <button onClick={handleCartSubmit}>Add to Cart</button>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Body;