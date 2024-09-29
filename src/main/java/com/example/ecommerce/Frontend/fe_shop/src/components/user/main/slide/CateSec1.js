import React from 'react';
import './catesec1.css'; // Import your CSS file
import { Link } from 'react-router-dom';
const CateSec1 = () => {
  return (
            <button type="button" class="btn1" >
            <strong>
              <Link to={"/product"}>GO TO STORE</Link>
            </strong>
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
