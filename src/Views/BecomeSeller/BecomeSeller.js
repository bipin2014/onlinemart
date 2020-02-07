import React, { Component } from 'react';
import axios from 'axios'

export default class BecomeSeller extends Component {

    state={
        pan:"",
        phone:"",
        message:"Steps to become a Seller",
        display:true
    }

    componentDidMount(){
        axios.get('/bSeller/get').then(res=>{
            this.setState({
                message:"Your request have been sent Please Wait Until It is verified",
                display:false
            });
            
        }).catch(err=>{
            this.setState({
                message:"Steps to become a Seller",
                display:true
            });
        });
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

      handleSubmit=()=>{

        if(this.state.pan!=="" || this.state.phone!==""){
            const data={
                pan:this.state.pan,
                phone:this.state.phone
            }
            axios.post('/bSeller/apply',data).then(res=>{
                console.log("hello");
                this.setState({
                    message:"Your request have been sent Please Wait Until It is verified",
                    display:false
                });
            })
        }
          
          
      }
    render() {
        return (
            <div className="content">
                <div className="section-heading">{this.state.message}</div>
                {this.state.display?(
                    <div className="bseller-container">
                    PAN Number:<input type="text" name="pan" onChange={this.handleChange}></input>
                    Phone Number:<input type="text" name="phone" onChange={this.handleChange}></input>
                    <button onClick={this.handleSubmit}>Become a Seller</button>
                </div>
                ):""}
                
            </div>
        )
    }
}
