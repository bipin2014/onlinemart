import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Error from '../../components/Error/Error';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


class MyReferal extends Component {
    state = {
        referal: "", //Key
        refered: [],
        error: null
    }


    componentDidMount() {
        axios.get('/user/getUser').then(res => {
            console.log("REferal", res.data.credentials.referalKey);
            this.findReferals(res.data.credentials.referalKey)
        })



    }

    findReferals = (data) => {
        axios.get('/referal/' + data).then(res => {
            console.log(res.data);
            this.setState({
                refered: res.data.referal
            })
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = () => {

        if (this.state.referal !== "") {
            const data = {
                referalKey: this.state.referal
            }
            axios.patch('/user/add/referalkey', data).then(res => {
                this.setState({
                    message: "My Referal Id" + this.state.referal,
                    display: false
                });
            })
        } else {
            this.setState({
                error: "Please Input Refer Key to Register "
            })
        }


    }
    render() {
    dayjs.extend(relativeTime)

        return (
            <div className="content">
                {this.state.error && (
                    <Error message={this.state.error} />
                )}

                {!this.props.user.credentials.referalKey && (
                    <div>
                        <div className="section-heading">Referal</div>
                        <div className="bseller-container">

                            Referal Key:<input type="text" name="referal" placeholder="Enter the unique Referal Key" onChange={this.handleChange}></input>
                            <button onClick={this.handleSubmit}>Register Referal Key</button>
                        </div>
                    </div>

                )}

                {this.props.user.credentials.referalKey && (
                    <div>
                        <div className="section-heading">Your Referal Key: <p>{this.props.user.credentials.referalKey}</p></div>
                        <div className="referal-container">
                            <div>
                                <div>Total Referal: {this.state.refered.length}</div>
                                <div>Total Points Earned: {this.state.refered.length * 5} reward points</div>
                            </div>

                            <div>Send Your referal key to your friend and earn 5 reward point on each signup.</div>
                        </div>

                    </div>
                )}

                <div className="section-heading">Your Referals </div>
                <div className="referal-person-container">
                    {this.state.refered.length > 0 ? (
                        <div className="person-conatiner">
                            {this.state.refered.map(res=>(
                                <div className="person-details">
                                    <div className="person-name"> Name: {res.refered_person.name}</div>
                                    <div className="person-email">Email :{res.refered_person.email}</div>
                                    <div className="date">{dayjs(res.refered_person.date).fromNow() }</div>
                                </div>
                            ))}
                        </div>
                    ) : (<div>No Referal Upto Now.</div>)}
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


export default connect(mapStateToProps)(MyReferal);


