import React, { useState } from 'react';
import axios from 'axios';


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        let userDetail = {
            "email": email,
            "password": password,
        }

        // alert(`${userDetail.email} ${userDetail.password}`);

        console.log(userDetail);
        axios.post('/user/login', userDetail)
            .then(data => {
                console.log("From inside", data);
                if (data.data.error) {
                    // console.log(data.response.data);
                    setErrors(data.data);
                } else {
                    localStorage.setItem("AUTH-TOKEN", `${data.data.token}`);
                    // props.history.push('/');
                    window.location.href = '/login';
                }
            }).catch(err => {
                console.error(err.code);
                setErrors(err.response.data);
            });
    }

    return (
        <div className="content">
            <div className="auth-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required /> <br />
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
                    {errors.error && (
                        <div className="error">{errors.error}</div>
                    )}
                    <button type="submit">Login</button>

                </form>
            </div>
        </div>

    )
}

export default Login;