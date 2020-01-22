import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/tags/tags.scss';

const AddProduct = (props) => {

    const token = localStorage.getItem("AUTH-TOKEN");
    if (token) {
        axios.defaults.headers.common['AUTH-TOKEN'] = token;
    }

    const [productname, setProductname] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [brand, setBrand] = useState("");
    const [warranty, setWarranty] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null)

    const [category, setCategory] = useState([]);
    const removeTags = indexToRemove => {
        setCategory([...category.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setCategory([...category, event.target.value]);
            event.target.value = "";
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let productDetail = {
            "name": productname,
            "description": description,
            "price": parseInt(price),
            "brand": brand,
            "category": category,
            "warranty": warranty,
            "deliveryCharge": parseInt(deliveryCharge)
        }
        let bodyFormData = new FormData();

        bodyFormData.append("image", image);
        bodyFormData.append("name", productname);
        bodyFormData.append("description", description);
        bodyFormData.append("price", parseInt(price));
        bodyFormData.append("brand", brand);
        bodyFormData.append("category", category);
        bodyFormData.append("warranty", warranty);
        bodyFormData.append("deliveryCharge", parseInt(deliveryCharge));

        console.log(bodyFormData);

        axios.post('/products', bodyFormData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(data => {
                console.log(data.data);
                props.history.push('/');
            }).catch(err => {
                console.error(err.code);
                setErrors(err.response.data);
            });

    }
    return (
        <div className="add-product">
        <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="name" placeholder="Enter Name of product" onChange={e => setProductname(e.target.value)} /><br />
                Description: <textarea placeholder="Enter Detail description" onChange={e => setDescription(e.target.value)}></textarea><br />
                price: <input type="text" name="price" placeholder="Enter price of product" onChange={e => setPrice(e.target.value)} /><br />
                Brand: <input type="text" name="brand" placeholder="Enter Brand of product" onChange={e => setBrand(e.target.value)} /><br />
                Warranty: <input type="text" name="warranty" placeholder="Enter Warranty of product" onChange={e => setWarranty(e.target.value)} /><br />
                Category: <div className="tags-input">
                    <ul id="category">
                        {category.map((tag, index) => (
                            <li key={index} className="tag">
                                <span className='tag-title'>{tag}</span>
                                <span className='tag-close-icon'
                                    onClick={() => removeTags(index)}>x</span>
                            </li>
                        ))}
                    </ul>
                    <input type="text" onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                        placeholder="Press enter to add category"
                    />
                </div>
                DeliveryCharge: <input type="text" name="deliveryCharge" placeholder="Enter DeliveryCharge of product" onChange={e => setDeliveryCharge(e.target.value)} /><br />
                Image: <input type="file" name="file" onChange={e => setImage(e.target.files[0])} /><br />
                <button type="submit">Add Product</button>
            </form>

        </div>
    )
}

export default AddProduct;