import React, { useState } from 'react'
import { Container } from 'reactstrap'
import './SignUp.css'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../../redux/LogInSignUpSlice'

export default function SignUp({toggleForm}) {
    const [formData,setFormData] = useState({username:'',password:'',email:'',phone:'',address:'',name:''})
    const dispatch = useDispatch();
    const {errorMessages} = useSelector(state=>state.AccountUser)
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
                <input
                        required=""
                        className="input"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="User name"
                    />
                    {errorMessages.username && <span className="error" style={{color:"red"}}>{errorMessages.username}</span>}

                    <input
                        required=""
                        className="input"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="off"
                    />
                    {errorMessages.password && <span style={{color:"red"}} className="error">{errorMessages.password}</span>}

                    <input
                        required=""
                        className="input"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    {errorMessages.email && <span style={{color:"red"}} className="error">{errorMessages.email}</span>}

                    <input
                        required=""
                        className="input"
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Phone Number"
                    />
                    {errorMessages.phone && <span style={{color:"red"}} className="error">{errorMessages.phone}</span>}

                    <input
                        required=""
                        className="input"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        placeholder="Address"
                    />
                    {errorMessages.address && <span style={{color:"red"}} className="error">{errorMessages.address}</span>}

                    <input
                        required=""
                        className="input"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="Name your account"
                    />
                    {errorMessages.username && <span style={{color:"red"}} className='error'>{errorMessages.username}</span>}
                    <input className="login-button" type="submit" value="Sign Up" />
                    
                </form>


                <span className="agreement"><a href="#">Learn user licence agreement</a></span>
            </div>
        </Container>
    )
}
