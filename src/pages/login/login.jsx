import React from 'react'


import './login.css'

const Login = () => {

  const handleForgotPassword = () =>{
    alert('Forgot Password di Klik')
  }
  return (
    <div className="login-container">
      
      <div className="login-login">
      {/* navbar */}
      <div className="login-frame1517">
          <div className="login-frame1518">
            <div className="login-frame1738">
              <img
                src="https://s3-alpha-sig.figma.com/img/5c20/5fc3/1a0a968fed01205af8ceb3534e8d095a?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aTxjUkYuUDLOXqeaFDSwMoTtjRe9sDrIefbdtxqf7aM6W2ixvRzU3pneNMh-Ff7x7tNCu032W6ma-Acl56FP9NvXnoDO0C5aEhBJbaFqO60fTriueZ51HtQf27h7cyo0XNiSY-bDRDd5o53km1SzigdybCpnazMNw8jpAl5-m6gpdPeTZLK2zLJRZr0QqDQokiL-iVZ80kIVzYirvt-5rk8sLEj6uFTqxYv0dD5cOsg6naCg7X6sZ4wP3BVqNO4F1z4gq7LLtqeygHNUaWp5kjaRLyXj-FcUnUk2nEGPEjQvTZVCTKWmllcGkAhSLxptC31UNUPTEXp7TteUDjUfQw__"
                alt="image5130"
                className="login-image5"
              />
              <span className="login-text17">
                <span>Language</span>
              </span>
            </div>
          </div>
          <div className="login-frame1516">
            <div className="login-frame1737">
              <div className="login-frame1513">
              <button className='login-button' type='button'>
                <span className="login-text19">
                  <span>Login</span>
                </span>
              </button>
              </div>
              <div className="login-frame15171">
              <button className='register-button' type='button'>
                <span className="login-text21">
                  <span>Sign Up</span>
                </span>
              </button>
              </div>
            </div>
          </div>
        </div>

        <div className="login-frame1741">
          <div className="login-frame1523">
            <div className="login-frame1522">
              <div className="login-frame1520">
                <span className="login-text">
                  <span>Welcome Back!</span>
                </span>
                <span className="login-text02">
                  <span>Please login first</span>
                </span>
              </div>
              <div className="login-frame1519">
                <div className="login-frame1509" >
                  <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="login-frame1510">
                  <input type="password" name="password" placeholder="Password" />
                </div>
                <span className="login-text08">
                  <span className="login-text09">Forgot Password? </span>
                  <span className="login-text10">
                   
                  </span>
                  <span onClick={handleForgotPassword}>
                  <a href="">Click Here</a>
                  </span>
                </span>
              </div>
            </div>
            <div className="login-frame1521">
              <div className="login-frame1512">
                <button className='login-button' type='button'>
                <span className="login-text12">
                  <span>Login</span>
                </span>
                </button>
              </div>
            </div>
          </div>
          <span className="login-text14">
            <span className="login-text15">Dont have account? </span>
            <a href="">Sign up here</a>
          </span>
        </div>
        
      </div>
    </div>
  )
}

export default Login
