import styled from 'styled-components';
import { useState } from 'react';
import SearchPlace from './SearchPlace';

export const CreateMyMapInfoContainer = styled.div`
  width: 100%;
  /* border: 5px solid blue; */
  /* padding-top: 10vw; */
  text-align: center;
`;
export const MakeButton = styled.button`
  width: 100px;
`;

function CreateMyMapInfo() {
  const [isMaked, make] = useState(false);
  const mapInfo = {
    name: '',
    location: [],
  };
  const [mapName, setMapName] = useState('');
  const mapNameHandler = (e) => {
    setMapName(e.target.value);
  };
  const makeMapHandler = (e) => {
    mapInfo.name = mapName;
    make(true);
  };
  return (
    <>
      {!isMaked ? (
        <CreateMyMapInfoContainer>
          <h1>나만의 지도</h1>
          <div className="input-box">
            <h3>MyMapName</h3>
            <input
              type="text"
              value={mapName}
              onChange={mapNameHandler}
            ></input>
          </div>
          {mapName === '' ? <div>지도이름을 입력해주세요.</div> : <div></div>}
          <MakeButton onClick={makeMapHandler}>생성</MakeButton>
        </CreateMyMapInfoContainer>
      ) : (
        <CreateMyMapInfoContainer>
          <SearchPlace />
        </CreateMyMapInfoContainer>
      )}
    </>
  );
}

export default CreateMyMapInfo;
