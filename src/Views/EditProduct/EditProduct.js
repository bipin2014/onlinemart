import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import MultipleValueTextInput from 'react-multivalue-text-input';

const EditProduct = (props) => {

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

    const [category, setCategory] = useState(["apple"]);

    useEffect(() => {
        axios.get('/products/'+props.match.params.id).then(data=>{
            console.log("",data.data.body);

            setProductname(data.data.body.name);
            setDescription(data.data.body.description);
            setPrice(data.data.body.price);
            setBrand(data.data.body.brand);
            setWarranty(data.data.body.warranty);
            setCategory(data.data.body.category);
            setDeliveryCharge(data.data.body.deliveryCharge)

        })

        
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
       
        let bodyFormData = new FormData();

        bodyFormData.append("image", image);
        bodyFormData.append("name", productname);
        bodyFormData.append("description", description);
        bodyFormData.append("price", parseInt(price));
        bodyFormData.append("brand", brand);
        bodyFormData.append("category", category);
        bodyFormData.append("warranty", warranty);
        bodyFormData.append("deliveryCharge", parseInt(deliveryCharge));

        

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
        <div className="content">
            <div className="add-product">
                <h1>Edit Product</h1>
                <form onSubmit={handleSubmit}>
                    Name: <input type="text" value={productname} name="name" placeholder="Enter Name of product" onChange={e => setProductname(e.target.value)} /><br />
                    Description: <textarea placeholder="Enter Detail description" onChange={e => setDescription(e.target.value)} value={description}></textarea><br />
                    price: <input type="text" name="price" value={price} placeholder="Enter price of product" onChange={e => setPrice(e.target.value)} /><br />
                    Brand: <input type="text" name="brand" value={brand} placeholder="Enter Brand of product" onChange={e => setBrand(e.target.value)} /><br />
                    Warranty: <input type="text" name="warranty" value={warranty} placeholder="Enter Warranty of product" onChange={e => setWarranty(e.target.value)} /><br />


                    <MultipleValueTextInput
                        onItemAdded={(item, allCat) => setCategory(allCat)}
                        onItemDeleted={(item, allCat) => setCategory(allCat)}
                        label="Category"
                        name="category"
                        className="minput"
                        values={category}
                        placeholder="Enter whatever items you want; separate them with COMMA or ENTER."
                    />
                    DeliveryCharge: <input type="text" value={deliveryCharge} name="deliveryCharge" placeholder="Enter DeliveryCharge of product" onChange={e => setDeliveryCharge(e.target.value)} /><br />
                    Image: <input type="file" name="file" onChange={e => setImage(e.target.files[0])} /><br />
                    {errors && (
                        <div className="error">{errors}</div>
                    )}
                    <button type="submit">Edit Product</button>
                </form>

            </div>

        </div>
    )

}

export default EditProduct;


