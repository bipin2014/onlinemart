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
            console.log("this is ",res.data.order);
            
        })
    }
    render() {
        return (
            <div>
                {this.state.orders.length > 0 ?
                    <ShowOrders orders={this.state.orders} />:
                    <div className="content">
                        <div className="section-heading">No Current Order</div>
                    </div>
                }

            </div>
        )
    }
}

export default Order;
