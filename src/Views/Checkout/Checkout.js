import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeAllCart } from '../../redux/actions/cartAction';
import { updateRewardPoint } from '../../redux/actions/userAction';
import RadioButton from '../../components/RadioButton/RadioButton'

class Checkout extends Component {
    state = {
        fullname: "",
        country: "",
        city: "",
        state: "",
        street: "",
        phone: "",
        payment: "",
        error: null,
        paymentRes: {}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        // const handleSubmit = (event) => {
        //     event.preventDefault();
        //     let userDetail = {
        //         "email": this.state.email,
        //         "password": this.state.password,
        //     }
        //     console.log(userDetail);
        //     this.props.loginUser(userDetail, this.props.history);
        // }

        const onPlaceOrder = () => {
            console.log("Place Order");
            console.log(this.state.payment);

            if (this.state.payment === "") {
                this.setState({
                    error: "Please Select Payment Method"
                })
            } else if (this.state.payment === "online") {
                let payData = {
                    "amount": this.props.cart.total,
                    "paymentType": "online",
                    "paymentStatus": "Sucess"
                }
                axios.post('/payment/makePayment', payData).then(res => {
                    this.setState({
                        paymentRes: res.data
                    })
                    let rewardPoint = this.props.user.credentials.rewardPoint + this.props.cart.total * 0.01;
                    console.log("REward point", rewardPoint);

                    let pointData = { "points": rewardPoint }
                    this.props.updateRewardPoint(pointData)
                    makeOrder();

                }).catch(err => {
                    console.log(err);
                })

            } else if (this.state.payment === "offline") {
                let payData = {
                    "amount": this.props.cart.total,
                    "paymentType": "offline",
                    "paymentStatus": "Pay On Delivery"
                }
                axios.post('/payment/makePayment', payData).then(res => {
                    this.setState({
                        paymentRes: res.data
                    });
                    let rewardPoint = this.props.user.credentials.rewardPoint + this.props.cart.total * 0.01;
                    console.log("REward point", rewardPoint);

                    let pointData = { "points": rewardPoint }
                    this.props.updateRewardPoint(pointData)
                    makeOrder();
                }).catch(err => {
                    console.log(err);
                });
            } else if (this.state.payment === "point") {

                if (this.props.user.credentials.rewardPoint >= this.props.cart.total) {
                    let payData = {
                        "amount": this.props.cart.total,
                        "paymentType": "point",
                        "paymentStatus": "Sucess"
                    }
                    axios.post('/payment/makePayment', payData).then(res => {
                        this.setState({
                            paymentRes: res.data
                        })
                        let rewardPoint = this.props.user.credentials.rewardPoint - this.props.cart.total;
                        console.log("REward point", rewardPoint);

                        let pointData = { "points": rewardPoint }
                        this.props.updateRewardPoint(pointData)
                        makeOrder();

                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    this.setState({
                        error: "No Sufficient reward Point to pay"
                    })
                }

            }
        }


        const makeOrder = () => {
            let result = this.props.cart.cart.map(a => ({ "product": a.product._id }));
            // let result = this.props.cart.cart.map(a => a._id);
            console.log(result);

            let orderData = {
                "products": result,
                "paymentId": this.state.paymentRes._id
            }
            axios.post('/order/makeOrder', orderData).then(res => {
                console.log(res.data);
                this.props.removeAllCart();
                this.props.history.push('/thankyou/' + res.data._id);
            }).catch(err => {
                console.log(err.code);
            });
        }

        return (
            <div className="content">
                <div className="heading"> Checkout</div>

                <div className="checkout-container">
                    <div className="billing-details">
                        <h1>Billing Details</h1>
                        <form>
                            <label>FULL NAME *</label>
                            <input type="text" />
                            <label>Country</label>
                            <input type="text" required />
                            <label>TOWN / CITY *</label>
                            <input type="text" required />
                            <label>STATE / ZONE *</label>
                            <input type="text" required />
                            <label>STREET ADDRESS </label>
                            <input type="text" />
                            <label>PHONE *</label>
                            <input type="text" required />


                        </form>
                    </div>

                    <div className="cart-details">

                        <table>
                            <tr className="border">
                                <th className="product-name">Product Name</th>
                                <th className="price">Price</th>
                            </tr>
                            {this.props.cart.cart.map(res => (
                                <tr className="border">
                                    <td className="product-name">{res.product.name} X {res.quantity}</td>
                                    <td className="price">${res.product.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td><div>Total</div></td>
                                <td><div className="amt">${this.props.cart.total}</div></td>
                            </tr>
                        </table>



                        <label >Payment Type</label>
                        <div className="payment-type">
                            
                            <RadioButton
                                changed={this.handleChange}
                                id="1"
                                isSelected={this.state.payment === "offline"}
                                label="Cash on Delivery"
                                value="offline"
                                name="payment"
                            />
                            <RadioButton
                                changed={this.handleChange}
                                id="2"
                                isSelected={this.state.payment === "point"}
                                label="Derrency"
                                value="point"
                                name="payment"
                            />
                            
                        </div>
                        <button className="checkout" onClick={onPlaceOrder}>Place Order</button>
                        <div className="error-message">{this.state.error && (<span>{this.state.error}</span>)}</div>
                    </div>

                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user
    }
};

const mapActionToProps = {
    removeAllCart, updateRewardPoint
}

export default connect(mapStateToProps, mapActionToProps)(Checkout);
