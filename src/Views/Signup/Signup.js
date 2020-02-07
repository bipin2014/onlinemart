import React, { useState } from 'react';
import axios from 'axios';


const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        let newUserDetail = {
            "email": email,
            "password": password,
            "confirmPassword": cpassword,
            "name": username
        }

        // alert(`${userDetail.email} ${userDetail.password}`);

        console.log(newUserDetail);

        axios.post('/user/signup', newUserDetail)
            .then(data => {
                if (data.data.error) {
                    // console.log(data.response.data);
                    setErrors(data.data);
                } else {
                    props.history.push('/login');
                    console.log(data.data);
                }
            }).catch(err => {
                console.error(err.code);
                setErrors(err.response.data);
            });

    }

    return (
        <div className="content">
            <div className="auth-container">
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    Full Name:<input type="text" name="username" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required /> <br />
                    Email:<input type="email" name="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required /> <br />
                    Password:<input type="password" name="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
                    Password:<input type="password" name="cpassword" placeholder="Enter Confirm password" value={cpassword} onChange={e => setCPassword(e.target.value)} required /><br />
                    {errors.error && (
                        <div className="error">{errors.error}</div>
                    )}
                    <button type="submit">Signup</button>
                    <div>
                        <span>Or Already Have Account?</span>
                        <a href="/login">Login</a>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Signup;