import React, { Component } from 'react';
import axios from 'axios';
import img from '../../logo.svg'

class ViewOwnProduct extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('/products/getByUser').then(res => {
            console.log(res.data);
            this.setState({
                products: res.data
            })

        }).catch(err => {
            console.log(err.code);

        })
    }
    render() {
        const handleDelete = (id) => {
            axios.delete('/products/' + id).then(res => {
                console.log(res.data);
                this.getData();
            }).catch(err => {
                console.log(err.code);
            })
        }
        const handleEdit = (pid) => {
            this.props.history.push('/editProduct/' + pid);
        }

        const handleAdd = () => {
            this.props.history.push('/addProducts');
        }
        return (
            <div className="content">
                <div className="add-container">
                    <div>Product You have Added</div>
                    <button onClick={handleAdd}>Add New</button>
                </div>

                <div className="own-container">
                    {this.state.products.map(product => (
                        <div className="product">
                            <img className="image" src={product.image ? `http://localhost:5000/${product.image}` : img} alt="img" />
                            <h3 className="products_name">{product.name}</h3>
                            <div className="products_price">Price : ${product.price}</div>
                            <div className="button-container">
                                <button className="edit" onClick={handleEdit.bind(this, product._id)}>Edit product</button>
                                <button className="delete" onClick={handleDelete.bind(this, product._id)}>Delete product</button>
                            </div>
                        </div>
                    ))}


                </div>

            </div>
        )
    }
}

export default ViewOwnProduct;
