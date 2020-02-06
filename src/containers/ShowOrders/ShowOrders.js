import React, { Component } from 'react'

class ShowOrders extends Component {
    render() {
        return (
            <div className="content">
                <div className="section-heading">Current Order</div>
                
                {this.props.orders.map(data => (
                   
                    
                    <div className="order-container">
                        <div>Order Id:{data._id}</div>
                        <div>Order Status:{data.isOrderCompleted?"Sucess":"Waiting"}</div>
                        <div>Payment Type: {data.payment.paymentType}</div>
                        <div>Payment Status: {data.payment.paymentStatus}</div>
                        <div>Date: {data.date}</div>
                        <button>Recieved Product</button>
                    </div>
                    
                ))}
            </div>
        )
    }
}

export default ShowOrders;
