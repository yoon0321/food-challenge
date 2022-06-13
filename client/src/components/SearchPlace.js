import React, { useState } from 'react';
import MapContainer from './MapContainer';
import styled from 'styled-components';

export const SearchPlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  /* border: 5px solid green; */
`;

export const InputContainer = styled.form`
  position: absolute;
  width: 20vw;
  height: 5vw;
  z-index: 9998;
  /* border: 1px solid blueviolet; */
  display: block;
  align-items: center;
  margin-top: 1vw;
`;

export const SearchBar = styled.input`
  height: 2vw;
  width: 10vw;
  align-items: center;
`;

export const SearchButton = styled.button`
  height: 2.4vw;
  width: 5vw;
  margin-left: 10px;
  align-items: center;
`;

const SearchPlace = () => {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
  };

  return (
    <SearchPlaceContainer>
      <InputContainer className="inputForm" onSubmit={handleSubmit}>
        <SearchBar
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <SearchButton type="submit">검색</SearchButton>
      </InputContainer>
      <MapContainer searchPlace={place}></MapContainer>
    </SearchPlaceContainer>
  );
};

export default SearchPlace;
