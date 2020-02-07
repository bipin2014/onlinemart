import React, { Component } from 'react';
import axios from 'axios';
import img from '../../logo.svg'
import ShowOrders from '../../containers/ShowOrders/ShowOrders';

class Order extends Component {
    state = {
        orders: []
    }
    componentDidMount() {
        axios.get('/order').then(res => {
            this.setState({
                orders: res.data.order
            })
            console.log(res.data.order);

        })
    }
    render() {
        return (
            <div className="content">

                <div className="section-heading">Current Order</div>

                {this.state.orders.map(data => (
                    <div className="order-container">
                        <div>
                            <div>Order Id:{data._id}</div>
                            <div>Order Status:{data.isOrderCompleted ? "Sucess" : "Waiting"}</div>
                            <div>Payment Type: {data.payment.paymentType}</div>
                            <div>Payment Status: {data.payment.paymentStatus}</div>
                            <div>Date: {data.date}</div>
                        </div>
                        <div className="products">
                            {data.products.length > 0 && (
                                data.products.map(d => (
                                    <div className="product">
                                        <img className="image" src={d.product.image ? `http://localhost:5000/${d.product.image}` : img} alt="img" />
                                        <div className="products_name">{d.product.name}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Order;

