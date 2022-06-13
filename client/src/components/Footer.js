import styled from 'styled-components';

const FooterContainer = styled.div`
  position: absolute;
  text-align: center;
  width: 100vw;
  margin: 0 auto;
  padding: 0.3em 0;
  background-color: feea83;
`;

const FooterUl = styled.ul`
  padding-bottom: 10px;
`;

const FooterLi = styled.li`
  display: inline;
  padding-right: 20px;
  position: relative;
  white-space: nowrap;
  color: #222;

  &::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 8px;
    width: 1px;
    height: 11px;
    background-color: #8f8f8f;
  }
  &:last-child::after {
    width: 0;
    height: 0;
  }
  &:hover a {
    color: #8f8f8f;
  }
`;

const FooterA = styled.a`
  color: #222;
`;

const FooterP = styled.p`
  display: inline-block;
  padding-top: 15px;
  margin-right: 15px;
  margin-left: -40px;
  padding-bottom: 18px;
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

function Footer() {
  return (
    <footer style={{ backgroundColor: '#feea83' }}>
      <FooterContainer>
        <FooterP>서비스명: Food Challenege</FooterP>
        <FooterUl>
          <div>
            <FooterLi>
              <FooterA>개인정보</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>처리방침</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>이용약관</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>저작권정책</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Q&A</FooterA>
            </FooterLi>
          </div>
        </FooterUl>
      </FooterContainer>
    </footer>
  );
}

export default Footer;
