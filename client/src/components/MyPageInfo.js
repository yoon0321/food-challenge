import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

export const InputBox = styled.div`
  > div.input-box input {
    margin: 0 auto;
    width: 100%;
    position: relative;
    padding: 10px 200px 10px 200px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    text-align: center;
    border-radius: 30px;
  }
  > div h3 {
    text-align: center;
    font-family: sans-serif;
  }
`;

export const ButtonStyle = styled.div`
  > div button.mypage-btn {
    float: inline-start;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #feea83;
    font-size: medium;
    color: #db5a0f;
    padding-top: 50px;
    padding-left: 180px;
  }
  > div button.resign-btn {
    float: right;
    cursor: pointer;
    border: 0;
    background-color: #feea83;
    font-size: medium;
    padding-bottom: 30px;
    padding-right: 15px;
    color: #6829a3;
  }
`;

function MyPageInfo({ userInfo, isLogin }) {
  const [user, setUser] = useState('userInfo'); // =====> 유저 정보 데이터가 들어오는지 확인

  const [isValidPassword, setIsValidPassword] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const validPasswordCheck = (input) => {
      const pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{4,12}$/;
      return pattern.test(input);
    };

    if (validPasswordCheck(user.password)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }

    const submitButtonHandler = (e) => {
      e.preventDefault();
    };
  }, [user]);

  const inputValueHandler = (e, tag) => {
    const inputValue = e.target.value;
    if (tag === 'password') {
      const newValue = { ...user, password: inputValue };
      setUser(newValue);
    } else if (tag === 'nickname') {
      const newValue = { ...user, nickname: inputValue };
      setUser(newValue);
    } else if (tag === 'confirmPassword') {
      const newValue = { ...user, password2: inputValue };
      setUser(newValue);
    }
  };

  const [disabled, setDisabled] = useState(true);

  function handleInputClick() {
    setDisabled(!disabled);
  }

  const editUser = () => {
    axios
      .patch(
        'http://localhost:3000/user/password',
        {
          password: user.password,
        },
        { headers: { 'Content-Type': 'application/json' } },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = () => {
    axios
      .delete(
        'http://localhost:3000/user/signout',
        { email: user.email, password: user.password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((res) => history.push('/'));
  };

  return (
    <>
      {isLogin ? (
        <div>
          <h1>내 정보</h1>
          <InputBox>
            <div className="input-box">
              <h3>닉네임</h3>
              <input
                type="text"
                value={user.nickname}
                onChange={(e) => inputValueHandler(e, 'nickname')}
                disabled={disabled}
              ></input>
            </div>
            <div className="input-box">
              <h3>이메일</h3>
              <input type="text" value={user.email} disabled></input>
            </div>
            <div className="input-box">
              <h3>비밀번호</h3>
              <input
                type="password"
                value={user.password}
                disabled={disabled}
                onChange={(e) => inputValueHandler(e, 'password')}
              ></input>
            </div>
            <div>
              {!isValidPassword && user.password !== '' ? (
                <span style={{ color: 'red' }}>
                  비밀번호는 4자 이상, 12자 이하로 입력해 주세요.
                </span>
              ) : null}
            </div>
            <div className="input-box">
              <h3>비밀번호 확인</h3>
              <input
                type="password"
                onChange={(e) => inputValueHandler(e, 'confirmPassword')}
                disabled={disabled}
              ></input>
            </div>
          </InputBox>
          <ButtonStyle>
            <div>
              <button className="mypage-btn" onClick={handleInputClick}>
                <h3>설정</h3>
              </button>
              <button
                className="mypage-btn"
                onMouseDown={handleInputClick}
                onClick={editUser}
              >
                <h3>완료</h3>
              </button>
            </div>
            <div>
              <button className="resign-btn" onClick={deleteUser}>
                회원탈퇴
              </button>
            </div>
          </ButtonStyle>
        </div>
      ) : (
        <h1>로그인 후 이용해주세요</h1>
      )}
    </>
  );
}

export default MyPageInfo;
