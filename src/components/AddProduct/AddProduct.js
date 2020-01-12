import React,{useState, useEffect} from 'react';
import axios from 'axios';

const AddProduct=(props)=>{
    const [productname, setProductname] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [warranty, setWarranty] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [errors, setErrors] = useState({});

    

    const handleSubmit=(event)=>{
        event.preventDefault();
        let productDetail={
            "name":productname,
            "description":description,
            "price":parseInt(price),
            "brand":brand,
            "category":category,
            "warranty":warranty,
            "deliveryCharge":deliveryCharge
        }

        // alert(`${userDetail.email} ${userDetail.password}`);
        console.log(productDetail);

        axios.post('/products',productDetail)
        .then(data=>{
            console.log(data.data);
        }).catch(err=>{
            console.error(err.code);
            setErrors(err.response.data);
        });
        
    }
    return(
        <form onSubmit={handleSubmit}>
            Name: <input type="text" name="name" placeholder="Enter Name of product" onChange={e => setProductname(e.target.value)}/><br/>
            Description: <textarea placeholder="Enter Detail description" onChange={e=> setDescription(e.target.value)}></textarea><br/>
            price: <input type="text" name="price" placeholder="Enter price of product" onChange={e=> setPrice(e.target.value)}/><br/>
            Brand: <input type="text" name="brand" placeholder="Enter Brand of product"onChange={e=> setBrand(e.target.value)}/><br/>
            Category: <input type="text" name="category" placeholder="Enter Category of product" onChange={e=> setCategory(e.target.value)}/><br/>
            Warranty: <input type="text" name="warranty" placeholder="Enter Warranty of product" onChange={e=> setWarranty(e.target.value)}/><br/>
            DeliveryCharge: <input type="text" name="deliveryCharge" placeholder="Enter DeliveryCharge of product" onChange={e=> setDeliveryCharge(e.target.value)}/><br/>
            Image: <input type="file" name="image"/><br/>
            <button type="submit">Add Product</button>
        </form>
    )
}

export default AddProduct;