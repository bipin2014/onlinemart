import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from '../../logo.svg'

function Body() {
    const [products, setProducts] = useState([{ id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" },
    { id: 1, "name": "iphone", "description": "This is iphone" }])


    useEffect(() => {
         axios.get('/products').then(data=>{
            console.log(data.data);
            setProducts(data.data)
        }).catch(err=>console.error(err));
    },[]);

    return (
        <div className="content">
            <div className="products">
                {products.map(product => (
                    <div className="product">
                        <img src={img} alt="img" />
                        <h3 className="products_name">{product.name}</h3>
                        <div className="products_price">Price : ${product.price}</div>
                        <br />
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Body;