import React, { Component } from 'react';
import axios from 'axios';

import { rechargeCard } from '../../redux/actions/userAction';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

class AddCurrency extends Component {
    state = {
        hash: "",
        transaction: []
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        axios.get('/transaction').then(res => {
            this.setState({
                transaction: res.data
            })
        });

    }


    handleSubmit = async () => {
        const hashData = {
            "hash": this.state.hash
        }
        this.props.rechargeCard(hashData);
        
        window.location.href="/addcurrency"
    }
    render() {
        dayjs.extend(relativeTime)
        return (
            <div className="content">
                <div className="section-heading">Add Currency</div>
                <div className="bseller-container">
                    Enter Code :<input type="text" name="hash" onChange={this.handleChange}></input>
                    <button onClick={this.handleSubmit}>Cash In</button>
                </div>

                {this.state.transaction.length > 0 ?
                    (
                        <div className="referal-person-container">
                            <div className="heading">Your Transaction</div>
                            <div className="person-conatiner">
                                {this.state.transaction.map(data => (
                                    <div className="person-details">
                                        <div>Amount:{data.amount}</div>
                                        <div className="date">{dayjs(data.date).fromNow()}</div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ) : (
                        <div className="section-heading">NO Transaction</div>
                    )}


            </div>
        )
    }
}

const mapActionToProps = {
    rechargeCard

}

export default connect(null, mapActionToProps)(AddCurrency);
