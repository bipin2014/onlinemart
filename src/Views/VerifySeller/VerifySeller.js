import React, { Component } from 'react'
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export default class VerifySeller extends Component {
    state = {
        halfSeller: []
    }

    componentDidMount() {
        this.getData();
    }

    getData(){
        axios.get('/bSeller/getAll').then(res => {
            console.log(res.data.data);

            this.setState({
                halfSeller: res.data.data
            })
        }).catch(err => {
            console.log(err.code);

        });
    }
    render() {

        const handelVerify=(id)=>{
            axios.patch('/user/makeSeller/'+id).then(res=>{
                console.log(res.data);
                this.getData();
                NotificationManager.success('Verified user as Seller', 'Successful!', 2000);
            }).catch(err=>{
                console.log(err.code);
                
            })
        }

        const handelCancel=(id)=>{
            axios.delete('/bSeller/'+id).then(res=>{
                console.log(res.data);
                this.getData();
                NotificationManager.success('Buyer Request Cancel Sucessfull', 'Successful!', 2000);

            }).catch(err=>{
                console.log(err.code);
                
            })
        }
        return (
            <div className="content">
            {this.state.halfSeller.length>0?(
                <div className="section-heading">Verify Seller</div>
            ):(
                <div className="section-heading">No Request Available</div>
            )}
                
                <div className="own-container">
                    {this.state.halfSeller.map(seller => (
                        <div key={seller._id} className="verify-seller">
                            <div>User Name: {seller.user.name}</div>
                            <div>User Email: {seller.user.email}</div>
                            <div>Pan Number: {seller.pan}</div>
                            <div>Phone Number: {seller.phone}</div>
                            <div className="button-container">
                                <button className="edit" onClick={handelVerify.bind(this,seller.user._id)}>Verify as Seller</button>
                                <button className="delete" onClick={handelCancel.bind(this, seller.user._id)}>Cancel Request</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
