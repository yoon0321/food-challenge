import styled from 'styled-components';
import MapView from '../components/MapView';
import CategoryButton from '../components/CategoryButton';
import { useState } from 'react';

const MainContainer = styled.div`
  /* border: 3px solid black; */
  width: 100vw;
  position: absolute;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const HeaderContainer = styled.header`
  /* border: 3px solid greenyellow; */
  height: 200px;
  width: 100vw;
`;

export const Logo = styled.img`
  height: 190px;
  width: 190px;
`;

export const Header = styled.a``;

function Main() {
  const [clickedValue, setClick] = useState('');
  return (
    <MainContainer>
      <HeaderContainer>
        <Header href="/">
          <Logo src="images/logo3.png" />
        </Header>
      </HeaderContainer>
      <CategoryButton clickedValue={clickedValue} setClick={setClick} />
      <MapView clickedValue={clickedValue} />
    </MainContainer>
  );
}
export default Main;
