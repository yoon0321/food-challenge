import styled from 'styled-components';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import CreateMyMapInfo from '../components/CreateMyMapInfo';
import MapContainer from '../components/MapContainer';

const MainContainer = styled.div`
  /* border: 3px solid black; */
  width: 100vw;
  position: absolute;
  display: flex;
  flex-flow: column;
`;

const HeaderContainer = styled.header`
  /* border: 3px solid greenyellow; */
  height: 200px;
  width: 100vw;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  width: 100vw;
  height: 100%;
  /* border: 3px solid pink; */
`;

function CreateMyMap(props) {
  return (
    <>
      <MainContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Container>
          <CreateMyMapInfo />
          <Sidebar />
        </Container>
        <Footer />
      </MainContainer>
    </>
  );
}

export default CreateMyMap;
