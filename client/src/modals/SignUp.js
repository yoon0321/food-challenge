import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
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
  font-family: 'Noto Sans KR', sans-serif;

  > h3 {
    color: #f22432;
    font-size: 30px;
    margin-top: 52px;
  }
`;

export const ModalView = styled.div`
  width: 480px;
  height: 645px;
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
  > div.logo img {
    width: 100px;
    height: 100px;
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
    margin-top: 20px;
    margin-bottom: 12px;
    border-radius: 100px;
    border-style: none;
  }
`;

export const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const history = useHistory();

  const initialValue = {
    email: '',
    password: '',
    nickname: '',
    confirmPassword: '',
  };

  const [userInfo, setUserInfo] = useState(initialValue);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const initialValue = {
      email: '',
      password: '',
    };
    setUserInfo(initialValue);
  }, [isOpen]);

  useEffect(() => {
    const validEmailCheck = (input) => {
      const checkPattern =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      return checkPattern.test(input);
    };

    const validPasswordCheck = (input) => {
      const checkPattern = /^[???-???|???-???|a-z|A-Z|0-9]{4,12}$/;
      return checkPattern.test(input);
    };

    if (validEmailCheck(userInfo.email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    if (validPasswordCheck(userInfo.password)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [userInfo]);

  const submitButtonHandler = (event) => {
    event.preventDefault();

    if (isValidEmail && isValidPassword) {
      console.log('email,password all good!!!');

      axios
        .post(
          'http://localhost:3000/user/signup',
          {
            email: userInfo.email,
            password: userInfo.password,
            nickname: userInfo.nickname,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          if (res.data.message === '??????????????? ???????????????') {
            history.push('/');
            alert('??????????????? ?????????????????????. ????????? ??? ????????? ?????????.');
            // location.reload()  // ====> history ??? ???????????? ?????? ?????? ???????????????
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('????????? ?????? ????????????.');
    }
  };

  const inputValueHandler = (e, name) => {
    const inputValue = e.target.value;
    if (name === 'email') {
      const newInputValue = { ...userInfo, email: inputValue };
      setUserInfo(newInputValue);
    } else if (name === 'password') {
      const newInputValue = { ...userInfo, password: inputValue };
      setUserInfo(newInputValue);
    } else if (name === 'nickname') {
      const newInputValue = { ...userInfo, nickname: inputValue };
      setUserInfo(newInputValue);
    } else if (name === 'confirmPassword') {
      const newInputValue = { ...userInfo, confirmPassword: inputValue };
      setUserInfo(newInputValue);
    }
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          <h3>
            ????
            {isOpen === false ? 'SIGN UP' : 'SIGN UP'}
            ????
          </h3>
        </ModalBtn>
        {isOpen === true ? (
          <ModalBackdrop>
            <ModalView>
              <div className="logo"></div>
              <div className="close-btn">
                <span onClick={openModalHandler}>&times;</span>
                <h2 style={{ color: 'red' }}>CREATE ACCOUT</h2>
              </div>
              <form>
                <div className="input-box">
                  <input
                    name="email"
                    type="email"
                    placeholder="?????????"
                    onChange={(e) => inputValueHandler(e, 'email')}
                    required
                  ></input>
                </div>
                <div>
                  {!isValidEmail && userInfo.email !== '' ? (
                    <span style={{ color: 'red' }}>
                      ????????? ?????? ???????????? ??????????????????.
                    </span>
                  ) : null}
                </div>
                <div className="input-box">
                  <input
                    name="password"
                    type="password"
                    placeholder="????????????"
                    onChange={(e) => inputValueHandler(e, 'password')}
                    required
                  ></input>
                </div>
                <div>
                  {!isValidPassword && userInfo.password !== '' ? (
                    <span style={{ color: 'red' }}>
                      ??????????????? 4??? ??????, 12??? ????????? ????????? ?????????.
                    </span>
                  ) : null}
                </div>
                <div className="input-box">
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="???????????? ??????"
                    onChange={(e) => inputValueHandler(e, 'confirmPassword')}
                    required
                  ></input>
                </div>
                <div>
                  {userInfo.confirmPassword &&
                  userInfo.confirmPassword !== userInfo.password ? (
                    <span style={{ color: 'red' }}>
                      ???????????? ??????????????? ???????????? ????????????.
                    </span>
                  ) : null}
                </div>
                <div className="input-box">
                  <input
                    name="nickname"
                    type="text"
                    placeholder="?????????"
                    onChange={(e) => inputValueHandler(e, 'nickname')}
                    required
                  ></input>
                </div>
                <div>
                  {userInfo.nickname !== '' ? null : (
                    <span style={{ color: 'red' }}>
                      ???????????? ??? ?????? ??????????????? ?????????.
                    </span>
                  )}
                </div>
                <div className="login-button">
                  <button type="submit" onClick={submitButtonHandler}>
                    ????????????
                  </button>
                </div>
              </form>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
