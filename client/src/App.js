import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Main from '../src/pages/Main';
import axios from 'axios';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import CreateMyMap from './pages/CreateMyMap';
// import KakaoMap from './pages/Map';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  const isAuthenticated = () => {
    axios
      .get('http://localhost:3000/user/auth')
      .then((res) => {
        console.log(res);
        setIsLogin(true);
        setUserInfo(res.data.data.userInfo); ///////////////////////// ====>  dataValue   or data
        alert('로그인이 완료되었습니다!');
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/user/logout').then(() => {
      setUserInfo(null);
      setIsLogin(false);
      alert('로그아웃 하였습니다!');
      history.push('/');
    });
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <Main
              handleLogout={handleLogout}
              userInfo={userInfo}
              isLogin={isLogin}
            />
          </Route>
          <Route path="/mypage">
            <MyPage isLogin={isLogin} userInfo={userInfo} />
          </Route>
          <Route path="/createmymap">
            <CreateMyMap />
          </Route>
          {/* <Route path="/map">
            <KakaoMap />
          </Route> */}
          <Route path="/Login">
            <Login
              isLogin={isLogin}
              handleResponseSuccess={handleResponseSuccess}
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
