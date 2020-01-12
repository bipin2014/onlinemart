import React, { useState } from 'react';
import axios from 'axios';


const Signup=(props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit=(event)=>{
        event.preventDefault();
        setLoading(true);
        let newUserDetail={
            "email":email,
            "password":password,
            "confirmPassword":cpassword,
            "username":username
        }

        // alert(`${userDetail.email} ${userDetail.password}`);

        axios.post('/signup',newUserDetail)
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
        <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                Email:<input type="email" name="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required/> <br/>
                Username:<input type="text" name="username" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required/> <br/>
                Password:<input type="password" name="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required/><br/>
                Password:<input type="password" name="cpassword" placeholder="Enter Confirm password" value={cpassword} onChange={e => setCPassword(e.target.value)} required/><br/>
                {errors.general &&(
                    <div>{errors.general}</div>
                )}
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup;