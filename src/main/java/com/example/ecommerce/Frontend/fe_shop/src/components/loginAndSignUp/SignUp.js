import React, { useState } from 'react'
import { Container } from 'reactstrap'
import './SignUp.css'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/LogInSignUpSlice'

export default function SignUp({toggleForm}) {
    const [formData,setFormData] = useState({username:'',password:'',email:'',phone:'',address:'',name:''})
    const dispatch = useDispatch();

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(register(formData));
    }
    return (
        <Container>
            <div className="container1">
                <div className="heading">Register</div>

                <form onSubmit={handleSubmit} className="form">
                    <input required="" className="input" type="text" name="username" id="email" onChange={handleChange} placeholder="User name" />
                    <input required="" className="input" type="password" name="password" id="password" onChange={handleChange} placeholder="Password" autoComplete='off' />
                    <input required="" className="input" type="email" name="email" id="email" onChange={handleChange} placeholder="Email" />
                    <input required="" className="input" type="text" name="phone" id="password" onChange={handleChange} placeholder="Phone Number" />
                    <input required="" className="input" type="text" name="address" id="password" onChange={handleChange} placeholder="Address" />
                    <input required="" className="input" type="text" name="name" id="password" onChange={handleChange} placeholder="Name your account" />
                    <input className="login-button" type="submit" value="Sign Up" />
                </form>


                <span className="agreement"><a href="#">Learn user licence agreement</a></span>
            </div>
        </Container>
    )
}
