import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SignUpModal } from '../modals/SignUp';
import { SignInModal } from '../modals/SignIn';

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  /* justify-content: space-around; */
  /* border: 3px solid black; */
`;

export const MenuButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 0px 0px;
  margin-top: 50px;
  border: 0;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 150px;
  height: 140px;
  cursor: pointer;
  background-color: #feea83;
  border: 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 17px;
  color: #f22432;
  width: 200px;

  > h3.sidebar-text {
    font-size: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #f22432;
    margin-top: 50px;
    margin-bottom: 0;
    width: 200px;
  }

  > h3.sidebar-map-text {
    font-size: 30px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #f22432;
    margin-top: 0;
    margin-bottom: 0;
    width: 200px;
  }
`;

function Sidebar({ handleLogout, userInfo, isLogin }) {
  return (
    <MenuContainer className="menu-container">
      {isLogin ? (
        <div>nickname</div>
      ) : (
        <div>
          <SignInModal />
          <SignUpModal />
        </div>
      )}
      <Link to="/mypage">
        <MenuButton>
          <h3 className="sidebar-text">🍆My Page🍆</h3>
        </MenuButton>
      </Link>
      <Link to="/createmymap">
        <MenuButton>
          <h3 className="sidebar-map-text">🌰 Create 🌰 My Map</h3>
        </MenuButton>
      </Link>
      <MenuButton>Log Out</MenuButton>
    </MenuContainer>
  );
}

export default Sidebar;
