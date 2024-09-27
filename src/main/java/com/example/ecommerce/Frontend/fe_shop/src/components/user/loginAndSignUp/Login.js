import React, { useEffect, useState } from 'react';
import './Login.css';
import SignUp from './SignUp';
import { Col, Container, Row } from 'reactstrap';
import logo from '../../../imgs/imageLogin.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../../redux/LogInSignUpSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [logInData,setLogInData] = useState({username:'',password:''})
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {role,errorLogin} = useSelector((state)=> state.AccountUser);

  useEffect(() => {
    if (role && role.length > 0) {
      console.log("Role:", role[0].name); // Kiểm tra name của role

      if (role[0].name === 'ROLE_EMPLOYEE' || role[0].name === 'ROLE_ADMIN') {
        console.log("Navigating to admin page..."); // Log khi điều kiện đúng
        navigate('/admin');
      }else{
        navigate('/');
      }
    }
  }, [role, navigate]);

  const handleChange=(e)=>{
      setLogInData({...logInData,[e.target.name]: e.target.value});
  }

  const handleLogIn=(e)=>{
    e.preventDefault();
    dispatch(logIn(logInData));  
  }

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container>
      <Row>
        <Col lg='6' style={{display: "flex", alignItems: "center"}}>
          <Container>
            <img src={logo} alt='logo'/>
          </Container>
        </Col>
        <Col lg='6' sm='12' style={{display: "flex", justifyContent: "center"}}>
          <div className={`form-container ${showLogin ? 'show-login' : 'show-signup'}`}>
            {showLogin ? (
              <div className="container1 login">
                <div className="heading">Sign In</div>
                <form onSubmit={handleLogIn} className="form">
                  <input required="" className="input" type="text" name="username" onChange={handleChange} placeholder="User name"/>
                  <input required="" className="input" type="password" name="password" onChange={handleChange} placeholder="Password" autoComplete='off'/>
                  {errorLogin && <span className='error' style={{color:'red'}}>{errorLogin}</span>}
                  <span className="forgot-password" style={{display: "flex", justifyContent: "space-between"}}>
                    <a href="#">Forgot Password?</a>
                    <a href='#' onClick={toggleForm}>Or create account</a>
                  </span>
                  <input className="login-button" type="submit" value="Sign In"/>
                </form>

                        <div className="social-account-container">
                            <span className="title">Or Sign in with</span>
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
                        <span className="agreement"><a href="#">Learn user licence agreement</a></span>
                    </div>
                ) : (
                    <SignUp toggleForm={toggleForm} />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        );
      };
      
export default Login;