import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flow;
  align-items: center;
  justify-content: space-around;
  height: 200px;
  /* border: 1px solid blue; */
`;
export const Category = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  padding: 50px 40px;
  border-radius: 15px;
  font-size: 30px;
  font-family: 'Jua', sans-serif;
  color: #f22432;
  background-color: #feea83;
  cursor: pointer;
  /* border: 1px solid blue; */
`;

const food = ['한식', '중식', '일식', '양식'];

function CategoryButton({ clickedValue, setClick }) {
  const categoryHandler = (e) => {
    setClick(e.target.value);
  };
  // console.log(clickedValue);
  return (
    <Container>
      {food.map((el) => (
        <Category value={el} onClick={categoryHandler}>
          {el}
        </Category>
      ))}
    </Container>
  );
}

export default CategoryButton;
