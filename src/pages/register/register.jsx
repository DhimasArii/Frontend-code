import "./register.css";

const Register = () => {
  return (
    <div className="register-container">
      <title>exported project</title>
      <div className="register-register">
        <div className="register-frame1740">
          <div className="register-frame1523">
            <div className="register-frame1522">
              <div className="register-frame1520">
                <div className="register-frame1739">
                  <span className="register-text">
                    <span>Lets Join</span>
                  </span>
                  <span className="register-text02">
                    <span> D’Language</span>
                  </span>
                </div>
                <span className="register-text04">
                  <span>Please register first</span>
                </span>
              </div>
              <div className="register-frame1519">
                <div className="register-frame1508">
                  <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="register-frame1509">
                  <input type="text" name="email" placeholder="Email" />
                </div>
                <div className="register-frame1510">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="register-frame1511">
                  <input
                    type="password"
                    name="comfirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
            </div>
            <div className="register-frame1512">
              <button className="register-button" type="button">
                <span className="register-text14">
                  <span>Sign Up</span>
                </span>
              </button>
            </div>
          </div>
          <span className="register-text16">
            <span className="register-text17">Have account?</span>
            <a href="">Login here</a>
          </span>
        </div>
        <div className="register-frame1517">
          <div className="register-frame1518">
            <div className="register-frame1738">
              <img
                src="https://s3-alpha-sig.figma.com/img/5c20/5fc3/1a0a968fed01205af8ceb3534e8d095a?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aTxjUkYuUDLOXqeaFDSwMoTtjRe9sDrIefbdtxqf7aM6W2ixvRzU3pneNMh-Ff7x7tNCu032W6ma-Acl56FP9NvXnoDO0C5aEhBJbaFqO60fTriueZ51HtQf27h7cyo0XNiSY-bDRDd5o53km1SzigdybCpnazMNw8jpAl5-m6gpdPeTZLK2zLJRZr0QqDQokiL-iVZ80kIVzYirvt-5rk8sLEj6uFTqxYv0dD5cOsg6naCg7X6sZ4wP3BVqNO4F1z4gq7LLtqeygHNUaWp5kjaRLyXj-FcUnUk2nEGPEjQvTZVCTKWmllcGkAhSLxptC31UNUPTEXp7TteUDjUfQw__"
                alt="image5133"
                className="register-image5"
              />
              <span className="register-text19">
                <span>Language</span>
              </span>
            </div>
          </div>
          <div className="register-frame1516">
            <div className="register-frame1737">
              <div className="register-frame1513">
                <button className="login-button" type="button">
                  <span className="register-text21">
                    <span>Login</span>
                  </span>
                </button>
              </div>
              <div className="register-frame15171">
                <button className="register-button1" type="button">
                  <span className="register-text23">
                    <span>Sign Up</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
