import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeAllCart } from '../../redux/actions/cartAction';
import { updateRewardPoint } from '../../redux/actions/userAction'

class Referal extends Component {
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

    componentDidMount(){
        console.log("REf",this.props.user);
        console.log(this.props.user.credentials.rewardPoint);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const handleSubmit = (event) => {
            event.preventDefault();
           console.log(this.props.user.credentials.rewardPoint);
           console.log("REf",this.props.user);
           
        }

        

        return (
            <div className="content">
                <div className="heading"> Referal</div>

                <div className="checkout-container">
                    <div className="billing-details">
                        <h1>Billing Details</h1>
                        <form onSubmit={handleSubmit}>
                            <label>FULL NAME *</label>
                            <input type="text" />
                            <label>Country</label>
                            <input type="text"  />
                            <label>TOWN / CITY *</label>
                            <input type="text"  />
                            <label>STATE / ZONE *</label>
                            <input type="text"  />
                            <label>STREET ADDRESS </label>
                            <input type="text" />
                            <label>PHONE *</label>
                            <input type="text"  />
                            <button>submt</button>

                        </form>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};



export default connect(mapStateToProps)(Referal);
