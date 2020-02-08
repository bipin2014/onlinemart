import React, { Component } from 'react';
import { loginUser } from '../../redux/actions/userAction';
import { connect } from 'react-redux';



class Login extends Component{

    state={
        email:"",
        password:"",
        errors:{}
    };
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

      UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }
    
    render(){

        const handleSubmit = (event) => {
            event.preventDefault();
            let userDetail = {
                "email": this.state.email,
                "password": this.state.password,
            }
            console.log(userDetail);
            this.props.loginUser(userDetail);
            
        }

        
        return (
            <div className="content">
                <div className="auth-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Email:</label>
                        <input type="email" name="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange} required /> <br />
                        <label>Password:</label>
                        <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required /><br />
                        {this.state.errors.error && (
                            <div className="error">{this.state.errors.error}</div>
                        )}
                        <button type="submit">Login</button>
                        <div>
                            <span>Or Don't Have Account?</span>
                            <a href="/signup">SignUp</a>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps,mapActionsToProps)(Login);