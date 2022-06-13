import styled from 'styled-components';
import MapContainer from './MapContainer';
import { useState } from 'react';

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 300px;
  /* border: 1px solid red; */
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  padding: 120px 50px;
  border-radius: 15px;
  /* border: 1px solid red; */
`;

const food = ['한식', '중식', '일식', '양식'];
const theme = ['Theme1', 'Theme2', 'Theme3', 'Theme4'];

function FoodContainer() {
  const [isClick, click] = useState(false);
  const [clickedValue, setClick] = useState('');
  const menuHandler = (e) => {
    // console.log(e.target.value);
    setClick(e.target.value);
    click(true);
  };
  return (
    <div>
      {isClick ? (
        <MapContainer clickedValue={clickedValue} />
      ) : (
        <div>
          <MenuContainer className="menu-container">
            {food.map((el) => (
              <MenuButton value={el} onClick={menuHandler}>
                {el}
              </MenuButton>
            ))}
          </MenuContainer>
          <MenuContainer>
            {theme.map((el) => (
              <MenuButton>{el}</MenuButton>
            ))}
          </MenuContainer>
        </div>
      )}
    </div>
  );
}

export default FoodContainer;
