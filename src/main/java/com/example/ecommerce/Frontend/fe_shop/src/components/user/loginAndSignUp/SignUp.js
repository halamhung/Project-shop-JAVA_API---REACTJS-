import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearRegisterSuccess } from '../../../redux/LogInSignUpSlice';
import { Alert, AlertTitle } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const SignUp = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const dispatch = useDispatch();
  const { errorMessages, registerSuccess } = useSelector((state) => state.AccountUser);

  useEffect(() => {
    if (registerSuccess) {
      console.log('Registration successful!'); // Add this line for debugging
      // Clear the success state after 3 seconds
      const timer = setTimeout(() => {
        dispatch(clearRegisterSuccess());
        toggleForm(); // Switch back to login form
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [registerSuccess, dispatch, toggleForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="container1 register">
      <div className="heading">Sign Up</div>
      {registerSuccess && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          <AlertTitle>Success</AlertTitle>
          Registration successful! Redirecting to login...
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="form">
        <input
          required=""
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {errorMessages.username && <span className="error">{errorMessages.username}</span>}
        
        <input
          required=""
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errorMessages.email && <span className="error">{errorMessages.email}</span>}
        
        <input
          required=""
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errorMessages.password && <span className="error">{errorMessages.password}</span>}
        
        <input
          required=""
          className="input"
          type="tel"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        {errorMessages.phone && <span className="error">{errorMessages.phone}</span>}
        
        <input
          required=""
          className="input"
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        {errorMessages.address && <span className="error">{errorMessages.address}</span>}
        <input
          required=""
          className="input"
          type="text"
          name="name"
          placeholder="Name your Account"
          onChange={handleChange}
        />
        {errorMessages.name && <span className="error">{errorMessages.name}</span>}
        
        <input className="login-button" type="submit" value="Sign Up" />
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign up with</span>
        <div className="social-accounts">
          <button className="social-button google">
            <i className="fa-brands fa-google fa-lg"></i>
          </button>
          <button className="social-button apple">
            <i className="fa-brands fa-apple fa-xl"></i>
          </button>
          <button className="social-button twitter">
            <i className="fa-brands fa-twitter fa-lg"></i>
          </button>
        </div>
      </div>
      <span className="agreement">
        <a href="#">Learn user licence agreement</a>
      </span>
      <span className="agreement">
        Already have an account? <a href="#" onClick={toggleForm}>Sign In</a>
      </span>
    </div>
  );
};

export default SignUp;