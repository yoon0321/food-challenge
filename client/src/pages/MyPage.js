import styled from 'styled-components';
import MyPageInfo from '../components/MyPageInfo';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const MainContainer = styled.div`
  border: 3px solid black;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-flow: column;
`;

const HeaderContainer = styled.header`
  border: 3px solid greenyellow;
  height: 200px;
  width: 100vw;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  width: 100vw;
  border: 3px solid black;
  padding-left: 200px;
`;

function MyPage() {
  return (
    <>
      <MainContainer>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <Container>
          <MyPageInfo />
          <Sidebar />
        </Container>
        <Footer />
      </MainContainer>
    </>
  );
}

export default MyPage;
