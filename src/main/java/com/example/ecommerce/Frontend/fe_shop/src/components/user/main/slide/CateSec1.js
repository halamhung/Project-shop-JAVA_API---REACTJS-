import React from 'react';
import './catesec1.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const CateSec1 = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
      navigate("/product")
  }
  return (
            <button type="button" class="btn1" onClick={handleClick}>
            <strong>GO TO STORE</strong>
            <div id="container-stars">
                <div id="stars"></div>
            </div>

            <div id="glow">
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            </button>
  );
};

export default CateSec1;
