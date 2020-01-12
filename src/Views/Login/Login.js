import React, { useState } from 'react';
import axios from 'axios';


const Login=(props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit=(event)=>{
        event.preventDefault();
        setLoading(true);
        let userDetail={
            "email":email,
            "password":password,
        }

        // alert(`${userDetail.email} ${userDetail.password}`);

        axios.post('/login',userDetail)
        .then(data=>{
            console.log(data.data);
            localStorage.setItem("FBToken",`Bearer ${data.data.token}`);
            setLoading(false);
            props.history.push('/');
        }).catch(err=>{
            console.error(err.code);
            setErrors(err.response.data);
            setLoading(false);
        });
        
    }

    return(
        <div>
        <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                Email:<input type="email" name="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required/> <br/>
                Password:<input type="password" name="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required/><br/>
                {errors.general &&(
                    <div>{errors.general}</div>
                )}
                <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default Login;