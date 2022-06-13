import styled from 'styled-components';

export const HeaderContainer = styled.h1`
  position: absolute;
  margin-top: 0;
  height: 190px;
  width: 100vw;
  background-color: #feea83;
`;

export const Logo = styled.img`
  height: 190px;
  width: 190px;
`;

function Header() {
  return (
    <HeaderContainer className="header-container">
      <a href="/">
        <Logo src="images/logo3.png" />
      </a>
    </HeaderContainer>
  );
}

export default Header;
