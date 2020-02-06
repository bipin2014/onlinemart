import React, { Component } from 'react'

export default class BecomeSeller extends Component {

    state={
        pan:"",
        phone:""
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

      handleSubmit=()=>{
          console.log(this.state.pan);
          
      }
    render() {
        return (
            <div className="content">
                <div className="section-heading">Steps to become a Seller</div>
                <div className="order-container">
                    PAN Number:<input type="text" name="pan" onChange={this.handleChange}></input>
                    Phone Number:<input type="text" name="phone" onChange={this.handleChange}></input>
                    <button onClick={this.handleSubmit}>Become a Seller</button>
                </div>
            </div>
        )
    }
}
