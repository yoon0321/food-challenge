import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  height: 100px;
  text-align: center;
  margin: 0px auto;
`;

export const ModalBtn = styled.button`
  background-color: #feea83;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: black;
  border-radius: 30px;
  cursor: pointer;
  height: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  > h3 {
    font-size: 30px;
    color: #f22432;
  }
`;

export const ModalView = styled.div`
  width: 480px;
  height: 621px;
  background-color: white;
  position: relative;
  box-sizing: border-box;
  margin: 50px auto;
  padding: 20px;
  background: #feea83;

  > div.close-btn span {
    margin-top: 5px;
    cursor: pointer;
    float: right;
    font-size: 25px;
  }
  > form div.input-box {
    margin: 0 auto;
    width: 100%;
    position: relative;
    padding: 0 20px 32px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  > form div.autoLogin {
    font-size: 12px;
    color: #8d8d8d;
    line-height: 3;
    cursor: pointer;
    position: relative;
    left: 100px;
  }
  > form div.input-box input {
    margin-top: 20px;
    border-radius: 30px;
    width: 100%;
    height: 40px;
    border: 1px solid #e5e5e5;
    padding: 9px 12px;
    outline: none;
    box-sizing: border-box;
  }
  > form div.login-button button {
    height: 60px;
    font-size: 16px;
    padding: 13px 155px;
    cursor: pointer;
    background-color: black;
    color: white;
    line-height: 1px;
    margin-top: 60px;
    margin-bottom: 12px;
    border-radius: 100px;
    border-style: none;
  }
  > form div.kakao button {
    height: 60px;
    font-size: 16px;
    padding: 13px 107px;
    cursor: pointer;
    background-color: yellow;
    color: black;
    line-height: 1px;
    margin-top: 20px;
    margin-bottom: 12px;
    border-radius: 100px;
    border-style: none;
  }
  > form div.signup-button div {
    margin-top: 10px;
  }
`;

export const SignInModal = ({ handleResponseSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handelLogin = () => {
    const { email, password } = loginInfo;

    if (email || password) {
      axios
        .post(
          'http://localhost:3000/user/login',
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          handleResponseSuccess();
        })
        .catch((err) => console.log(err));
    }
  };

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div>
    //   <form onSubmit={onSubmit}>
    //     <input name='email' type='text' placeholder='Email' required value={email} onChange={onChange} />
    //     <input name='password' type='password' placeholder='Password' required value={password} onChange={onChange} />
    //     <input type='submit' value='Log In' />
    //   </form>
    //   <div>
    //     <button>Google</button>

    //   </div>
    // </div>
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          <h3>🍑{isOpen === false ? 'SIGN IN' : 'SIGN IN'}🍑</h3>
        </ModalBtn>
        {isOpen === true ? (
          <ModalBackdrop>
            <ModalView>
              <div className="close-btn">
                <span onClick={openModalHandler}>&times;</span>
                <h2 style={{ color: 'red' }}>MEMBER LOGIN</h2>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-box">
                  <input
                    type="email"
                    placeholder="이메일"
                    onChange={handleInputValue('email')}
                    required
                  ></input>
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="비밀번호"
                    onChange={handleInputValue('password')}
                    required
                  ></input>
                </div>
                <div className="autoLogin">아이디/비밀번호 찾기</div>
                <div className="login-button">
                  <button onClick={handelLogin}>로그인</button>
                </div>
                <div className="kakao">
                  <button>카카오 계정으로 로그인</button>
                </div>
                {/* <div className="signup-button">
                  <div>
                    <SignUpModal />
                  </div>
                </div> */}
              </form>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
