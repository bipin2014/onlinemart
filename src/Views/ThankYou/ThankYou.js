import React, { Component } from 'react';
import './style.css';

class ThankYou extends Component {
    orderHandler=()=>{
        this.props.history.push('/order');
    }
    render() {
        return (
            <div className="content">
                    <div className="ThankyouPage">
                       <h1>Thank you for your order</h1>
                       <p className="OrderId">Order id is: {this.props.match.params.orderId}</p>
                       <p className="SmallText">You will receive an email confirmation shortly.</p>
                        <button onClick={this.orderHandler}>See your orders Here</button>
                       </div>
                </div>
        )
    }
}

export default ThankYou;
