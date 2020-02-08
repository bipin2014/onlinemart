import React, { Component } from 'react';
import axios from 'axios';

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
                    <ShowOrders data={data}/>
                ))}
            </div>
        )
    }
}

export default Order;

