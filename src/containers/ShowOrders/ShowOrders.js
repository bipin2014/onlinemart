import React from 'react';
import img from '../../logo.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

const ShowOrders=(props)=>{
    dayjs.extend(relativeTime)
    return (     
        <div className="order-container">
            <div className="order-details">
                <div>Order Id:{props.data._id}</div>
                <div>Order Status:{props.data.isOrderCompleted ? "Sucess" : "Waiting"}</div>
                <div>Payment Type: {props.data.payment.paymentType}</div>
                <div>Payment Status: {props.data.payment.paymentStatus}</div>
                <div className="date">{dayjs(props.data.date).fromNow() }</div>
            </div>
            <div className="products">
                {props.data.products.length > 0 && (
                    props.data.products.map(d => (
                        <div className="product">
                            <img className="image" src={d.product.image ? `http://localhost:5000/${d.product.image}` : img} alt="img" />
                            <div className="products_name">{d.product.name}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ShowOrders;
